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
            throw new appError("Error creating user", 500);
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
            throw new appError("Error signing in", 500);
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
            throw new appError("Error getting user name", 500);
        }
    }
    
    async getAllUsers(){
        try {
            const users = await prismaClient.user.findMany();
            const filteredUser = users.map(user => {
                return {
                    name: user.name,
                    id: user.id,
                }
            });

            return filteredUser;
        } catch (error) {
            throw new appError("Error getting all users", 500);
        }
    }

    async delete(data: { email: string, password: string}){
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email: data.email
                }
            });

            if (user){
                const passwordMatch = await bcrypt.compare(data.password, user.password);
    
                if (!passwordMatch) {
                    return { status: 401, message: "Email or password incorrect" };
                }

                await prismaClient.user.delete({
                    where: {
                        id: user.id
                    }
                });
    
                return { status: 200, message: "User deleted" };

            } else {
                return { status: 401, message: "Email or password incorrect" };
            }
        } catch (error) {
            throw new appError("Error deleting user", 500);
        }
    }

}