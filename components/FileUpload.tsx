"use client"

import Dropzone from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function FileUpload() {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState([])

  async function onDrop(receivedFiles: File[]) {
    setUploading(true)
    let formdata = new FormData()
    formdata.append("file", receivedFiles[0])

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formdata,
    })

    // console.log(response)

    const { url, public_id, success } = await response.json()

    console.log(url)

    if (success) {
      setUploading(false)
      setFiles([...files, { public_id, url }])
    }
  }

  function onRemove() {
    console.log("Removing Image...")
  }

  function showUploadedImages() {
    return files.map((file) => (
      <div className="dropzone_box" key={file.public_id} onClick={onRemove}>
        <div
          className="wrap"
          style={{ background: `url(${file.url}) no-repeat` }}
        ></div>
      </div>
    ))
  }

  return (
    <section>
      <div className="dropzone clear">
        <Dropzone onDrop={onDrop} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone_box">
              <div className="wrap" {...getRootProps()}>
                <input {...getInputProps()} />
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </div>
          )}
        </Dropzone>
        {showUploadedImages()}
        {uploading && (
          <div
            className="dropzone_box"
            style={{ textAlign: "center", paddingTop: "6rem" }}
          >
            Loading...
          </div>
        )}
      </div>
    </section>
  )
}
