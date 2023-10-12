const { finished } = require('node:stream/promises')
const fs = require('node:fs')

// In paused mode
const readable = fs.createReadStream('pipeline-with-function.js.upper')

async function run() {
    await finished(readable)
    console.log('Stream is done reading.')
}

run().catch(console.error)

readable.resume() // Drain the stream (-> flowing mode)

// Adding a 'data' event handler will resume steam
// Has data
readable.on('data', console.log)
readable.on('data', console.log)

setTimeout(() => {
    const writable = fs.createWriteStream('writable.txt')
    
    // Pipe will also resume steam
    // Data will be lost because the stream was drained after call "resume"
    // Lost data
    readable.pipe(writable)
    readable.on('data', console.log)
}, 100)