module.exports = (sequelize, DataTypes) => {
  const Situation = sequelize.define('Situation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameSituation: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'situations',
    timestamps: true
  });
  return Situation;
};
