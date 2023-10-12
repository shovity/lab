const { Readable, Writable, Duplex, Transform, pipeline } = require('stream');

const readable = new Readable({
    construct(callback) {
        // Initialize state and load resources...
        console.log('readable was construct');
        this.pools = 'shovity'.split('');
        callback();
    },
    
    read(size) {
        setTimeout(() => {
            const chunk = this.pools.pop();
            this.push(chunk || null);
        }, 100);
    },

    destroy(error, callback) {
        // Free resources...
        console.log('readable was destroyed', error);
        callback();
    },
});

const duplex = new Duplex({
    write(chunk, encoding, callback) {
        setTimeout(() => {
            chunk = chunk.toString().toUpperCase();
            console.log(`duplex chunk: ${chunk}`);
            this.push(chunk)
            callback();
        }, 100);
    },

    read() {
    
    },
});

const writable = new Writable({
    construct(callback) {
        // Initialize state and load resources...
        console.log('writable was construct');
        callback();
    },
    write(chunk, encoding, callback) {
        setTimeout(() => {
            console.log(`writable chunk: ${chunk}`);
            callback();
        }, 100);
    },
    final(callback) {
        console.log('writable was finished');
        callback();
    },
    destroy(error, callback) {
        // Free resources...
        console.log('writable was destroyed', error);
        callback();
    },
});

pipeline(
    readable,
    duplex,
    writable,
    (error) => {
        console.log('Pipeline done!', error);
    }
);
