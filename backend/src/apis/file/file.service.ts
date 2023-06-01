import { Injectable } from "@nestjs/common";
import { Storage } from "@google-cloud/storage";
import { FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";

interface IFileServiceUpload {
  file: FileUpload;
}

@Injectable()
export class FileService {
  async upload({ file }: IFileServiceUpload): Promise<string> {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECTID,
      keyFilename: process.env.GCP_KEYFILENAME,
    });
    const bucket = storage.bucket("my-first-website-images");

    const result = await new Promise<string>((resolve, reject) => {
      const blob = bucket.file(file.filename);
      const blobStream = blob.createWriteStream();
      file
        .createReadStream()
        .pipe(blobStream)
        .on("finish", async () => {
          // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          const config = {
            action: "read" as const,
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
          };
          const [signedUrl] = await blob.getSignedUrl(config);

          resolve(signedUrl);
        })
        .on("error", () => {
          reject("실패");
        });
    });

    return result;
  }
}
