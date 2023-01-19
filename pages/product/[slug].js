import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { client, urlFor } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product }) => {
  const { image, name, details, price, author } = product;
  const { qty, incQty, decQty, onAdd } = useStateContext();

  return (
    <div className="product-bg">
      <div className="product-detail-container">
        <div className="image-container">
          <img
            src={urlFor(image && image[0])}
            className="product-image-detail"
          />
        </div>
      </div>
      <div className="product-detail-desc">
        <div>
          <h1>{name}</h1>
          <h2>{author}</h2>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
        </div>
        <div className="quantity">
          <h3>Quantity</h3>
          <p className="quantity-desc">
            <span className="minus qty-btn" onClick={decQty}>
              <AiOutlineMinus />
            </span>
            <span className="num">{qty}</span>
            <span className="plus qty-btn" onClick={incQty}>
              <AiOutlinePlus color="white" />
            </span>
          </p>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="add-to-cart"
            onClick={() => onAdd(product, qty)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};
export default ProductDetails;
