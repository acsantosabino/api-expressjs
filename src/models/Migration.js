module.exports = (sequelize, DataTypes) => {
  const Migration = sequelize.define('Migration', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: { type: DataTypes.BIGINT, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'migrations',
    timestamps: false
  });
  return Migration;
};
