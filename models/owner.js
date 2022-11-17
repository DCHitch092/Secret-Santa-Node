import mongoose from "mongoose";

const { Schema } = mongoose;

const ownerSchema = new Schema({
  name:  String,
  email:  String,
})

const Owner = mongoose.model('Owner', ownerSchema)

export {Owner, ownerSchema };
