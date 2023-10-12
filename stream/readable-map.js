const  { Readable } = require('node:stream')
const { Resolver } = require('node:dns/promises')

const run = async () => {
    // With a synchronous mapper.
    for await (const chunk of Readable.from([1, 2, 3, 4]).map((x) => x * 2)) {
        console.log(chunk) // 2, 4, 6, 8
    }

    // With an asynchronous mapper, making at most 2 queries at a time.
    const resolver = new Resolver()

    const dnsResults = Readable.from([
        'nodejs.org',
        'openjsf.org',
        'www.linuxfoundation.org',
    ]).map((domain) => resolver.resolve4(domain), { concurrency: 2 })

    for await (const result of dnsResults) {
        console.log(result) // Logs the DNS result of resolver.resolve4.
    }
}

run().catch(console.error)