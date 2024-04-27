import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { faSquare } from "@fortawesome/free-regular-svg-icons"

export default function Checkbox({ label, value, onChange }) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        id={label}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={label} className={"checkbox__label"}>
        <FontAwesomeIcon
          icon={faSquare}
          className={"checkbox__icon checkbox__icon--unchecked"}
        />
        <FontAwesomeIcon
          icon={faCheckSquare}
          className={"checkbox__icon checkbox__icon--checked"}
        />
        <span className={"checkbox__label__text"}>{label}</span>
      </label>
    </div>
  )
}
