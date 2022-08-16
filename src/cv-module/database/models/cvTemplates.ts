import { Model, Sequelize, DataTypes } from "sequelize";
import { server } from "../../../config/server";
import { MODEL } from "../../enums/models";

const sequelize = <Sequelize>(<unknown>server.dataBaseConnection);

const CvTemplatesModel = sequelize.define<Model>(
  MODEL.CV_TEMPLATES,
  {
    //MAYBE SOME TEMPLATES NOT FREE
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    //FILENAME IN AWS S3 BUCKET
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,

    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }
);

export { CvTemplatesModel };
