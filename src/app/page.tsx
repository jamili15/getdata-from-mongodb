import { getData } from "@/_action";

export default async function Home() {
  const { products, error } = await getData();

  return (
    <div>
      <h1>Product List</h1>
      {error && <p>Error: {error}</p>}
      <div>
        {products?.map((product: any) => (
          <div key={product._id}>
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
