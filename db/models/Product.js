const sequelizeSlugify  = require( "sequelize-slugify")
module.exports =(sequelize,DataTypes)=> {
    const Products=sequelize.define("Product",{
    name:{
        type: DataTypes.STRING,
           
    },
    slug:{
        type: DataTypes.STRING,
           unique: true
    },
    price:{
        type: DataTypes.INTEGER,
         },
    image:{
        type: DataTypes.STRING,
           
    },
    description:{
        type: DataTypes.STRING,
      
    }
});
sequelizeSlugify.slugifyModel(Products,{
source: ["name"]
});
Products.associate = (models) => {
    models.Shop.hasMany(Products, {
      foreignKey: "shopId",
      as: "products",
      })
      Products.belongsTo(models.Shop, { foreignKey: "shopId" });
    }
return Products}