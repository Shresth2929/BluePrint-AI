import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type UploadFolder = "inputs" | "renders" | "avatars";

export async function uploadImage(
  data: string | Buffer,
  folder: UploadFolder = "inputs",
  options?: { publicId?: string; tags?: string[] }
): Promise<{ url: string; publicId: string; width: number; height: number }> {
  try {
    const uploadOptions = {
      folder: `blueprint-ai/${folder}`,
      resource_type: "image" as const,
      quality: "auto:best",
      fetch_format: "auto",
      ...(options?.publicId && { public_id: options.publicId }),
      ...(options?.tags && { tags: options.tags }),
    };

    let result;
    if (typeof data === "string") {
      result = await cloudinary.uploader.upload(data, uploadOptions);
    } else {
      result = await new Promise<{ secure_url: string; public_id: string; width: number; height: number }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string; public_id: string; width: number; height: number });
          });
          stream.end(data);
        }
      );
    }

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    quality: options.quality ?? "auto:good",
    fetch_format: options.format ?? "auto",
    ...(options.width && { width: options.width }),
    ...(options.height && { height: options.height }),
    ...(options.crop && { crop: options.crop }),
    secure: true,
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
}

export { cloudinary };
