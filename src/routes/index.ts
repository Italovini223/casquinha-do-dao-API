import { FastifyInstance , FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { userRoutes } from './user.routes';
import { sectionRoutes } from './section.routes';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.register(userRoutes, { prefix: '/user' });
  fastify.register(sectionRoutes, { prefix: '/section' });
}