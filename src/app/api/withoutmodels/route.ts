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



// ## WITH SLUG and search any filter


// export async function GET(
//   request: Request,
//   { params }: { params: { dbname: string; collectionname: string } }
// ) {
//   try {
//     const { dbname, collectionname } = params;

//     if (!dbname || !collectionname) {
//       return NextResponse.json(
//         { error: "Missing dbname or collectionname" },
//         { status: 400 }
//       );
//     }

//     const url = new URL(request.url);

//     // Extract all query parameters
//     const queryParams = Object.fromEntries(url.searchParams.entries());

//     // Build MongoDB query dynamically based on the provided query parameters
//     const query: Record<string, any> = {};
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value) {
//         query[key] = value; // Add to query only if the value exists
//       }
//     }

//     // Open the database and fetch filtered data
//     const db = openDb(dbname, collectionname);
//     const filteredList = await db.getList(query);

//     return NextResponse.json(filteredList);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }








//##modified openDB with page & row

// import { NextResponse } from "next/server";
// import { openDb } from "@/common/lib/server/db";

// export async function GET(
//   request: Request,
//   { params }: { params: { dbname: string; collectionname: string } }
// ) {
//   try {
//     const { dbname, collectionname } = params;

//     if (!dbname || !collectionname) {
//       return NextResponse.json(
//         { error: "Missing dbname or collectionname" },
//         { status: 400 }
//       );
//     }

//     const url = new URL(request.url);

//     // Extract query parameters with defaults
//     const page = parseInt(url.searchParams.get("p") || "1", 10); // Default to page 1
//     const perPage = parseInt(url.searchParams.get("r") || "20", 10); // Default to 5 results per page

//     // Calculate skip and limit for pagination
//     const skip = (page - 1) * perPage; // How many results to skip
//     const limit = perPage; // Results per page

//     // Build MongoDB query dynamically based on other filters
//     const query: Record<string, any> = {};
//     for (const [key, value] of url.searchParams.entries()) {
//       if (key !== "p" && key !== "r" && value) {
//         query[key] = value; // Add filters excluding pagination params
//       }
//     }

//     // Open the database and fetch the collection
//     const db = openDb(dbname, collectionname);
//     const collection = db.collection;

//     // Get the total count of matching records
//     const totalCount = await collection.countDocuments(query);

//     // Get the paginated list of records
//     const items = await collection.find(query).skip(skip).limit(limit).toArray();

//     // Calculate total pages
//     const totalPages = Math.ceil(totalCount / perPage);

//     // Return the paginated response
//     return NextResponse.json({
//       items,
//       pagination: {
//         currentPage: page,
//         perPage,
//         totalItems: totalCount,
//         totalPages,
//       },
//     });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
