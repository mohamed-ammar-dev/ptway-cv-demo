import { injectable } from "inversify";
import { BaseRepo } from "../../../../shared/database/repository/baseRepo";
import { CvUserSavedModel } from "../../../database/models/cvUserSaved";
import { ICvUserSavedRepo } from "../../../domain/ports/ICvUserSavedRepo";

@injectable()
export class CvUserSavedRepo extends BaseRepo implements ICvUserSavedRepo {
  constructor() {
    super(CvUserSavedModel);
  }

  async getMyTemplateFileName(params: {
    userId: number;
    cvTemplateId: number;
  }) {
    return await this.findOne({
      condition: { userId: params.userId, cvTemplateId: params.cvTemplateId },
      attributes: ["fileName"],
    });
  }
}
