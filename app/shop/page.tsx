import { auth } from "lib/auth/nextAuth"
import PageTop from "components/Layout/PageTop"
import ShopContainer from "components/Layout/ShopContainer"

export default async function ShopPage() {
  const session = await auth()
  return (
    <>
      <PageTop title={"Browse Products"} />
      <div className="container">
        <ShopContainer session={session ? true : false} />
      </div>
    </>
  )
}
