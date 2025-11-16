module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@amanda.com',
        password: 'admin123',
        recoverPassword: null,
        situationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Usuário Teste',
        email: 'teste@amanda.com',
        password: 'teste123',
        recoverPassword: null,
        situationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
