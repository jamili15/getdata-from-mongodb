"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/models/Product";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/withmodels");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products: IProduct[] = await response.json();
      setProducts(products);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  console.log(products)

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {error && <p>Error: {error}</p>}
      <div>
        {products.map((product: any) => (
          <div key={product?._id}>
            <h1>{product?.name}</h1>
            <h1>{product?.price}</h1>
            <p>{product?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
