import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price, author } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card-div">
          <div className="product-card">
            <img
              src={urlFor(image && image[0])}
              width="75%"
              className="product-image"
            />
          </div>
          <div className="product-card-info">
            <p className="product-name">{name}</p>
            <p>{author}</p>
            <span className="product-price">${price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
