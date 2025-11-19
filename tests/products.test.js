const request = require('supertest');
const app = require('../src/app');
const { Product, ProductCategory, ProductSituation } = require('../src/models');

describe('Products API', () => {
  let categoryId;
  let productSituationId;

  beforeAll(async () => {
    // Criar categoria para os testes
    const category = await ProductCategory.create({ name: 'Test Category' });
    categoryId = category.id;

    // Criar situação de produto para os testes
    const situation = await ProductSituation.create({ name: 'Test Situation' });
    productSituationId = situation.id;
  });

  it('GET /products deve retornar lista de produtos', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /products deve criar um produto', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        name: 'Produto Teste',
        slug: 'produto-teste-' + Date.now(),
        description: 'Descrição do produto',
        price: 99.99,
        productCategoryId: categoryId,
        productSituationId: productSituationId
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Produto Teste');
    expect(parseFloat(res.body.data.price)).toBe(99.99);
  });

  it('GET /products/:id deve retornar um produto por ID', async () => {
    // Criar um produto
    const product = await Product.create({
      name: 'Teste Get',
      slug: 'teste-get-' + Date.now(),
      description: 'Descrição',
      price: 50.00,
      productCategoryId: categoryId,
      productSituationId: productSituationId
    });
    const id = product.id;

    const res = await request(app).get(`/products/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(id);
  });

  it('PUT /products/:id deve atualizar um produto', async () => {
    // Criar um produto
    const product = await Product.create({
      name: 'Teste Update',
      slug: 'teste-update-' + Date.now(),
      description: 'Descrição',
      price: 75.00,
      productCategoryId: categoryId,
      productSituationId: productSituationId
    });
    const id = product.id;

    const res = await request(app)
      .put(`/products/${id}`)
      .send({
        name: 'Produto Atualizado',
        price: 150.00
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Produto Atualizado');
    expect(parseFloat(res.body.data.price)).toBe(150.00);
  });

  it('DELETE /products/:id deve deletar um produto', async () => {
    // Criar um produto para deletar
    const product = await Product.create({
      name: 'Teste Delete',
      slug: 'teste-delete-' + Date.now(),
      description: 'Descrição',
      price: 25.00,
      productCategoryId: categoryId,
      productSituationId: productSituationId
    });
    const id = product.id;

    const res = await request(app).delete(`/products/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // Verificar se foi realmente deletado
    const deleted = await Product.findByPk(id);
    expect(deleted).toBeNull();
  });

  it('GET /products/:id com ID inválido deve retornar 404', async () => {
    const res = await request(app).get('/products/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
