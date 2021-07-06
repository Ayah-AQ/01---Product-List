const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Shops = sequelize.define("Shop", {
    name: { type: DataTypes.STRING},
    slug: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Shops, { source: ["name"] })
  
  Shops.associate = (models) => {
    models.User.hasMany(Shops, {
      foreignKey: "userId",
      as: "shops",
      })
      Shops.belongsTo(models.User, { foreignKey: "userId" });
    }
  return Shops;
};