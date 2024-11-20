import { prismaClient } from "../prisma";

export type OrderProduct = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
};

export class OrderService {
  async create(data: { userId: string, products: OrderProduct[], total: number }) {
    try {
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

      return order;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating order");
    }
  }
}
