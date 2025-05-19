import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw err;
  }
};

export const deleteImage = async (imageUrl) => {
  try {
    // If imageUrl is the full URL (e.g., "https://bucket-name.s3.region.amazonaws.com/uploads/123456_file.png"),
    // extract the key (the part after the domain).
    const url = new URL(imageUrl);
    // url.pathname will be like "/uploads/123456_file.png", so we remove the leading slash:
    const key = url.pathname.substring(1);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
  } catch (e) {
    console.log("Error in deleteImage function:", e);
  }
};
