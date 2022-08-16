import { STORAGE_MODULE } from "../enums/storageModule";

export type uploadType = {
  module: STORAGE_MODULE;
  referenceId: string;
  bucket: string;
  filesName: Array<string>;
};
