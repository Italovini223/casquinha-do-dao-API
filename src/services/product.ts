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
}