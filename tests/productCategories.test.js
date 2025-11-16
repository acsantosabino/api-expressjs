const request = require('supertest');
const app = require('../src/app');
const { ProductCategory } = require('../models');

describe('Product Categories API', () => {
  it('GET /product-categories deve retornar lista de categorias', async () => {
    const res = await request(app).get('/product-categories');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /product-categories deve criar uma categoria', async () => {
    const res = await request(app)
      .post('/product-categories')
      .send({
        name: 'Eletrônicos'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Eletrônicos');
  });

  it('GET /product-categories/:id deve retornar uma categoria por ID', async () => {
    // Criar uma categoria
    const category = await ProductCategory.create({ name: 'Teste Get' });
    const id = category.id;

    const res = await request(app).get(`/product-categories/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(id);
  });

  it('PUT /product-categories/:id deve atualizar uma categoria', async () => {
    // Criar uma categoria
    const category = await ProductCategory.create({ name: 'Teste Update' });
    const id = category.id;

    const res = await request(app)
      .put(`/product-categories/${id}`)
      .send({
        name: 'Teste Updated'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Teste Updated');
  });

  it('DELETE /product-categories/:id deve deletar uma categoria', async () => {
    // Criar uma categoria para deletar
    const category = await ProductCategory.create({ name: 'Teste Delete' });
    const id = category.id;

    const res = await request(app).delete(`/product-categories/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // Verificar se foi realmente deletada
    const deleted = await ProductCategory.findByPk(id);
    expect(deleted).toBeNull();
  });

  it('GET /product-categories/:id com ID inválido deve retornar 404', async () => {
    const res = await request(app).get('/product-categories/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
