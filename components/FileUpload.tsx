"use client"

import Dropzone from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function FileUpload({ onChange: updateField, images = [] }) {
  const [uploading, setUploading] = useState(false)
  // const [files, setFiles] = useState([])

  async function onDrop(receivedFiles: File[]) {
    setUploading(true)
    let formdata = new FormData()
    formdata.append("file", receivedFiles[0])

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formdata,
    })

    const json = await response.json()

    const { url, public_id, success } = json

    if (success) {
      setUploading(false)
      // setFiles([...files, { public_id, url }])
      // files.push(public_id, url)
      updateField("images", [...images, { public_id, url }])
    }
  }

  async function onRemove(e: React.MouseEvent<HTMLDivElement>, public_id) {
    console.log("Removing Image...")
    const formData = new FormData()
    formData.append("public_id", public_id)
    const response = await fetch("/api/upload", {
      method: "DELETE",
      body: formData,
    })
    const json = await response.json()

    const { result } = json

    if (result === "ok") {
      const currentImages = [...images]
      const newImages = currentImages.filter(
        (image) => image.public_id !== public_id
      )
      updateField("images", newImages)
    }
  }

  return (
    <section>
      <div className="dropzone clear">
        <Dropzone onDrop={onDrop} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone__box">
              <div className="dropzone__wrapper" {...getRootProps()}>
                <input {...getInputProps()} />
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </div>
          )}
        </Dropzone>
        {images.map((file) => (
          <div
            className="dropzone__box"
            key={file.public_id}
            onClick={(e) => onRemove(e, file.public_id)}
          >
            <div
              className="dropzone__wrapper"
              style={{ background: `url(${file.url}) no-repeat` }}
            ></div>
          </div>
        ))}
        {uploading && (
          <div
            className="dropzone__box"
            style={{ textAlign: "center", paddingTop: "6rem" }}
          >
            Loading...
          </div>
        )}
      </div>
    </section>
  )
}
