import mongoose from "mongoose";

const { Schema } = mongoose;

const wantSchema = new Schema({
  name: 'string',
  participant: {
    type: mongoose.ObjectId,
    ref: 'Participant'
  }
})

const Want = mongoose.model('Want', wantSchema)

export { Want, wantSchema };
