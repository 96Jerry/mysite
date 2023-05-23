import { Injectable } from "@nestjs/common";
import { Storage } from "@google-cloud/storage";
import { FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";

interface IFileServiceUpload {
  file: FileUpload;
}

@Injectable()
export class FileService {
  upload({ file }: IFileServiceUpload) {
    console.log(file);

    const storage = new Storage({
      projectId: process.env.GCP_PROJECTID,
      keyFilename: process.env.GCP_KEYFILENAME,
    }).bucket("my-first-website-images");

    const blobStream = storage.file(file.filename).createWriteStream();

    file
      .createReadStream()
      .pipe(blobStream)
      .on("finish", () => {
        console.log("성공");
      })
      .on("error", () => {
        console.log("실패");
      });

    console.log("파일전송완료");

    return "끝";
  }
}
