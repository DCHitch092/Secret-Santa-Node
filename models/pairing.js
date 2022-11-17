import mongoose from "mongoose";

const { Schema } = mongoose;

const pairingSchema = new Schema({
  gift_buyer: String,
  gift_receiver: String
})

const Pairing = mongoose.model('Pairing', pairingSchema)

export {Pairing, pairingSchema };
