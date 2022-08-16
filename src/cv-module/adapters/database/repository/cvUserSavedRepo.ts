import { injectable } from "inversify";
import { BaseRepo } from "../../../../shared/database/repository/baseRepo";
import { IBaseRepo } from "../../../../shared/interfaces/IBaseRepo";
import { CvUserSavedModel } from "../../../database/models/cvUserSaved";

@injectable()
export class CvUserSavedRepo extends BaseRepo implements IBaseRepo {
  constructor() {
    super(CvUserSavedModel);
  }
}
