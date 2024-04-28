import { auth } from "lib/auth/nextAuth"
import { redirect } from "next/navigation"
import Navigation from "components/Layout/Navigation"

export default async function UserPageLayout({ children }) {
  const session = await auth()
  if (!session) return redirect("/")
  const isAdmin = session.user.role === "admin"

  return (
    <div className="container">
      <div className="userContainer">
        <div className="userContainer__left">
          <Navigation
            items={userLinks}
            title={"My account"}
            key={"My account"}
          />

          {isAdmin && (
            <Navigation items={adminLinks} title={"Admin"} key={"Admin"} />
          )}
        </div>
        {session && <div className="userContainer__right">{children}</div>}
      </div>
    </div>
  )
}

const userLinks = [
  { text: "My account", href: "/user" },
  { text: "User information", href: "/user/profile" },
  { text: "My cart", href: "/user/cart" },
]
const adminLinks = [
  { text: "Site info", href: "/user/admin/manageSite" },
  { text: "Add product", href: "/user/admin/addProduct" },
  { text: "Manage categories", href: "/user/admin/manageCategories" },
]
