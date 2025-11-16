module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    productSituationId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'product_situations', key: 'id' } },
    productCategoryId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'product_categories', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'products',
    timestamps: true
  });
  return Product;
};
