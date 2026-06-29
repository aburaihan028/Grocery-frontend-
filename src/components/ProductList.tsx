import type { Product } from "../types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  grid4?: boolean;
};

const ProductList = ({ products, grid4 }: Props) => {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 gap-4 xl:gap-8 ${
        grid4 ? "lg:grid-cols-4" : "lg:grid-cols-5"
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
