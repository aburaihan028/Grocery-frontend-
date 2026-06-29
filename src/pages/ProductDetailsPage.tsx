import { Link, useNavigate, useParams } from "react-router";
import { env } from "../config/env";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyProducts } from "../assets/assets";
import Loading from "../components/Loding";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import DummyReviewsSection from "../assets/DummyReviewsSection";
import ProductList from "../components/ProductList";

const ProductDetails = () => {
  const currency = env.currency;
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const [product, setProducts] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLoacalQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setLoacalQuantity(1);
    window.scrollTo(0, 0);

    const product = dummyProducts.find((p) => p._id === id);
    setProducts(product!);
    setRelatedProducts(
      dummyProducts.filter(
        (p) => p.category === product?.category && p._id !== id,
      ),
    );
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;

  if (!product) return null;

  const cartItem = items.find((item) => item.product._id === product._id);
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem.quantity : localQuantity;

  // product Quantity Minus Function
  // const handleMinus = () => {
  //   if (!inCart) {
  //     setLoacalQuantity(Math.max(1, localQuantity - 1));
  //     return;
  //   }

  //   if (cartItem.quantity === 1) {
  //     removeFromCart(product._id);
  //     return;
  //   }

  //   updateQuantity(product._id, cartItem.quantity - 1);
  // };
  //  or
  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1)
        updateQuantity(product._id, cartItem.quantity - 1);
      else {
        removeFromCart(product._id);
        setLoacalQuantity(1); // reset localQuantity
      }
    } else {
      setLoacalQuantity(Math.max(1, localQuantity - 1));
    }
  };

  // product Quantity Plus Function
  const handlePlus = () => {
    if (inCart) {
      updateQuantity(product._id, cartItem.quantity + 1);
    } else {
      setLoacalQuantity(localQuantity + 1);
    }
  };

  const categoryLabel = product.category.replace(/-/g, " ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* --------- Breadcrumb -------- */}
      <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
        <Link to={"/"}>
          <HomeIcon className="size-4" />
        </Link>
        <span>/</span>
        <Link to={"/products"}>Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`}>
          {categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-app-green font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()} // or navigate(-1)
        className="mb-6 flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-green transition-colors"
      >
        <ArrowLeftIcon className="size-4" /> Back
      </button>

      {/* ------------ produt Details Section ----------- */}
      <div className="bg-white/50 rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side */}
          <div className="relative flex-center p-8 md:p-12 min-h-[320px] md:min-h-[480px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[360px] w-auto object-contain"
            />
            {/* Badges */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
              {product.isOrganic && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full">
                  <LeafIcon className="w-3 h-3" />
                  Organic
                </span>
              )}
              {product.discount > 0 && (
                <span className="px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>
          {/*  Right Side - Details */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <span className="text-xs font-medium text-app-text-light tracking-wider mb-2 capitalize">
              {categoryLabel}
            </span>
            <h1 className="text-2xl md:text-3xl font-semibold text-app-green mb-3">
              {product.name}
            </h1>
            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(product.rating) ? "text-app-warning fill-app-warning" : "text-app-border"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-app-text-light">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            )}
            {/* price */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-3xl md:text-4xl font-semibold text-app-green">
                {currency}
                {product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-app-text-light line-through">
                  {currency}
                  {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {/* Description */}
            <p className="text-sm text-app-text-light leading-relaxed mb-6">
              {product.description}
            </p>
            {/* stock */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-sm text-app-success font-medium">
                  ✓ In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-sm text-app-error font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-app-border rounded-xl overflow-hidden">
                <button
                  onClick={handleMinus}
                  className="p-3 hover:bg-app-cream transition-colors"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="px-5 text-sm font-semibold min-w-[40px] text-center">
                  {displayQuantity}
                </span>
                <button
                  onClick={handlePlus}
                  className="p-3 hover:bg-app-cream transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              {/* Add to cart button */}
              <button
                disabled={product.stock === 0}
                onClick={() => {
                  if (!inCart) addToCart(product, localQuantity);
                }}
                className={`flex-1 py-3 font-semibold rounded-xl transition-colors flex-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${inCart ? "bg-app-cream text-app-green border border-app-green" : "bg-app-orange text-white hover:bg-app-orange-dark"} `}
              >
                <ShoppingCartIcon className="w-4 h-4" />
                {inCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Customer Reviews */}
      {product.reviewCount > 0 && <DummyReviewsSection product={product} />}
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 mb-44">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-app-green">
                Related Products
              </h2>
              <p className="text-sm text-app-text-light mt-1">
                More from {categoryLabel}
              </p>
            </div>
            <Link
              to={`/products?category=${product.category}`}
              className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors"
            >
              View All <ArrowRightIcon className="size-4" />
            </Link>
          </div>

          <ProductList products={relatedProducts.slice(0, 5)} />
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
