module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('product_categories', [
      { name: 'Eletrônicos', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Livros', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Roupas', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('product_categories', null, {});
  }
};
