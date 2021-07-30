'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Carts", { 

      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
            },
         
       total:{type: Sequelize.INTEGER,},
          

      orderId:{type:Sequelize.INTEGER, 
        reference:{model:{
          tableName:"Orders",
          schema:"schema"
        },key:"id" }, allowNull:false},

     productId:{type:Sequelize.INTEGER, 
      reference:{model:{
        tableName:'Products',
        schema:"schema"
      },key:"id" }, allowNull:false},

      updatedAt:{type: Sequelize.DATE, allowNull:false},
      createdAt: {type: Sequelize.DATE, allowNull:false}

    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable("Carts");
    
  }
};
