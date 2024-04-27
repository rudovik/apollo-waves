"use client"

import { useState } from "react"
import RadioButton from "./RadioButton"
import Accordion from "./Accordion"
export default function RadioButtonGroup({
  items,
  name: inputName,
  title,
  filter,
  type = "string",
}) {
  const [state, setState] = useState([])
  function onChange(e) {
    const value: string = e.target.value

    let newArray = value.split(",")
    let filterObject = {}
    if (newArray.length > 1) {
      filterObject["gte"] =
        type === "number" ? parseInt(newArray[0]) : newArray[0]
      filterObject["lte"] =
        type === "number" ? parseInt(newArray[1]) : newArray[1]
    } else filterObject = null

    // setState(newArray)

    // console.log(newArray)

    filter(filterObject)
  }

  const radioButtonList = items.map((item) => {
    const { value, name, _id } = item
    return (
      <RadioButton
        key={_id}
        name={inputName}
        label={name}
        onChange={onChange}
        value={value}
      />
    )
  })

  return <Accordion items={radioButtonList} title={title} />
}
