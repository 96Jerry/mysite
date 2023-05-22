import { Injectable } from "@nestjs/common";

interface IFileServiceUpload {}

@Injectable()
export class FileService {
  upload({ file }) {
    console.log(file);
    return "a";
  }
}
