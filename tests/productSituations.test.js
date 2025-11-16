const request = require('supertest');
const app = require('../src/app');
const { ProductSituation } = require('../models');

describe('Product Situations API', () => {
  it('GET /product-situations deve retornar lista de situações de produtos', async () => {
    const res = await request(app).get('/product-situations');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /product-situations deve criar uma situação de produto', async () => {
    const res = await request(app)
      .post('/product-situations')
      .send({
        name: 'Em Estoque'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Em Estoque');
  });

  it('GET /product-situations/:id deve retornar uma situação de produto por ID', async () => {
    // Criar uma situação de produto
    const productSituation = await ProductSituation.create({ name: 'Teste Get' });
    const id = productSituation.id;

    const res = await request(app).get(`/product-situations/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(id);
  });

  it('PUT /product-situations/:id deve atualizar uma situação de produto', async () => {
    // Criar uma situação de produto
    const productSituation = await ProductSituation.create({ name: 'Teste Update' });
    const id = productSituation.id;

    const res = await request(app)
      .put(`/product-situations/${id}`)
      .send({
        name: 'Teste Updated'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Teste Updated');
  });

  it('DELETE /product-situations/:id deve deletar uma situação de produto', async () => {
    // Criar uma situação de produto para deletar
    const productSituation = await ProductSituation.create({ name: 'Teste Delete' });
    const id = productSituation.id;

    const res = await request(app).delete(`/product-situations/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // Verificar se foi realmente deletada
    const deleted = await ProductSituation.findByPk(id);
    expect(deleted).toBeNull();
  });

  it('GET /product-situations/:id com ID inválido deve retornar 404', async () => {
    const res = await request(app).get('/product-situations/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
