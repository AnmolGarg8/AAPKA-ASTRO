import { StorageProvider, UploadOptions } from "./StorageProvider";
import { env } from "@/config/env";

export class S3StorageProvider implements StorageProvider {
  readonly name = "s3";

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    contentType: string,
    options?: UploadOptions
  ): Promise<string> {
    const bucket = env.S3_BUCKET || "aapka-astro-assets";
    const folder = options?.folder ? `${options.folder}/` : "";
    const key = `${folder}${Date.now()}-${fileName}`;

    if (!env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY) {
      console.warn("S3/R2 credentials missing. Returning simulated storage URL.");
      return `https://${bucket}.s3.amazonaws.com/${key}`;
    }

    // In production with credentials:
    // Can use AWS SDK or standard fetch PUT to presigned R2 endpoint
    const baseUrl = env.S3_ENDPOINT || `https://${bucket}.s3.amazonaws.com`;
    return `${baseUrl}/${key}`;
  }

  async getDownloadUrl(key: string): Promise<string> {
    const bucket = env.S3_BUCKET || "aapka-astro-assets";
    const baseUrl = env.S3_ENDPOINT || `https://${bucket}.s3.amazonaws.com`;
    return `${baseUrl}/${key}`;
  }
}
