import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { AdminController } from "../controller/adminController";
import { ensureAuthenticate } from "../middleware/ensureAuthenticate";

export async function adminRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/:id', { preHandler: ensureAuthenticate }, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new AdminController().adminRequest(request, reply);
  });

  fastify.patch('/:id', { preHandler: ensureAuthenticate }, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new AdminController().adminAccept(request, reply);
  });

  fastify.get('/', { preHandler: ensureAuthenticate }, async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new AdminController().getAllAdminRequests(request, reply);
  });

}