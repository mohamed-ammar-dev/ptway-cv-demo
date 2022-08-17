import { injectable } from "inversify";
import { BaseRepo } from "../../../../shared/database/repository/baseRepo";
import { CvUserInfoModel } from "../../../database/models/cvUserInfo";
import { ICvUserInfoRepo } from "../../../domain/ports/ICvUserInfoRepo";

@injectable()
export class CvUserInfoRepo extends BaseRepo implements ICvUserInfoRepo {
  constructor() {
    super(CvUserInfoModel);
  }

  async getById(userId: number) {
    return await this.findOne({
      condition: { userId },
    });
  }
}
