"use client"
import Slider from "react-slick"
// import { MyButton } from "./MyButton"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Button from "./Button"

export const HomeSlider = () => {
  const slides = [
    {
      img: "/images/featured/featured_home.jpg",
      lineOne: "Fender",
      lineTwo: "Custom shop",
      linkTitle: "Shop now",
      linkTo: "/shop",
    },
    {
      img: "/images/featured/featured_home_2.jpg",
      lineOne: "B-Stock",
      lineTwo: "Awesome discounts",
      linkTitle: "View offers",
      linkTo: "/shop",
    },
  ]

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }
  function generateSlides() {
    return slides
      ? slides.map((item, i) => (
          <div key={i} className="slider__item">
            <div
              className={`slider__item__image`}
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className="slider__item__action">
                <div className="tag-title">{item.lineOne}</div>
                <div className="tag-low-title">{item.lineTwo}</div>
                <Button text={item.linkTitle} href={item.linkTo} />
              </div>
            </div>
          </div>
        ))
      : null
  }

  return (
    <div className="slider">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  )
}
