"use client"

import { useState } from "react"
import Input from "components/Form/Input"
import Select from "components/Form/Select"
import TextArea from "components/Form/Textarea"
import FileUpload from "components/FileUpload"
import { useSuspenseQuery } from "@apollo/client"
import {
  GetAllBrandsDocument,
  GetAllWoodsDocument,
} from "__generated__/graphql"
import { frets } from "lib/fixedCategories"
import { AddProductDocument } from "__generated__/graphql"
import { useMutation } from "@apollo/client"

export default function AddProductAdminPage() {
  const {
    data: { getAllBrands: brands },
  } = useSuspenseQuery(GetAllBrandsDocument)
  const {
    data: { getAllWoods: woods },
  } = useSuspenseQuery(GetAllWoodsDocument)

  const [addProductMutation, { loading: addingProduct }] =
    useMutation(AddProductDocument)

  const [fields, setFields] = useState<any>({
    // name: "",
    // description: "",
    // price: "",
    // brand: "",
    // shipping: "",
    // available: "",
    // wood: "",
    // frets: 0,
    // publish: "",
    // images: [],
  })

  async function submitForm(event) {
    event.preventDefault()
    const {
      data: {
        addProduct: { success },
      },
    } = await addProductMutation({ variables: { input: { ...fields } } })
    console.log(success)
  }

  function updateField(name: string, value: boolean | string | number) {
    const newFields = { ...fields }
    if (name in newFields && value === "") delete newFields[name]
    else {
      newFields[name] = value
    }

    setFields(newFields)
    console.log(newFields)
  }

  return (
    <>
      <h1>Add Product</h1>

      <form onSubmit={submitForm} className="form">
        <FileUpload onChange={updateField} images={fields.images} />

        <Input
          type="text"
          onChange={updateField}
          name="name"
          value={fields.name}
          label={"Product name"}
          placeholder="Enter product name"
        />
        <TextArea
          onChange={updateField}
          name="description"
          value={fields.description}
          label={"Product Description"}
          placeholder="Enter product description"
        />
        <Input
          type="number"
          onChange={updateField}
          name="price"
          value={fields.price}
          label="Product price"
          placeholder="Enter product price"
        />

        <div className="form__divider"></div>

        <Select
          name="brand"
          onChange={updateField}
          value={fields.brand}
          options={brands}
          label="Product Brand"
        />

        <Select
          name="shipping"
          onChange={updateField}
          value={fields.shipping}
          options={yesNoOptions}
          type="boolean"
          label="Shipping"
        />

        <Select
          name="available"
          onChange={updateField}
          value={fields.available}
          options={yesNoOptions}
          type="boolean"
          label="Available, in stock"
        />

        <div className="form__divider"></div>

        <Select
          name="wood"
          onChange={updateField}
          value={fields.wood}
          options={woods}
          label="Wood material"
        />

        <Select
          name="frets"
          onChange={updateField}
          value={fields.frets}
          options={frets}
          type="number"
          label="Frets"
        />

        <div className="form__divider"></div>

        <Select
          name="publish"
          onChange={updateField}
          value={fields.publish}
          options={yesNoOptions}
          type="boolean"
          label="Publish"
        />

        <button type="submit" className="form__button">
          Add Product
        </button>
      </form>
    </>
  )
}

const yesNoOptions = [
  { value: "true", text: "yes" },
  { value: "false", text: "no" },
]
