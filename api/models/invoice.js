'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.hasMany(models.Item);
    }
  }
  Invoice.init({
    customer: DataTypes.STRING,
    issueDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    comment: DataTypes.STRING,
    invoiceTotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoice',
    timestamps: false
  });
  return Invoice;
};
