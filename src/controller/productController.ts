import { FastifyRequest, FastifyReply } from "fastify";
import { ProductService, ProductProps } from "../services/product";
import { appError } from "../utils/appError";

export class ProductController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, price, quantity, description } = request.body as ProductProps;
      const productService = new ProductService();
      const product = await productService.create({ name, price, quantity , description});
      reply.code(201).send({ product, message: "Product created" });
    } catch (error) {
      console.log(error);
      throw new appError("Error creating product", 500);
    }
  }
}