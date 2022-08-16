import { createUniqueName } from "../shared/utils/createUniqueName";
import { promisify } from "util";
import { pipeline } from "stream";
import { createWriteStream } from "fs";
import { join } from "path";

const fetch = require("node-fetch");

const streamPipeline = promisify(pipeline);

class NetworkingRest {
  async get(url: string, headers?: any) {
    try {
      let response = await fetch(url, { headers });

      return await response.json();
    } catch (error: any) {
      console.error(error);

      let responseError = error.response ? error.response.body : error;
      return responseError;
    }
  }

  async post(params: any) {
    let body = params.body;
    let headers = params.headers;
    let url = params.url;

    try {
      let response = await fetch(url, {
        method: "post",
        body: JSON.stringify(body),
        headers: headers,
      });

      return await response.json();
    } catch (error: any) {
      console.error(error);

      let responseError = error.response ? error.response.data : error;
      return responseError;
    }
  }

  async download(params: any) {
    try {
      const url = params.url;
      const path = params.path || join(__dirname, "./src/downloads");
      const fileName = params.fileName || createUniqueName(params.extension);
      const fullPath = `${path}/${fileName}`;

      const response = await this.get(url);

      await streamPipeline(response, createWriteStream(fullPath));

      return { fullPath, fileName, path };
    } catch (error: any) {
      console.error(error);

      let responseError = error.response ? error.response.body : error;
      return responseError;
    }
  }
}

export default new NetworkingRest();
