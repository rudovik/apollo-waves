"use client"

import CheckboxGroup from "components/CheckboxGroup"
import RadioButtonGroup from "components/RadioButtonGroup"
import { frets, price } from "lib/fixedCategories"
import { useState } from "react"
import {
  GetAllBrandsDocument,
  GetAllWoodsDocument,
  GetProductsToShopDocument,
} from "__generated__/graphql"
import { useSuspenseQuery } from "@apollo/client"
import ShopOptions from "components/ShopOptions"
import { Card } from "components/Card"
import LoadMoreCards from "components/LoadMoreCards"
import NoResult from "components/NoResult"

export default function ShopContainer({ session }) {
  const [state, setState] = useState({})
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(6)

  const {
    data: { getAllBrands: brands },
  } = useSuspenseQuery(GetAllBrandsDocument)
  const {
    data: { getAllWoods: woods },
  } = useSuspenseQuery(GetAllWoodsDocument)
  const {
    data: {
      getProductsToShop: { products, total, size },
    },
    fetchMore,
  } = useSuspenseQuery(GetProductsToShopDocument, {
    variables: {
      filters: state,
      limit,
      skip,
    },
  })

  async function loadMoreCards() {
    const newSkip = skip + limit

    await fetchMore({
      variables: { skip: newSkip },
    })

    setSkip(newSkip)
  }

  function filter(name: string, value) {
    if (value === null && !state[name]) return
    const newState = { ...state }
    if (value === null && state[name]) {
      delete newState[name]
    } else {
      newState[name] = value
    }

    setState(newState)
    setSkip(0)
    // console.log(newState)
  }

  // console.log("skip = " + skip)
  // console.log("total = " + total)
  // console.log("size = " + size)

  return (
    <div className={"shopContainer"}>
      <div className="shopContainer__left">
        <CheckboxGroup
          items={brands}
          filter={filter.bind(null, "brand")}
          title={"brands"}
          key={"brand"}
        />
        <CheckboxGroup
          items={frets}
          filter={filter.bind(null, "frets")}
          title={"frets"}
          key={"frets"}
          type="number"
        />

        <CheckboxGroup
          items={woods}
          filter={filter.bind(null, "wood")}
          title={"wood"}
          key={"wood"}
        />
        <RadioButtonGroup
          items={price}
          filter={filter.bind(null, "price")}
          title={"price"}
          key={"price"}
          name={"price"}
          type="number"
        />
      </div>
      <div className="shopContainer__right">
        <ShopOptions />
        {products.length ? (
          products.map((product) => (
            <Card
              {...product}
              session={session}
              key={product._id}
              classModifier="shop"
            />
          ))
        ) : (
          <NoResult>Sorry, no results</NoResult>
        )}
        {size < total ? <LoadMoreCards onClick={loadMoreCards} /> : null}
      </div>
    </div>
  )
}
