import Button from "components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTruck } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons"

export const ProductInfo = ({ product, addToCart, disabled }) => {
  function showProdTags(product) {
    return (
      <div className="product__tags">
        {product.shipping ? (
          <div className="product__tag">
            <FontAwesomeIcon icon={faTruck} className="product__tag__icon" />
            <div className="product__tag__text">
              <div>Free shipping</div>
              <div>And return</div>
            </div>
          </div>
        ) : null}
        {product.available ? (
          <div className="product__tag">
            <FontAwesomeIcon icon={faCheck} className="product__tag__icon" />
            <div className="product__tag__text">
              <div>Available</div>
              <div>in store</div>
            </div>
          </div>
        ) : (
          <div className="product__tag">
            <FontAwesomeIcon icon={faTimes} className="product__tag__icon" />
            <div className="product__tag__text">
              <div>Not Available</div>
              <div>Preorder only</div>
            </div>
          </div>
        )}
      </div>
    )
  }

  function showProdActions(product) {
    return (
      <div className="product__actions">
        <div className="product__price">$ {product.price}</div>
        <div className="product__cartButton">
          <Button
            classModifier={"bag"}
            onClick={() => {
              addToCart(product._id)
            }}
            icon={faShoppingBag}
            disabled={disabled}
            text="ADD TO CART"
          />
        </div>
      </div>
    )
  }

  function showProdSpecification(product) {
    return (
      <div className="product__specifications">
        <h2 className="product__specifications__title">Specs:</h2>
        <div>
          <div className="product__specifications__item">
            <strong>Frets: </strong>
            {product.frets}
          </div>
          <div className="product__specifications__item">
            <strong>Wood: </strong>
            {product.wood.name}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className={"product__title"}>
        {product.brand.name} {product.name}
      </h1>
      <p className={"product__description"}>{product.description}</p>
      {showProdTags(product)}
      {showProdActions(product)}
      {showProdSpecification(product)}
    </div>
  )
}
