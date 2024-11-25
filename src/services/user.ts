import { prismaClient } from "../prisma";
import bcrypt from "bcrypt";
import { appError } from "../utils/appError";

export type userDataProps = {
    email: string;
    name: string;
    password: string;
}

export class UserService {
    async createUser(data: { email: string; name: string, password: string }) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const userExists = await this.verifyEmailAlreadyExists(data.email);
            if (userExists) {
                return { status: 401, error: "Email already exists" };
            }

            const user = await prismaClient.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: hashedPassword,
                    isAdmin: false,               
                }
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
            };
        } catch (error) {
            console.log(error);
            throw new Error("Error creating user");
        }
    }

    async verifyEmailAlreadyExists(email: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });

        return user;
    }

    async singIn (data: { email: string, password: string }) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email: data.email
                }
            });



            if (user){
                const passwordMatch = await bcrypt.compare(data.password, user.password);
    
                if (!passwordMatch) {
                    return { status: 401, error: "Email or password incorrect" };
                }
    
                return {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt,
                };

            } else {
                return { status: 401, error: "Email or password incorrect" };
            }

        } catch (error) {
            console.log(error);
            throw new Error("Error signing in");
        }
    }


    async getUserNameById(id: string) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: id
                }
            });

            if (user) {
                return user.name;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Error getting user name");
        }
    }
    
    async adminRequest(userId: string){
        try {
            await prismaClient.adminRequests.create({
                data: {
                    userId: userId
                }
            })
        } catch (error) {
            console.log(error);
            throw new appError("Error requesting admin", 500);
        }
    }

}