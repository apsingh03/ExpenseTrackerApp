module.exports = (sequelize, DataTypes) => {
  const FileDownload = sequelize.define("fileDownload", {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return FileDownload;
};
