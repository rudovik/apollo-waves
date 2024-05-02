"use client"

import { useState } from "react"
import FileUpload from "components/FileUpload"
import { useSuspenseQuery } from "@apollo/client"
import {
  GetAllBrandsDocument,
  GetAllWoodsDocument,
} from "__generated__/graphql"
import { frets } from "lib/fixedCategories"

export default function AddProductAdminPage() {
  const {
    data: { getAllBrands: brands },
  } = useSuspenseQuery(GetAllBrandsDocument)
  const {
    data: { getAllWoods: woods },
  } = useSuspenseQuery(GetAllWoodsDocument)

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    shipping: true,
    available: true,
    wood: "",
    frets: 0,
    publish: true,
    images: [],
  })

  function submitForm(event) {
    event.preventDefault()
    console.log("Submit Form")
  }

  return (
    <>
      <h1>Add Product</h1>

      <form onSubmit={submitForm}>
        <FileUpload />

        <input
          type="text"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          name="name"
        />
        <input
          type="text"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          name="description"
        />
        <input
          type="number"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          name="price"
        />

        <div className="form_divider"></div>

        <select name="brand">
          {brands.map((brand) => (
            <option value={brand._id} key={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>

        <select name="shipping">
          <option value="Yes">Yes</option>
        </select>

        <select name="available">
          <option value="Yes">Yes</option>
        </select>

        <div className="form_divider"></div>

        <select name="wood">
          {woods.map((wood) => (
            <option value={wood._id} key={wood._id}>
              {wood.name}
            </option>
          ))}
        </select>

        <select name="frets">
          {frets.map((fret) => (
            <option value={fret.value} key={fret._id}>
              {fret.value}
            </option>
          ))}
        </select>

        <div className="form_divider"></div>

        <select name="publish">
          <option value="Yes">Yes</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
    </>
  )
}
