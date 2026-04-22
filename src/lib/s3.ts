import { S3Client } from "@aws-sdk/client-s3";

let client: S3Client | null = null;

/** S3-совместимый клиент (Timeweb / Yandex). Без env — null. */
export function getS3(): S3Client | null {
  if (!process.env.S3_ENDPOINT || !process.env.S3_ACCESS_KEY_ID) return null;
  if (!client) {
    client = new S3Client({
      region: process.env.S3_REGION ?? "ru-1",
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
      forcePathStyle: true,
    });
  }
  return client;
}
