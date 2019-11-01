import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron';


// const {shell} = require('electron') // deconstructing assignment
// shell.openItem(path.join(remote.app.getPath('userData'))+'/dbs/')







var db = {};
db.notes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/dbs/data.db')
});
/** */
db.attach = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/dbs/atts.db')
})



export default db;

// export default new Datastore({
//   autoload: true,
//   filename: path.join(remote.app.getPath('userData'), '/data.db')
// })