import { downloadType } from "../types/downloadType";
import { putType } from "../types/putType";
import { uploadType } from "../types/uploadType";

export interface ISignedUrlService {
  download(params: downloadType): Promise<
    {
      url: string;
      fileName: string;
    }[]
  >;

  upload(params: uploadType): Promise<
    {
      url: string;
      fileName: string;
    }[]
  >;

  put(params: putType): Promise<void>;
}
