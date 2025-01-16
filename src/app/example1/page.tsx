"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const dbname = "cloud_obo";  // Replace with the actual database name
      const collectionname = "standalonepermit";  // Replace with the actual collection name

      // Fetch data from the API route, passing the dbname and collectionname as query parameters
      const response = await fetch(`/api/withoutmodels?dbname=${dbname}&collectionname=${collectionname}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products: any[] = await response.json();
      setProducts(products);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  console.log(products);

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
