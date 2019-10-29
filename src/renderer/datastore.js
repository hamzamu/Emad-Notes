import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron';

var db = {};
db.notes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db')
});
/** */
db.attach = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/atts.db')
})


export default db;

// export default new Datastore({
//   autoload: true,
//   filename: path.join(remote.app.getPath('userData'), '/data.db')
// })