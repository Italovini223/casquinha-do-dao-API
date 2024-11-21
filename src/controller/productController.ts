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

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id, name, price, quantity, description } = request.body as ProductProps;
      const productService = new ProductService();
      const product = await productService.update({ id, name, price, quantity, description });
      reply.code(200).send({ product, message: "Product updated" });
    } catch (error) {
      console.log(error);
      throw new appError("Error updating product", 500);
    }
  }

  async searchById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const productService = new ProductService();
      const product = await productService.getProductById(id);
      reply.code(200).send({ product });
    } catch (error) {
      console.log(error);
      throw new appError("Error searching product", 500);
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const productService = new ProductService();
      const products = await productService.getAll();
      reply.code(200).send({ products });
    } catch (error) {
      console.log(error);
      throw new appError("Error getting products", 500);
    }
  }
}