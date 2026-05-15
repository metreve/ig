export async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/cloudinary/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Cloudinary upload error:", data);
    throw new Error(data.error || "Cloudinary upload failed.");
  }

  return data.secureUrl as string;
}