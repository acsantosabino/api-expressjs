const { sequelize, Situation } = require('../src/models');

module.exports = async () => {
  try {
    // Sincronizar banco de dados
    await sequelize.sync({ force: false });
    
    // Inserir dados de teste se não existirem
    const situationCount = await Situation.count();
    if (situationCount === 0) {
      await Situation.bulkCreate([
        { nameSituation: 'Ativo' },
        { nameSituation: 'Inativo' },
        { nameSituation: 'Pendente' }
      ]);
      console.log('✓ Dados de teste inseridos');
    }
  } catch (error) {
    console.error('Erro ao configurar testes:', error);
    process.exit(1);
  }
};
