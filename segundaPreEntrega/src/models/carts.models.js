import { Schema, model } from "mongoose";

const cartsSchema = new Schema({
  products: {
    type: [
      {
        id_prod: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: function () {
      return [];
    },
  },
});

export const cartsModel = model("carts", cartsSchema);
