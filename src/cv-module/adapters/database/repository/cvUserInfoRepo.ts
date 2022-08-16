import { injectable } from "inversify";
import { BaseRepo } from "../../../../shared/database/repository/baseRepo";
import { IBaseRepo } from "../../../../shared/interfaces/IBaseRepo";
import { CvUserInfoModel } from "../../../database/models/cvUserInfo";

@injectable()
export class CvUserInfoRepo extends BaseRepo implements IBaseRepo {
  constructor() {
    super(CvUserInfoModel);
  }
}
