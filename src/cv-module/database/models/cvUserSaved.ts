import { Model, Sequelize, DataTypes } from "sequelize";
import { server } from "../../../config/server";
import { MODEL } from "../../enums/models";

const sequelize = <Sequelize>(<unknown>server.dataBaseConnection);

const CvUserSavedModel = sequelize.define<Model>(
  MODEL.CV_USER_SAVED,
  {
    cvTemplateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export { CvUserSavedModel };
