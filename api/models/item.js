'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Invoice);
    }
  }
  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity:DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    InvoiceId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Item',
    timestamps: false
  });
  return Item;
};
