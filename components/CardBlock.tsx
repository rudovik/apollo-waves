"use client"

import { Card } from "./Card"

import { GetCardBlockItemsDocument, SortBy } from "__generated__/graphql"
import { useSuspenseQuery } from "@apollo/client"
import { Session } from "next-auth"

interface props {
  title: string
  sortBy: SortBy
  session: Session
}

export const CardBlock = ({ title, sortBy, session }: props) => {
  const {
    data: { getCardBlockItems: cards },
  } = useSuspenseQuery(GetCardBlockItemsDocument, {
    variables: {
      sortBy,
    },
  })

  const renderCards = (cards) => {
    return cards && cards.length && cards.length > 0
      ? cards.map((card) => <Card key={card._id} {...card} session={session} />)
      : null
  }

  // console.log(cards)

  return (
    <div className="container">
      <div className="cardBlock">
        {title && (
          <div className="cardBlock__title">{title ? title : "Title"}</div>
        )}
        <div className="cardBlock__wrapper">{renderCards(cards)}</div>
      </div>
    </div>
  )
}
