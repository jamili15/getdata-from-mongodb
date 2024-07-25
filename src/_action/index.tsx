import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function getData() {
  try {
    await dbConnect();
    const products = await Product.find().lean();
    return { products };
  } catch (err: any) {
    return { error: err.message };
  }
}
