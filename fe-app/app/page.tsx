"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useProductStore } from "@/store/useProductStore";
import { getMortgageProducts, createApplication } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const router = useRouter();
  const { setSelectedProduct } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMortgageProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setError("Failed to fetch products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelectProduct = async (product: Product) => {
    try {
      const application = await createApplication({ productId: product.id });
      setSelectedProduct(product);
      router.push(`/apply?id=${application.id}`);
    } catch (error) {
      console.error("Failed to create application", error);
    }
  };
  if (loading) return <p>Loading mortgage products...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!products || products.length === 0) return <p>No mortgage products available.</p>;

  const bestFixed = products
  .filter((p) => p.type === "FIXED")
  .reduce((best, p) => (best && best.bestRate < p.bestRate ? best : p), null as Product | null);

const bestVariable = products
  .filter((p) => p.type === "VARIABLE")
  .reduce((best, p) => (best && best.bestRate < p.bestRate ? best : p), null as Product | null);


 return (
    <div className="mortgage-products">
      {bestFixed && <ProductCard product={bestFixed} onSelect={() => handleSelectProduct(bestFixed)} />}
      {bestVariable && <ProductCard product={bestVariable} onSelect={() => handleSelectProduct(bestVariable)} />}
    </div>
  );
}
