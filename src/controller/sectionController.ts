import { FastifyRequest, FastifyReply} from "fastify"
import { SectionService } from "../services/section";
import { userDataProps } from "../services/user";

export class SectionController {
    async create(request: FastifyRequest, reply: FastifyReply) {
      try {
        const { email, password} = request.body as userDataProps;
        const sectionService = new SectionService();
        const userCreated = await sectionService.signIn({ email, password });
        if (userCreated.status === 401) {
            reply.code(401).send({ message: userCreated.error });
        } else {
            reply.code(201).send({ message: "singin successful", user: userCreated });
        }
    } catch (error) {
        console.log(error);
        reply.code(500).send({ message: "Error singin" });
    }
    }
}