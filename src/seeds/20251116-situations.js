module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('situations', [
      { nameSituation: 'Ativo', createdAt: new Date(), updatedAt: new Date() },
      { nameSituation: 'Inativo', createdAt: new Date(), updatedAt: new Date() },
      { nameSituation: 'Pendente', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('situations', null, {});
  }
};
