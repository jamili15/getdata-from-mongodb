import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function getData() {
  try {
    await dbConnect();
    const products = JSON.parse(JSON.stringify(await Product.find()));
    return { products };
  } catch (err: any) {
    return { error: err.message };
  }
}
