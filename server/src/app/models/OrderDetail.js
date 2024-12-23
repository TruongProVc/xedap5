const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
    const OrderDetail = sequelize.define('OrderDetail', {
      OrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
    
    OrderDetail.associate = (models) => {
      OrderDetail.belongsTo(models.Order, { foreignKey: 'OrderId' });
      OrderDetail.belongsTo(models.Product, { foreignKey: 'ProductId' });
    };
  
    module.exports = OrderDetail;
