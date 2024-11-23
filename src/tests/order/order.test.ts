import { it, describe, expect } from '@jest/globals';
import { OrderService } from '../../services/order';

describe('OrderService', () => {
  let orderId: string;
  it('should be able get all orders', async () => {
    const orderService = new OrderService();
    const orders = await orderService.getAll();
    orderId = orders[0].id;
    expect(orders).toBeInstanceOf(Array);
  });

  it(' should be able get a order by id', async () => {
    const orderService = new OrderService();
    const order = await orderService.getById(orderId);
    expect(order!.id).toMatch(orderId);
  });
});