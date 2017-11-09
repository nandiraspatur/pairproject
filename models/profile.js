'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'first name is required'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: 'first name only allow letters'
        }
      }
    },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'last name is required'
          },
          is: {
            args: /^[a-z]+$/i,
            msg: 'last name only allow letters'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'email is required'
          },
          isEmail: {
            args: true,
            msg: 'incorrect format email'
          }
        },
        unique: {
          args: true,
          msg: 'duplicate email'
        }
      },
      phone_number: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        unique: {
          args: true,
          msg: 'duplicate email'
        }
      },
      picture_name: DataTypes.STRING
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
