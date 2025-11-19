module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('product_situations', [
      { name: 'Em estoque', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Esgotado', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('product_situations', null, {});
  }
};
