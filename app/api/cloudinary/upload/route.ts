import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    const maybeError = error as {
      message?: string;
      error?: { message?: string };
    };

    if (maybeError.message) return maybeError.message;
    if (maybeError.error?.message) return maybeError.error.message;

    return JSON.stringify(error);
  }

  return String(error);
}

export async function POST(request: Request) {
  try {
    if (!process.env.CLOUDINARY_URL) {
      return NextResponse.json(
        { error: "Missing CLOUDINARY_URL." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "instagram_uploads",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary returned no result."));
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      secureUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    const message = getErrorMessage(error);

    console.error("Cloudinary upload API error:", error);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}