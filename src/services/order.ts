import { prismaClient } from "../prisma";

export type OrderProduct = {
  id: string;
  orderId: string;
  productId: string;
};

export class OrderService {
  async create(data: { userId: string, products: OrderProduct[], total: number }) {
    try {
      const order = await prismaClient.order.create({
        data: {
          userId: data.userId,
          products: {
            create: data.products
          },
          total: data.total,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });

      return order;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating order");
    }

  }
}
