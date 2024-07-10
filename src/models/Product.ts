import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  firstname: string;
  lastname: string;
  age: number;
}

const productSchema: Schema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { collection: "product" }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
