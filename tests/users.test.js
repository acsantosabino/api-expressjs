const request = require('supertest');
const app = require('../src/app');

describe('Users API', () => {
  it('GET /users deve retornar lista de usuários', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /users deve criar um usuário', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Teste Jest',
        email: 'jest@amanda.com',
        password: 'jest123',
        situationId: 1
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('jest@amanda.com');
  });
});
