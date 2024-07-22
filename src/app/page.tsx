import { getData } from "./api/conn/route";

export default async function Home() {
  const { products, error } = await getData();

  console.log("Products", products);

  return (
    <div>
      <h1>Product List</h1>
      {error && <p>Error: {error}</p>}
      <div>
        {products.length > 0 ? (
          products.map((product: any) => (
            <div key={product._id}>
              <h1>{product.name}</h1>
              <h1>{product.price}</h1>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
