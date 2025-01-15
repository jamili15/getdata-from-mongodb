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



// export async function GET(request: Request) {
//   try {
//     // Extract query parameters from the URL
//     const url = new URL(request.url);
//     const dbname = url.searchParams.get("dbname");
//     const dbcollection = url.searchParams.get("dbcollection");

//     // Validate the parameters
//     if (!dbname || !dbcollection) {
//       return NextResponse.json({ error: "Missing dbname or dbcollection" }, { status: 400 });
//     }

//     await dbConnect();
//     const db = mongoose.connection.useDb(dbname);
//     const collection = db.collection(dbcollection);
//     const products = await collection.find({}).toArray();

//     return NextResponse.json(products);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }