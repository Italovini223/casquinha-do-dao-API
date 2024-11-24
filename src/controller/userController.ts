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

}