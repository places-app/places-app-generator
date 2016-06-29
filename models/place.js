module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('place', {
    name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    favsCount: DataTypes.INTEGER,
    pinnedCount: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Place.belongsTo(models.user);
      },
    },
  });
  return Place;
};
