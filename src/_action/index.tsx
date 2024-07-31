import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

// Fetch all products
export async function getData() {
  try {
    await dbConnect();
    const products = await Product.find();
    return { products };
  } catch (err: any) {
    return { error: err };
  }
}

// Create a new product
export async function createProduct(data: {
  name: string;
  price: number;
  description: string;
}) {
  try {
    await dbConnect();
    const newProduct = new Product(data);
    await newProduct.save();
    return { product: newProduct };
  } catch (err: any) {
    return { error: err.message };
  }
}

// Edit an existing product
export async function editProduct(
  id: string,
  data: { name?: string; price?: number; description?: string }
) {
  try {
    await dbConnect();
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
    if (!updatedProduct) {
      return { error: "Product not found" };
    }
    return { product: updatedProduct };
  } catch (err: any) {
    return { error: err.message };
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    await dbConnect();
    const deletedProduct = await Product.findByIdAndDelete(id).lean();
    if (!deletedProduct) {
      return { error: "Product not found" };
    }
    return { message: "Product deleted successfully" };
  } catch (err: any) {
    return { error: err.message };
  }
}
