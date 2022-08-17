import { IBaseRepo } from "../../../shared/interfaces/IBaseRepo";
import { paginationType } from "../../../shared/types/paginationType";

export interface ICvTemplatesRepo extends IBaseRepo {
  getAllTemplates(
    params: paginationType
  ): Promise<{ id: number; fileName: string }[]>;

  getTemplateId(cvTemplateId: number): Promise<{ id: number }>;

  getTemplateFileName(cvTemplateId: number): Promise<{ fileName: string }>;
}
