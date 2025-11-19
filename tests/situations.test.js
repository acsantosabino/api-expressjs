const request = require('supertest');
const app = require('../src/app');
const { Situation } = require('../src/models');

describe('Situations API', () => {
  let situationId;

  it('GET /situations deve retornar lista de situações', async () => {
    const res = await request(app).get('/situations');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /situations deve criar uma situação', async () => {
    const res = await request(app)
      .post('/situations')
      .send({
        nameSituation: 'Situação Teste'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.nameSituation).toBe('Situação Teste');
    situationId = res.body.data.id;
  });

  it('GET /situations/:id deve retornar uma situação por ID', async () => {
    // Pegar a primeira situação
    const situations = await Situation.findAll();
    const id = situations[0].id;

    const res = await request(app).get(`/situations/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(id);
  });

  it('PUT /situations/:id deve atualizar uma situação', async () => {
    // Pegar a primeira situação
    const situations = await Situation.findAll();
    const id = situations[0].id;

    const res = await request(app)
      .put(`/situations/${id}`)
      .send({
        nameSituation: 'Situação Atualizada'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.nameSituation).toBe('Situação Atualizada');
  });

  it('DELETE /situations/:id deve deletar uma situação', async () => {
    // Criar uma situação para deletar
    const situation = await Situation.create({ nameSituation: 'Situação para Deletar' });
    const id = situation.id;

    const res = await request(app).delete(`/situations/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // Verificar se foi realmente deletada
    const deleted = await Situation.findByPk(id);
    expect(deleted).toBeNull();
  });

  it('GET /situations/:id com ID inválido deve retornar 404', async () => {
    const res = await request(app).get('/situations/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
