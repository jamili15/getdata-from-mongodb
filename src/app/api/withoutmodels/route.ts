import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const db = mongoose.connection.useDb("cloud_obo");
    const collection = db.collection("standalonepermit");
    const products = await collection.find({}).toArray();
    return NextResponse.json(products);
  } catch (err: any) {

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
