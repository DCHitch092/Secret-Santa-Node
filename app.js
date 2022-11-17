import mongoose from 'mongoose';
import {config} from 'dotenv';

config();
const PASSWORD = process.env.MONGODB

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://Chumchi:${PASSWORD}@dchitch092.ok1hp6k.mongodb.net/?retryWrites=true&w=majority`);

  console.log('done')
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
