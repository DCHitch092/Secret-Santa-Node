import mongoose from "mongoose";

const { Schema } = mongoose;
import { wantSchema } from './want.js';

const participantSchema = new Schema({
  name:  String,
  type:  String
})

const Participant = mongoose.model('Participant', participantSchema)

export { Participant, participantSchema };
