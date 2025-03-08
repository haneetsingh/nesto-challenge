"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Product } from "@/types";
import { useProductStore } from "@/store/useProductStore";
import { getMortgageProducts, createApplication } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import { showToast } from "@/components/ToastNotification";
import Message from "@/components/Message";

export default function HomePage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { setSelectedProduct } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMortgageProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        showToast(`${t("product_error")} - ${error}`, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [t]);

  const handleSelectProduct = async (product: Product) => {
    try {
      const application = await createApplication({ productId: product.id });
      setSelectedProduct(product);
      router.push(`${locale}/apply?id=${application.id}`);
    } catch (error) {
      showToast(`${t("application_error")} - ${error}`, "error");
    }
  };

  const bestFixed = products
    .filter((p) => p.type === "FIXED")
    .reduce((best, p) => (best && best.bestRate < p.bestRate ? best : p), null as Product | null);

  const bestVariable = products
    .filter((p) => p.type === "VARIABLE")
    .reduce((best, p) => (best && best.bestRate < p.bestRate ? best : p), null as Product | null);


  if (loading) return <Spinner />;
  if (!products || products.length === 0)
    return <Message>{t("no_products_message")}</Message>;

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
