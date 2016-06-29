module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    fbId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    repCount: DataTypes.INTEGER,
    location: DataTypes.STRING,
    interval: DataTypes.INTEGER,
    posting: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.place);
      },
    },
  });
  return User;
};
