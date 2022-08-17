import { IBaseRepo } from "../../../shared/interfaces/IBaseRepo";
import { cvUserSavedModel } from "../../types/cvUserInfoModelType";

export interface ICvUserInfoRepo extends IBaseRepo {
  getById(userId: number): Promise<cvUserSavedModel>;
}
