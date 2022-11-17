import mongoose from "mongoose";

const { Schema } = mongoose;
import { pairingSchema } from './pairing.js';

const resultSchema = new Schema({
  outcomes: [{
    owner: String,
    picks: [ pairingSchema ]
  }]},
  { timestamps: true }
)

const Result = mongoose.model('Result', resultSchema)

export { Result, resultSchema };
