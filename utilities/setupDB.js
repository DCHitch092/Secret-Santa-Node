import mongoose from 'mongoose';
import { config } from 'dotenv';

config();
const PASSWORD = process.env.MONGODB
const databaseName = 'test'
// mongoose.promise = global.Promise

async function removeAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

async function dropAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return
      console.log(error.message)
    }
  }
}

export default function setupDB (databaseName) {
    // Connect to Mongoose
    const uri = `mongodb+srv://Chumchi:${PASSWORD}@dchitch092.ok1hp6k.mongodb.net`;

    before(async () => {
      const url = `${uri}/${databaseName}?retryWrites=true&w=majority`
      await mongoose.connect(url, { useNewUrlParser: true })
    })

    // beforeEach(async (done) => {
    //   // run()
    // })
    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections()
    })

    // Disconnect Mongoose
    after(async () => {
      await dropAllCollections()
      await mongoose.connection.close()
    })
  }
