const stream = require('node:stream')
const fs = require('node:fs')

const pipeline = stream.promises.pipeline

const run = async () => {
    // const writable = new stream.Writable()
    const writable = fs.createWriteStream('writable.txt')

    // setInterval(() => {
    //     writable.write(Date.now().toString() + '\n')    
    // }, 1000);

    // setTimeout(() => {
    //     writable.end()
    // }, 3000);

    process.stdin.pipe(writable)

    writable.on('finish', () => {
        console.log('Write done!')
    })

    // console.log(writable)
}

run().catch(console.error)