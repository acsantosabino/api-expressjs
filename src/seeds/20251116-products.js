module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Smartphone',
        slug: 'smartphone',
        description: 'Celular moderno com múltiplas funções',
        price: 1999.99,
        productSituationId: 1,
        productCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Livro Node.js',
        slug: 'livro-nodejs',
        description: 'Livro para aprender Node.js e Express',
        price: 89.90,
        productSituationId: 1,
        productCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
