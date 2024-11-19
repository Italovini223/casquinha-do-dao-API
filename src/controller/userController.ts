import { FastifyRequest, FastifyReply} from "fastify"
import { UserService, userDataProps } from "../services/user";

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

    async singIn(request: FastifyRequest, reply: FastifyReply) {
        
    }
}