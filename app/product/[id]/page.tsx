import PageTop from "components/Layout/PageTop"
import Product from "components/Product"

export default function ProductPage({ params: { id } }) {
  return (
    <>
      <PageTop title="Product Detail" />
      <div className="container">
        <Product _id={id} />
      </div>
    </>
  )
}
