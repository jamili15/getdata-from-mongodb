import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    await dbConnect();

    const db = mongoose.connection.useDb("test");
    const ProductInSpecificDb = db.model("Product", Product.schema);
    const products = await ProductInSpecificDb.find().lean();

    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
