'use strict';
module.exports = (sequelize, DataTypes) => {
  var CustomerMovie = sequelize.define('CustomerMovie', {
    CustomerId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  CustomerMovie.associate = models => {
    CustomerMovie.belongsTo(models.Profile);
    CustomerMovie.belongsTo(models.Movie);
  }
  return CustomerMovie;
};
