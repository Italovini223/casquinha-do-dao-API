import { FastifyInstance , FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "../controller/userController";
import { ensureAuthenticate } from "../middleware/ensureAuthenticate";


export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post('/', async function handler (request: FastifyRequest, reply: FastifyReply) {
        return new UserController().create(request, reply);
    })

    fastify.get('/:id', { preHandler: ensureAuthenticate},  async function handler (request: FastifyRequest, reply: FastifyReply) {
        return new UserController().getUserNameById(request, reply);
    })

    fastify.get('/', { preHandler: ensureAuthenticate}, async function handler (request: FastifyRequest, reply: FastifyReply) {
        return new UserController().getAllUsers(request, reply);
    })

}