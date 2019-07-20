const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ posts: [], configs:{}, tags:[], user: {}, count: 0 }).write()
// export default new Datastore({
//     autoload: true,
//     filename: path.join(remote.app.getPath('userData'), '/data.db')
//   })
export default {
    db : db
}