"use client"

import { useState } from "react"
import { ImageLightbox } from "./ImageLightbox"

export const ProductImages = ({ images }) => {
  const [state, setState] = useState({
    lightbox: false,
    imagePos: 0,
    lightboxImages: images.length ? images.map((image) => image.url) : [],
  })

  function handleLightbox(pos) {
    if (state.lightboxImages.length > 1) {
      setState((oldState) => {
        return { ...oldState, lightbox: true, imagePos: pos }
      })
    }
  }

  function handleLightboxClose() {
    setState((oldState) => {
      return { ...oldState, lightbox: false }
    })
  }

  function showThumbs() {
    return state.lightboxImages.map((item, i) => {
      return i > 0 ? (
        <div
          key={i}
          onClick={() => handleLightbox(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        ></div>
      ) : null
    })
  }

  return (
    <div className="product__images">
      <div
        style={{
          background: `url(${
            images[0] ? images[0].url : `/images/image_not_available.png`
          }) no-repeat`,
        }}
        onClick={() => handleLightbox(0)}
        className="product__images__mainPic"
      ></div>
      <div className="product__images__mainThumbs">{showThumbs()}</div>
      {state.lightbox ? (
        <ImageLightbox
          id={"productLightbox"}
          images={state.lightboxImages}
          open={state.lightbox}
          pos={state.imagePos}
          onClose={() => handleLightboxClose()}
        />
      ) : null}
    </div>
  )
}
