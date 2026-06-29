import { use, useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyProducts } from "../assets/assets";
import { ZapIcon } from "lucide-react";
import Loading from "../components/Loding";
import ProductList from "../components/ProductList";

// const productsPromise: Promise<Product[]> = fetch("/api/products").then((res) => res.json()); ===> real api fetch tai Promise
// মানে তুমি use()-কে একটা array দিচ্ছো, কিন্তু use() চায় Promise বা Context।

const FlashDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = (): Product[] => {
      return dummyProducts.filter((p: Product) => p.stock > 0);
    };

    setProducts(fetchProducts());
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-app-cream">
      {/* Banner */}
      <div className="bg-linear-to-r from-app-orange to-app-orange-dark text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex-center gap-2 mb-3">
            <ZapIcon className="size-6 fill-white" />
            <h1 className="text-3xl font-semibold">Flash Deals</h1>
            <ZapIcon className="size-6 fill-white" />
          </div>
          <p className="text-white/80 max-w-md mx-auto">
            Limited-time offers on your favorite organic products. Grab them
            before they're gone!
          </p>
        </div>
      </div>

      {/* Flash Product List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loading />
        ) : products?.length === 0 ? (
          <div className="text-center py-16">
            <ZapIcon className="size-16 text-app-border mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-app-green mb-2">
              No deal right now
            </h2>
            <p className="text-sm text-app-text-light">
              Check back soon for amazing offers!
            </p>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
