import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import GET_PRODUCT_BY_ID, {
  ProductData,
  ProductVar,
} from "./graphql/queries/product";
import Logo from "./assets/logo.svg";
import Basket from "./assets/basket.svg";

const App = () => {
  const { data, loading, error } = useQuery<ProductData, ProductVar>(
    GET_PRODUCT_BY_ID,
    {
      variables: {
        productId: 1,
      },
    }
  );
  const [qty, setQty] = useState(1);

  const renderProductPrice = () => {
    if (!data) {
      return null;
    }

    const { price } = data.product;
    const priceStr = price.toString();
    const wholePart = priceStr.slice(0, priceStr.length - 2);
    const fractionalPart = priceStr.slice(-2);

    return (
      <>
        <span className="product-price-whole">{wholePart}</span>
        <span className="product-price-fractional">.{fractionalPart}</span>
      </>
    );
  };

  const renderMainContent = () => {
    if (!data) {
      return <div className="product-not-found">Product not found</div>;
    }

    return (
      <div className="product-container">
        <div className="product-image-section">
          <div className="product-image-wrapper">
            <img className="product-image" src={data.product.imgUrl} />
          </div>
        </div>
        <div className="product-title-section">
          <div className="product-title">{data.product.name}</div>
          <div className="product-sub-title">{`${data.product.power} // Packet of ${data.product.quantity}`}</div>
        </div>
        <div className="product-price-and-qty-section">
          <div className="product-price">{renderProductPrice()}</div>
          <div className="product-qty-wrapper">
            <div className="product-qty-label">QTY</div>
            <div className="product-selector-wrapper">
              <div className="product-qty-decrease">-</div>
              <div className="product-qty" aria-label="qtyValue">
                {qty}
              </div>
              <div className="product-qty-increase">+</div>
            </div>
          </div>
          <div className="product-add-to-cart-btn-wrapper">
            <div className="product-add-to-cart-btn">Add to cart</div>
          </div>
        </div>
        <div className="product-desc-section">
          <div className="product-section-header">Description</div>
          <div className="product-section-content">
            {data.product.description}
          </div>
        </div>
        <div className="product-specs-section">
          <div className="product-section-header">Specification</div>
          <div className="product-section-content">
            <div className="product-specs-row">
              <div className="product-specs-col">Brand</div>
              <div className="product-specs-col">{data.product.brand}</div>
            </div>
            <div className="product-specs-row">
              <div className="product-specs-col">Item weight</div>
              <div className="product-specs-col">{data.product.weight}</div>
            </div>
            <div className="product-specs-row">
              <div className="product-specs-col">Dimensions</div>
              <div className="product-specs-col">{`${data.product.height}x${data.product.width}x${data.product.length}`}</div>
            </div>
            <div className="product-specs-row">
              <div className="product-specs-col">Item model number</div>
              <div className="product-specs-col">{data.product.modelCode}</div>
            </div>
            <div className="product-specs-row">
              <div className="product-specs-col">Colour</div>
              <div className="product-specs-col">{data.product.colour}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="main-header">
        <div className="main-logo-wrapper">
          <img className="main-logo" src={Logo} />
        </div>
        <div className="main-basket-wrapper">
          <img className="main-basket" src={Basket} />
        </div>
      </div>
      <div className="main-content">{renderMainContent()}</div>
      <div className="footer">
        Octopus Energy Ltd is a company registered in England and Wales.
        <br />
        Registered number: 09263424. Registered office: 33 Holborn, London, EC1N
        2HT. Trading office: 20-24 Broadwick Street, London, W1F 8HT
      </div>
    </div>
  );
};

export default App;
