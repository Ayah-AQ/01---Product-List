module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Order", {})
    Orders.associate = (models) => {
    models.User.hasMany(Orders, {foreignKey:"customerId"})
    Orders.belongsTo(models.User,{foreignKey:"customerId"})
    }
    return Orders}