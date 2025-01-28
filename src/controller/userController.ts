import { FastifyRequest, FastifyReply} from "fastify"
import { UserService, userDataProps } from "../services/user";

type getNameByIdDataPros = {
    id: string;
}

export class UserController {
    async create(resquest: FastifyRequest, reply: FastifyReply) {
        try {
            const user = resquest.body as userDataProps;
            const userService = new UserService();
            const userCreated = await userService.createUser(user);
            if (userCreated.status === 401) {
                reply.code(401).send({ message: userCreated.error });
            } else {
                reply.code(201).send({ message: "User created", user: userCreated });
            }
        } catch (error) {
            reply.code(500).send({ message: "Error creating user" });
        }

    }

    async getUserNameById(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as getNameByIdDataPros;
            const userService = new UserService();
            const userName = await userService.getUserNameById(id);
            if (!userName) {
                reply.code(404).send({ message: "User not found" });
            } else {
                reply.code(200).send({ userName });
            }
        } catch (error) {
            reply.code(500).send({ message: "Error getting user" });
        }
    }

    async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
        try {
            const userService = new UserService();
            const users = await userService.getAllUsers();
            reply.code(200).send({ users });
        } catch (error) {
            reply.code(500).send({ message: "Error getting users" });
        }
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = request.body as userDataProps;
            const userService = new UserService();
            const response = await userService.delete(user);
            reply.code(response.status).send({ message: response.message });
        } catch (error) {
            reply.code(500).send({ message: "Error deleting user" });
        }
    }


}