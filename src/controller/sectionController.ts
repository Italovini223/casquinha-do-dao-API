import { FastifyRequest, FastifyReply} from "fastify"
import { SectionService } from "../services/section";
import { userDataProps } from "../services/user";
import { appError } from "../utils/appError";

export class SectionController {
    async create(request: FastifyRequest, reply: FastifyReply) {
      try {
        const { email, password} = request.body as userDataProps;
        const sectionService = new SectionService();
        const {token, user} = await sectionService.signIn({ email, password });
        reply.code(201).send({ user, token });
    } catch (error) {
        console.log(error);
        throw new appError("Error creating user", 500);
    }
    }
}