import { ProductService, ProductProps } from "../../services/product"; 
import {describe, expect, test, } from '@jest/globals';
import { ProductTestDataProps } from './productTestProps';


describe('ProductService', () => {
  let handleProduct: ProductProps;
  test('create a new product', async () => {
    const productService = new ProductService();
    const product: ProductTestDataProps = {
      name: 'Product 1',
      price: 10.00,
      description: 'Description of product',
      quantity: 10,
    };
    handleProduct = await productService.create(product);
    expect(handleProduct).toHaveProperty('id');
  });

  test('update a product', async () => {
    const productService = new ProductService();
    handleProduct = await productService.update({
      id: handleProduct.id,
      quantity: 1
    });
    expect(handleProduct.quantity).toBe(1);
  });

  test('get a product by id', async () => {
    const productService = new ProductService();
    const product = await productService.getProductById(handleProduct.id);
    expect(product).toHaveProperty('id');
  });

  test('get all products', async () => {
    const productService = new ProductService();
    const products = await productService.getAll();
    expect(products).toBeInstanceOf(Array);
  });

  test('delete a product', async () => {
    const productService = new ProductService();
    const product = await productService.delete(handleProduct.id);
    expect(product).toBeUndefined();
  });
});