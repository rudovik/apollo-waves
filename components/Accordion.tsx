import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

export default function Accordion({ items, title, open = true }) {
  return (
    <div className="accordion">
      <input
        type="checkbox"
        className="accordion__checkbox"
        id={title}
        defaultChecked={open}
      />
      <label className="accordion__label" htmlFor={title}>
        <span className={"accordion__label__text"}>{title}</span>
        <FontAwesomeIcon icon={faAngleRight} className={"accordion__icon"} />
      </label>
      <ul
        className={`accordion__content${
          items.length ? ` accordion__content--${items.length}` : ""
        }`}
      >
        {items.map((item, i: number) => (
          <li key={i} className="accordion__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
