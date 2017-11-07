'use strict';
module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
    time: DataTypes.STRING,
    studio: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Schedule.associate = models => {
    Schedule.hasMany(models.Movie)
  }
  return Schedule;
};
