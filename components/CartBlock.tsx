export const CartBlock = ({ items, removeItem }) => {
  const renderItems = () =>
    items.map((product) => {
      const { name, quantity, price, productId, image } = product
      return (
        <div className="cartItem" key={product.productId}>
          <div className="cartItem__imageWrapper">
            <div
              className="cartItem__image"
              style={{
                background: `url(${
                  image ?? "/images/image_not_available.png"
                }) no-repeat`,
              }}
            ></div>
          </div>
          <div className="cartItem__name">
            <h4 className="cartItem__title">Product name</h4>
            <div className="cartITem__text">{name}</div>
          </div>
          <div className="cartItem__quantity">
            <h4 className="cartItem__title">Quantity</h4>
            <div className="cartITem__text">{quantity}</div>
          </div>
          <div className="cartItem__price">
            <h4 className="cartItem__title">Price</h4>
            <div className="cartITem__text">$ {price}</div>
          </div>
          <button
            className="cartItem__btn"
            onClick={() => removeItem(productId)}
          >
            Remove
          </button>
        </div>
      )
    })

  return <div>{renderItems()}</div>
}
