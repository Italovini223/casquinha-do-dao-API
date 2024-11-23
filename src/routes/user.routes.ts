import { FastifyInstance , FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "../controller/userController";


export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post('/', async function handler (request: FastifyRequest, reply: FastifyReply) {
        return new UserController().create(request, reply);
    })


}