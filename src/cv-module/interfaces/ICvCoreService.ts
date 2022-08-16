import { paginationType } from "../../shared/types/paginationType";
import { cvUserSavedModel } from "../types/cvUserSavedModelType";

export interface ICvCoreService {
  getAllTemplates(params: paginationType): Promise<
    {
      url: string;
      fileName: string;
    }[][]
  >;

  getMyTemplate(params: {
    userId: number;
    cvTemplateId: number;
  }): Promise<string>;

  saveMyCvTemplateInfo(params: any): Promise<void>;

  saveMyCvTemplate(params: {
    userId: number;
    cvTemplateId: number;
  }): Promise<cvUserSavedModel>;
}
