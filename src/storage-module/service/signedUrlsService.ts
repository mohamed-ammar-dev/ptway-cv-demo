import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "aws-sdk";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { modulePath } from "../../config/storagePathConfig";
import { putType } from "../types/putType";
import { uploadType } from "../types/uploadType";
import { downloadType } from "../types/downloadType";

const client = new S3Client({ region: "us-east-2" });

export class SignedUrlService {
  async download(params: downloadType) {
    const storageModule = params.module;
    const referenceId = params.referenceId;
    const bucket = params.bucket;
    const filesName = params.filesName;
    const module = modulePath[storageModule];

    let urls = [];
    for (let i = 0; i < filesName.length; i++) {
      const fileName = filesName[i];

      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: `${module}/${referenceId}/${fileName}`,
      });

      urls.push({
        url: await getSignedUrl(client, command, { expiresIn: 3600 }),
        fileName,
      });
    }

    return urls;
  }

  async upload(params: uploadType) {
    const storageModule = params.module;
    const referenceId = params.referenceId;
    const bucket = params.bucket;
    const filesName = params.filesName;
    const module = modulePath[storageModule];
    let urls = [];
    for (let i = 0; i < filesName.length; i++) {
      const fileName = filesName[i];

      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: `${module}/${referenceId}/${fileName}`,
      });

      urls.push({
        url: await getSignedUrl(client, command, { expiresIn: 3600 }),
        fileName,
      });
    }

    return urls;
  }

  async put(params: putType) {
    const Key = params.key;
    const Bucket = params.bucket;
    const data = params.data;
    const ContentType = params.contentType;

    const s3 = new S3();

    await s3.putObject({ Key, Bucket, Body: data, ContentType }).promise();
  }
}
