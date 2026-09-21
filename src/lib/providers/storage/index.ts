import { StorageProvider } from "./StorageProvider";
import { S3StorageProvider } from "./S3StorageProvider";
import { MockStorageProvider } from "./MockStorageProvider";
import { env } from "@/config/env";

export * from "./StorageProvider";

function createStorageProvider(): StorageProvider {
  if (env.STORAGE_PROVIDER === "s3" || env.STORAGE_PROVIDER === "r2") {
    return new S3StorageProvider();
  }
  return new MockStorageProvider();
}

export const storageProvider: StorageProvider = createStorageProvider();
