module.exports = (sequelize, DataTypes) => {
  const ProductSituation = sequelize.define('ProductSituation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'product_situations',
    timestamps: true
  });
  return ProductSituation;
};
