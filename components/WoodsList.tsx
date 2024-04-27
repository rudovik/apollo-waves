"use client"

import { useSuspenseQuery, useMutation } from "@apollo/client"
import {
  GetAllWoodsDocument,
  DeleteWoodDocument,
  AddWoodDocument,
} from "__generated__/graphql"

import styles from "./WoodList.module.css"
import { Suspense, useState } from "react"

// import { addWood } from "lib/actions"

export default function WoodsList({ isAdmin }) {
  const {
    data: { getAllWoods: woods },
  } = useSuspenseQuery(GetAllWoodsDocument)
  const [deleteWoodMutation, { loading: woodIsDeleting }] =
    useMutation(DeleteWoodDocument)
  const [addWoodMutation, { loading: woodIsAdding }] =
    useMutation(AddWoodDocument)
  const [woodName, setWoodName] = useState("")

  const deleteWood = async (name: string) => {
    await deleteWoodMutation({
      variables: {
        name,
      },
      refetchQueries: [GetAllWoodsDocument],
      awaitRefetchQueries: true,
    })
  }

  async function addWood(name: string) {
    await addWoodMutation({
      variables: { name },
      refetchQueries: [GetAllWoodsDocument],
      awaitRefetchQueries: true,
    })
    setWoodName("")
  }

  return (
    <>
      <Suspense>
        {woods.map((wood) => (
          <div key={wood._id}>
            <b>{JSON.stringify(wood)}</b>{" "}
            {isAdmin && (
              <button
                onClick={function (e) {
                  e.currentTarget.disabled = true
                  e.currentTarget.previousElementSibling.className +=
                    styles.deleting
                  deleteWood(wood.name)
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </Suspense>

      {isAdmin && (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={(e) => setWoodName(e.target.value)}
            value={woodName}
            disabled={false}
            placeholder="Enter a wood name"
            name="woodName"
          />
          <button
            onClick={async () => await addWood(woodName)}
            disabled={woodIsAdding || !woodName}
          >
            Add Wood
          </button>
        </form>
      )}
    </>
  )
}
