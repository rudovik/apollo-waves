import { auth } from "lib/auth/nextAuth"
import Link from "next/link"
import SignOutButton from "components/Auth/SignOutButton"
import CartLink from "components/CartLink"

export default async function Header() {
  const session = await auth()

  const topLinks = [
    session && { text: "My Account", href: "/user" },
    !session && { text: "Log In", href: "/signin" },
  ]

  const bottomLinks = [
    { text: "Home", href: "/" },
    { text: "Guitars", href: "/shop" },
  ]

  return (
    <header className="header background-color-light">
      <div className="header__container container">
        <div className="header__container__left">
          <div className="header__logo">WAVES</div>
        </div>
        <div className="header__container__right">
          <div className="header__container__right__top">
            {session && <CartLink />}
            {topLinks.map(
              (link, i) =>
                link && (
                  <Link
                    href={link.href}
                    key={i + "top"}
                    className="header__link"
                  >
                    {link.text}
                  </Link>
                )
            )}
            {<SignOutButton session={session} />}
          </div>
          <div className="header__container__right__bottom">
            {bottomLinks.map(
              (link, i) =>
                link && (
                  <Link
                    href={link.href}
                    key={i + "bottom"}
                    className="header__link"
                  >
                    {link.text}
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
