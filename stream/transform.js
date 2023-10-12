const stream = require('node:stream')
const fs = require('node:fs')

const pass = new stream.PassThrough()
const writable = fs.createWriteStream('writable.txt')

stream.pipeline(
    pass,

    new stream.Transform({
        transform(chunk, encoding, callback) {
          callback(null, String(chunk).replace(' ', ''));
        },
    }),

    writable,

    (...a) => {
        console.log(a)
    },
)

setInterval(() => {
    pass.write('Hi Hi\n')
}, 100)

setTimeout(() => {
    pass.end()
}, 500)