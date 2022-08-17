import { IBaseRepo } from "../../../shared/interfaces/IBaseRepo";

export interface ICvUserSavedRepo extends IBaseRepo {
  getMyTemplateFileName(params: {
    userId: number;
    cvTemplateId: number;
  }): Promise<{ fileName: string }>;
}
