import { Model, Sequelize, DataTypes } from "sequelize";
import { server } from "../../../config/server";
import { MODEL } from "../../enums/models";

const sequelize = <Sequelize>(<unknown>server.dataBaseConnection);

const CvUserInfoModel = sequelize.define<Model>(
  MODEL.CV_USER_INFO,
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    objective: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //WE WILL FORCE SPECIFIC FORMAT FROM THE REQUEST BODY
    experience: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    //WE CAN ADD MORE
  },
  {
    freezeTableName: true,

    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }
);

export { CvUserInfoModel };
