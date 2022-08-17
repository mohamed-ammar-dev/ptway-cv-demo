import { injectable } from "inversify";
import { BaseRepo } from "../../../../shared/database/repository/baseRepo";
import { paginationType } from "../../../../shared/types/paginationType";
import { CvTemplatesModel } from "../../../database/models/cvTemplates";
import { ICvTemplatesRepo } from "../../../domain/ports/ICvTemplateRepo";

@injectable()
export class CvTemplatesRepo extends BaseRepo implements ICvTemplatesRepo {
  constructor() {
    super(CvTemplatesModel);
  }

  async getAllTemplates(params: paginationType) {
    return await this.findWithPagination({
      condition: params,
      attributes: ["id", "filename"],
    });
  }

  async getTemplateId(cvTemplateId: number) {
    return await this.findOne({
      condition: { id: cvTemplateId },
      attributes: ["id"],
    });
  }

  async getTemplateFileName(cvTemplateId: number) {
    return await this.findOne({
      condition: { id: cvTemplateId },
      attributes: ["filename"],
    });
  }
}
