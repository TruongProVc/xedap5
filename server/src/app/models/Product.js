const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Brand = require('./Brand');

const Product = sequelize.define('Product', {
    ProductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    SummaryDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    IdBrand: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Avatar: { // Thêm trường Image để lưu đường dẫn ảnh
        type: DataTypes.STRING,
        allowNull: true, // Có thể null nếu không có ảnh
    },
}, {
    tableName: 'Product',
    timestamps: false,
});

// Thiết lập mối quan hệ
Product.belongsTo(Brand, { foreignKey: 'IdBrand' });
Brand.hasMany(Product, { foreignKey: 'IdBrand' });

module.exports = Product;
