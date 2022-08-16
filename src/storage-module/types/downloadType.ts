import { STORAGE_MODULE } from "../enums/storageModule";

export type downloadType = {
  module: STORAGE_MODULE;
  referenceId: string;
  bucket: string;
  filesName: Array<string>;
};
