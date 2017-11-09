'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Nama depan tidak boleh kosong'
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
            msg: 'Nama belakang tidak boleh kosong'
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
            msg: 'Email tidak boleh kosong'
          },
          isEmail: {
            args: true,
            msg: 'Format email salah'
          }
        },
        unique: {
          args: true,
          msg: 'Email telah digunakan'
        }
      },
      phone_number: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        unique: {
          args: true,
          msg: 'UserId telah digunakan'
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
