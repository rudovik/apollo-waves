import Button from "./Button"

export default function HomePromotion() {
  const promotion = {
    img: "/images/featured/featured_home_3.jpg",
    lineOne: "Up to 40% off",
    lineTwo: "In second hand guitars",
    linkTitle: "Shop now",
    linkTo: "/shop",
  }

  return (
    <div className="promotion">
      {
        <div
          className="promotion__img"
          style={{ backgroundImage: `url(${promotion.img})` }}
        >
          <div className="tag-title u-margin-center">{promotion.lineOne}</div>
          <div className="tag-low-title u-margin-center">
            {promotion.lineTwo}
          </div>
          <div className="u-center-text">
            <Button text={promotion.linkTitle} href={promotion.linkTo} />
          </div>
        </div>
      }
    </div>
  )
}
