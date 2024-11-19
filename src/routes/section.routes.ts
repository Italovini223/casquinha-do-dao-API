import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { SectionController } from "../controller/sectionController";

export async function sectionRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/', async function handler(request: FastifyRequest, reply: FastifyReply) {
    return new SectionController().create(request, reply);
  })
}