import { it, describe, expect } from '@jest/globals';
import { OrderService } from '../../services/order';
import { UserService } from '../../services/user';

describe('OrderService', () => {
 
  let orderId: string;
  

  const orderData = {
    userId: "67421c56b840b9a13165918d",
    products: [
      { id: 'test-product-id-1', orderId: 'test-order-id', productId: 'test-product-id-1', quantity: 2 },
      { id: 'test-product-id-2', orderId: 'test-order-id', productId: 'test-product-id-2', quantity: 3 }
    ],
    total: 100
  };

  it('should be able get all orders', async () => {
    const orderService = new OrderService();
    const orders = await orderService.getAll();
    orderId = orders[0].id;
    expect(orders).toBeInstanceOf(Array);
  });

  it('should be able get an order by id', async () => {
    const orderService = new OrderService();
    const order = await orderService.getById(orderId);
    expect(order!.id).toMatch(orderId);
  });

  it('should be able to create an order', async () => {
    const orderService = new OrderService();
    const order = await orderService.create(orderData);
    orderId = order.id;
    expect(order).toHaveProperty('id');
    expect(order.products.length).toBe(orderData.products.length);
  });

  it('should be able to update an order', async () => {
    const orderService = new OrderService();
    const updatedOrder = await orderService.update({ id: orderId, isPaid: true });
    expect(updatedOrder.isPaid).toBe(true);
  });

  it('should be able to delete an order', async () => {
    const orderService = new OrderService();
    await orderService.delete(orderId);
    const order = await orderService.getById(orderId);
    expect(order).toBeNull();
  });
});