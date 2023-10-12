/**
 * !Don't forget callback
 * !Don't forget free resources at destroy method
 */

const { Readable, Writable, Duplex, Transform, pipeline } = require('node:stream')

const readable = new Readable({
    construct(callback) {
        // Initialize state and load resources...
        console.log('readable was construct')
        this.pools = 'ytivohs'.split('')
        callback()
    },
    
    read(size) {
        setTimeout(() => {
            const chunk = this.pools.pop()
            this.push(chunk || null)
        }, 100)
    },

    destroy(error, callback) {
        // Free resources...
        console.log('readable was destroyed', error)
        callback()
    },
})

const duplex = new Duplex({
    construct(callback) {
        this.pools = []
        callback()
    },

    write(chunk, encoding, callback) {
        this.pools.push(chunk.toString())
        callback()
    },

    read() {
        //
    },

    final(callback) {
        this.push(this.pools.join('-'))
        this.push(null)
        callback()
    },
})

const transform = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase())
    },
    flush(callback) {
        // Can init in construct, build in transform, and push in here
        this.push('!')
        callback()
    },
})

const writable = new Writable({
    construct(callback) {
        console.log('writable was construct')
        callback()
    },

    write(chunk, encoding, callback) {
        setTimeout(() => {
            console.log(`writable chunk: ${chunk}`)
            callback(null, chunk)
        }, 100)
    },

    final(callback) {
        console.log('writable was finished')
        callback()
    },
    
    destroy(error, callback) {
        console.log('writable was destroyed', error)
        callback()
    },
})

pipeline(
    readable,
    duplex,
    transform,
    writable,
    (error) => {
        console.log('Pipeline done!', error)
    }
)
