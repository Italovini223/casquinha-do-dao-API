import { prismaClient } from "../prisma";
import { appError } from "../utils/appError";

export type ProductProps = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
}

export class ProductService {
  async create(data: { name: string, description: string, price: number, quantity: number }) {
    try {
      if(!data.name || !data.description || !data.price || !data.quantity) {
        throw new appError("Name, description, price and quantity are requested", 400);
      }

      const product = await prismaClient.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });

      return product;
    } catch (error) {
      console.log(error);
      throw new appError("Error creating product", 500);
    }
  }

  async update(data: { id: string, name?: string, description?: string, price?: number, quantity?: number }) {
    try {
      const product = await this.getProductById(data.id);

      if(!product) {
        throw new appError("Product not found", 404);
      }
      const newProduct = await prismaClient.product.update({
        where: {
          id: data.id
        },
        data: {
          name: data.name ?? product.name,
          description: data.description ?? product.description,
          price: data.price ?? product.price,
          quantity: data.quantity ?? product.quantity,
          updatedAt: new Date(),
        }
      });

      return newProduct;
    } catch (error) {
      console.log(error);
      throw new appError("Error updating product", 500);
    }
  }

  async getProductById(id: string) {
    try {
      const product = await prismaClient.product.findUnique({
        where: {
          id
        }
      });

      return product;
    } catch (error) {
      console.log(error);
      throw new appError("Error getting product", 500);
    }
  }

  async getAll() {
    try {
      const products = await prismaClient.product.findMany();

      return products;
    } catch (error) {
      console.log(error);
      throw new appError("Error getting products", 500);
    }
  }
}