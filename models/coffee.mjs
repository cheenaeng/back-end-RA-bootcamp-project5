export default function initCoffeeModel(sequelize, DataTypes) {
  return sequelize.define('coffee', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    milk: {
      type: DataTypes.JSON,
    },
    sugar: {
      type: DataTypes.STRING,
    },
    concentration: {
      type: DataTypes.DECIMAL,
    },
    temperature: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
