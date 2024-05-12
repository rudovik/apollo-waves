import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import mime from "mime"
import { auth } from "lib/auth/nextAuth"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

async function upload(req: NextRequest) {
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

  const response = await cloudinary.uploader.upload(dataURI, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  })

  // console.log(response)

  const { secure_url, public_id } = response

  return NextResponse.json({ url: secure_url, public_id, success: true })
}

async function remove(req: NextRequest) {
  const session = await auth()
  if (!session || !session.user || session.user.role !== "admin")
    return NextResponse.json({ success: false })

  const formData = await req.formData()
  const public_id = formData.get("public_id") as string

  const response = await cloudinary.uploader.destroy(public_id)

  return NextResponse.json(response)
}

export { upload as POST, remove as DELETE }
