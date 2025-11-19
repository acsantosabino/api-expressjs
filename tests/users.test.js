const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models');

describe('Users API', () => {
  it('GET /users deve retornar lista de usuários', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /users deve criar um usuário', async () => {
    const uniqueEmail = `jest-${Date.now()}@amanda.com`;
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Teste Jest',
        email: uniqueEmail,
        password: 'jest123',
        situationId: 1
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(uniqueEmail);
  });

  it('GET /users/:id deve retornar um usuário por ID', async () => {
    // Pegar o primeiro usuário
    const users = await User.findAll();
    const id = users[0].id;

    const res = await request(app).get(`/users/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(id);
  });

  it('PUT /users/:id deve atualizar um usuário', async () => {
    // Criar um usuário para atualizar
    const user = await User.create({
      name: 'Teste Update',
      email: `update-${Date.now()}@amanda.com`,
      password: 'password123',
      situationId: 1
    });
    const id = user.id;

    const res = await request(app)
      .put(`/users/${id}`)
      .send({
        name: 'Usuário Atualizado'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Usuário Atualizado');
  });

  it('DELETE /users/:id deve deletar um usuário', async () => {
    // Criar um usuário para deletar
    const user = await User.create({
      name: 'Teste Delete',
      email: `delete-${Date.now()}@amanda.com`,
      password: 'password123',
      situationId: 1
    });
    const id = user.id;

    const res = await request(app).delete(`/users/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // Verificar se foi realmente deletado
    const deleted = await User.findByPk(id);
    expect(deleted).toBeNull();
  });

  it('GET /users/:id com ID inválido deve retornar 404', async () => {
    const res = await request(app).get('/users/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
