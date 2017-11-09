'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    ticket_price: DataTypes.INTEGER,
    ScheduleId: DataTypes.INTEGER,
    trailer_link: DataTypes.STRING,
    picture_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Movie.associate = models => {
    Movie.hasMany(models.ProfileMovie);
    Movie.belongsToMany(models.Profile, { through: models.ProfileMovie });
    Movie.belongsTo(models.Schedule);
  }
  return Movie;
};
