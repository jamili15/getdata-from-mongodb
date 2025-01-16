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
//     const url = new URL(request.url);
//     const dbname = url.searchParams.get("dbname");
//     const collectionname = url.searchParams.get("collectionname");
//     const trackno = url.searchParams.get("trackno");

//     if (!dbname || !collectionname) {
//       return NextResponse.json({ error: "Missing dbname or collectionname" }, { status: 400 });
//     }

//     await dbConnect();
//     const db = mongoose.connection.useDb(dbname);
//     const collection = db.collection(collectionname);
    
//     const query: Record<string, any> = {};
//     if (trackno) {
//       query.trackno = trackno;
//     }

//     const products = await collection.find(query).toArray();

//     return NextResponse.json(products);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }



// ## WITH SLUG

// export async function GET(
//   request: Request,
//   { params }: { params: { dbname: string; collectionname: string } }
// ) {
//   try {
//     const { dbname, collectionname } = params; 
//     const url = new URL(request.url);
//  const trackno = url.search.slice(1);
// const trackno = url.searchParams.get("trackno");

//     if (!dbname || !collectionname) {
//       return NextResponse.json(
//         { error: "Missing dbname or collectionname" },
//         { status: 400 }
//       );
//     }

    
 
//     const query: Record<string, any> = {};
//     if (trackno) {
//       query.trackno = trackno;
//     }

  
//     const db = openDb(dbname, collectionname);
//     const permits = await db.getList(query);

 
//     return NextResponse.json(permits);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }