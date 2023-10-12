const fs = require('node:fs')

// In paused mode
const readable = fs.createReadStream('pipeline-with-function.js.upper')

console.log(readable.map)

// Change to flowing mode
readable.resume()

// Stop flowing, back to paused mode
readable.on('readable', function() {
    // There is some data to read now
    let data
  
    while ((data = this.read()) !== null) {
        // Chunk data
        console.log(data.toString())
    }
})

readable.on('end', () => {
    console.log('No more data to read')
})