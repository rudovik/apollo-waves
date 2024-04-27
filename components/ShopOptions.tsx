"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faTh } from "@fortawesome/free-solid-svg-icons"

export default function ShopOptions({ active = false }) {
  return (
    <div className="shopOptions">
      <div
        className={`shopOptions__gridButton ${
          active ? "shopOptions__gridButton--active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div
        className={`shopOptions__gridButton ${
          !active ? "shopOptions__gridButton--active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faTh} />
      </div>
    </div>
  )
}
