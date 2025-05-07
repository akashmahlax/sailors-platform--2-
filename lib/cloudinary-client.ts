// CLIENT-SIDE ONLY - Safe to import in client components
// This file doesn't import the cloudinary package directly

// Client-side upload function
export async function uploadImage(file: File) {
  try {
    // Convert file to base64
    const base64data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

    // Upload to Cloudinary via our API route
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: base64data,
        upload_preset: "ml_default", // Using the correct upload preset
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Upload failed")
    }

    return response.json()
  } catch (error) {
    console.error("Upload error:", error)
    throw error
  }
}

// Client-side upload function for videos
export async function uploadVideo(file: File) {
  try {
    // Convert file to base64
    const base64data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

    // Upload to Cloudinary via our API route
    const response = await fetch("/api/upload-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: base64data,
        upload_preset: "ml_default", // Using the correct upload preset
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Video upload failed")
    }

    return response.json()
  } catch (error) {
    console.error("Video upload error:", error)
    throw error
  }
}

// Client-side delete function
export async function deleteMedia(publicId: string) {
  try {
    const response = await fetch("/api/delete-media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Delete failed")
    }

    return response.json()
  } catch (error) {
    console.error("Delete error:", error)
    throw error
  }
}
