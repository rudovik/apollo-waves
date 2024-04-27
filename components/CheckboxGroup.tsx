"use client"

import { useState } from "react"
import Checkbox from "./Checkbox"
import Accordion from "./Accordion"

export default function CheckboxGroup({
  items,
  title,
  filter,
  type = "string",
}) {
  const [state, setState] = useState([])
  function onChange(e) {
    const value = type === "number" ? parseInt(e.target.value) : e.target.value
    const checked = e.target.checked
    const valueIndex = state.indexOf(value)

    let newArray = []
    if (checked && valueIndex === -1) {
      newArray = [...state, value]
      setState(newArray)
    } else if (!checked && valueIndex !== -1) {
      newArray = state.filter((item) => item !== value)
      setState(newArray)
    }
    filter(newArray.length ? newArray : null)
  }

  const checkboxList = items.map((item) => {
    const { name, value, _id } = item
    return (
      <Checkbox
        label={name}
        value={value ?? _id}
        onChange={onChange}
        key={_id}
      />
    )
  })

  return <Accordion items={checkboxList} title={title} />
}
