/* eslint-disable no-console */
/*global console*/

import app from './app'
import config from './app/config'
import mongoose from 'mongoose'

const PORT = config.port
const uri = config.database_url
async function main() {
  try {
    //! MongoDB connection URI
    //! Connect to MongoDB using Mongoose

    await mongoose.connect(uri as string, { dbName: 'Mongoose-Master' })
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}`)
    })
  } catch (error) {
    //! Handle connection error
    console.log('Error connecting to MongoDB:', error)
  }
}

main()
