
module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define("Cart",{

 quantity: {
  type: DataTypes.INTEGER,
  defaultValue: 1,
      },
   
 total:{type: DataTypes.INTEGER,}
    })

    Carts.associate = (models) => {
 models.Order.belongsToMany(models.Product, {through:Carts,foreignKey:"orderId"})
 models.Product.belongsToMany(models.Order, {through:Carts,foreignKey:"productId"})

        }



    return Carts};