import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import mime from "mime"
import { auth } from "lib/auth/nextAuth"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

async function handler(req: NextRequest) {
  const session = await auth()
  const requestType = req.headers.get("content-type")
  if (
    !session ||
    !session.user ||
    session.user.role !== "admin" ||
    !requestType ||
    !requestType.startsWith("multipart/form-data")
  )
    return NextResponse.json({ success: false })

  const formData = await req.formData()
  const file = formData.get("file") as File
  const buffer = await file.arrayBuffer()
  const ext = file.name.split(".").pop()
  const b64 = Buffer.from(buffer).toString("base64")
  const type = mime.getType(ext)
  let dataURI = "data:" + type + ";base64," + b64

  const { url, public_id } = await cloudinary.uploader.upload(dataURI, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  })

  return NextResponse.json({ url, public_id, success: true })
}

export { handler as POST, handler as DELETE }
