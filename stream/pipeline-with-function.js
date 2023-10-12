const { pipeline } = require('node:stream/promises')
const fs = require('node:fs')

const processChunk = async (chunk) => {
    return chunk.toUpperCase()
}

async function run() {
    await pipeline(
        fs.createReadStream('pipeline-with-function.js'),
        
        async function* (source, { signal }) {
            source.setEncoding('utf8');  // Work with strings rather than `Buffer`s
            for await (const chunk of source) {
                yield await processChunk(chunk, { signal })
            }
        },
        
        async function* (source, { signal }) {
            for await (const chunk of source) {
                console.log(1)
                yield chunk
            }
            
            return source
        },
        
        fs.createWriteStream('pipeline-with-function.js.upper'),
    )
    
    console.log('Pipeline succeeded.')
}

run().catch(console.error)