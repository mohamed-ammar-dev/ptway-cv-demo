import { injectable } from "inversify";
import { BaseRepo } from "../../../../shared/database/repository/baseRepo";
import { IBaseRepo } from "../../../../shared/interfaces/IBaseRepo";
import { CvTemplatesModel } from "../../../database/models/cvTemplates";

@injectable()
export class CvTemplatesRepo extends BaseRepo implements IBaseRepo {
  constructor() {
    super(CvTemplatesModel);
  }
}
