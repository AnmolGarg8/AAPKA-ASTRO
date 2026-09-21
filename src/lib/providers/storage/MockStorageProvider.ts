import { StorageProvider, UploadOptions } from "./StorageProvider";

export class MockStorageProvider implements StorageProvider {
  readonly name = "mock";

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    contentType: string,
    options?: UploadOptions
  ): Promise<string> {
    const folder = options?.folder ? `${options.folder}/` : "";
    return `https://storage.aapkaastro.com/mock/${folder}${Date.now()}-${fileName}`;
  }

  async getDownloadUrl(key: string): Promise<string> {
    return `https://storage.aapkaastro.com/mock/${key}`;
  }
}
