import Link from "next/link"

export default function Navigation({ items, title }) {
  return (
    <div className="navigation">
      <h2 className="navigation__title">{title}</h2>
      <ul className="navigation__links">
        {items.map((item, i) => (
          <li className="navigation__link" key={i}>
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
