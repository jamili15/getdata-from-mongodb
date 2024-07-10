"use client";

import { useEffect, useState } from "react";

interface Product {
  _id: string;
  firstname: string;
  lastname: string;
  age: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/conn");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const products: Product[] = await res.json();
      setProducts(products);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {error && <p>Error: {error}</p>}
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              <h1>{product.firstname}</h1>
              <h1>{product.lastname}</h1>
              <p>{product.age}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
