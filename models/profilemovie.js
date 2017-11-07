'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProfileMovie = sequelize.define('ProfileMovie', {
    ProfileId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  ProfileMovie.associate = models => {
    ProfileMovie.belongsTo(models.Profile);
    ProfileMovie.belongsTo(models.Movie);
  }
  return ProfileMovie;
};
