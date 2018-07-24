module.exports = {
    port: process.env.port || 3000,
    db: process.env.mongodb || 'mongodb://localhost:27017/socialcards',
    SECRET_TOKEN: 'clavetokensocialcards'
}
