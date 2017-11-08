'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Profile.prototype.getFullName = function () {
    return `${this.first_name} ${this.last_name}`
  };

  Profile.associate = models => {
    Profile.belongsTo(models.User);
    Profile.hasMany(models.ProfileMovie);
    Profile.belongsToMany(models.Movie, { through: models.ProfileMovie });
  }

  return Profile;
};
