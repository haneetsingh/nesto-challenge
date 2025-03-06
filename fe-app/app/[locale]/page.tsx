"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useProductStore } from "@/store/useProductStore";
import { getMortgageProducts, createApplication } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import { showToast } from "@/components/ToastNotification";

export default function HomePage() {
  const router = useRouter();
  const { setSelectedProduct } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMortgageProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        showToast(`Failed to fetch products - ${error}`, "error");
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

  const bestFixed = products
    .filter((p) => p.type === "FIXED")
    .reduce((best, p) => (best && best.bestRate < p.bestRate ? best : p), null as Product | null);

  const bestVariable = products
    .filter((p) => p.type === "VARIABLE")
    .reduce((best, p) => (best && best.bestRate < p.bestRate ? best : p), null as Product | null);


  if (loading) return <Spinner />;
  if (!products || products.length === 0) return <p>No mortgage products available.</p>;

  return (
    <div className="mortgage-products">
      {bestFixed
        ? <ProductCard
          product={bestFixed}
          onSelect={() => handleSelectProduct(bestFixed)}
          />
          : null}
      {bestVariable
        ? <ProductCard
          product={bestVariable}
          onSelect={() => handleSelectProduct(bestVariable)}
        />
        : null
      }
    </div>
  );
}
