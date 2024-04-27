import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Button({
  href = null,
  text = null,
  icon = null,
  onClick = null,
  classModifier = null,
  disabled = true,
}) {
  const content = (
    <>
      {icon && <FontAwesomeIcon icon={icon} />}
      {text && <span className="button__text">{text}</span>}
    </>
  )
  return href ? (
    <Link
      className={`button${classModifier ? ` button--${classModifier}` : ""}`}
      href={href}
    >
      {content}
    </Link>
  ) : (
    <button
      className={`button${classModifier ? ` button--${classModifier}` : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}
