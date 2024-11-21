import { prismaClient } from "../prisma";
import { appError } from "../utils/appError";
import { ProductService } from './product'

export type OrderProduct = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
};

export class OrderService {
  async create(data: { userId: string, products: OrderProduct[], total: number }) {
    try {
      const productService = new ProductService();
      const order = await prismaClient.order.create({
        data: {
          userId: data.userId,
          total: data.total,
          createdAt: new Date(),
          updatedAt: new Date(),
          products: {
            create: data.products.map(product => ({
              productId: product.productId,
              quantity: product.quantity
            }))
          }
        },
        include: {
          products: true
        }
      });


      for (const product of order.products) {
        const atualProduct = await productService.getProductById(product.productId);
        const newQuantity = atualProduct!.quantity - product.quantity;
        await productService.update({ id: product.productId, quantity: newQuantity });
      }

      return order;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating order");
    }
  }

  async getAll() {
    try {
      const orders = await prismaClient.order.findMany({
        include: {
          products: true
        }
      });

      return orders;
    } catch (error) {
      console.log(error);
      throw new appError("Error getting orders", 500);
    }
  }

  async getById(id: string) {
    try {
      const order = await prismaClient.order.findUnique({
        where: {
          id
        },
        include: {
          products: true
        }
      });

      return order;
    } catch (error) {
      console.log(error);
      throw new appError("Error getting order", 500);
    }
  }
}
