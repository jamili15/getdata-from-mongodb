import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
