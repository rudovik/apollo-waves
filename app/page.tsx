import { HomeSlider } from "components/HomeSlider"
import HomePromotion from "components/HomePromotion"
import { CardBlock } from "components/CardBlock"
import { SortBy } from "__generated__/graphql"

import { auth } from "lib/auth/nextAuth"

export default async function HomePage() {
  const session = await auth()

  return (
    <>
      <HomeSlider />
      <CardBlock
        session={session}
        title={"Best Selling Guitars"}
        sortBy={SortBy.Sold}
        key={"order"}
      />

      <HomePromotion />
      <CardBlock
        session={session}
        title={"New Arrivals"}
        sortBy={SortBy.CreatedAt}
        key={"createdAt"}
      />
    </>
  )
}
