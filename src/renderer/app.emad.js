/**
 * Data Controller
 */

import _ from 'lodash';
import db from './datastore'
import axios from 'axios'
import cheerio from 'cheerio'
import {
    Attach
} from './attachments.lib';


const emad = {}

/**
 * Extract Attachments
 */
emad.attachmentSet = (id, str) => {
    console.log('emad attachment', id, str)
}
/**
 * Note => Tags (cats)
 */
emad.tagsSet = (id, tags) => {

}
/**
 * Doc New
 */
emad.docNew = (content) => {
    db.notes.insert(content)
}

/**
 * Doc:update
 */

emad.docUpdate = (id, key, value) => {
    db.notes.update(id, {
        $set: {
            [key]: value
        }
    })
}

/**
 * Props
 */
emad.docProps = (id, key, value) => {
    db.notes.update({
        _id: id
    }, {
        $set: {
            ["props." + key]: value,
            updatedAt: new Date()
        }
    }, function (err, doc) {
        if (err) {
            console.log('err', err)
        }
    })
}

/**
 * Doc:batch
 */

emad.docBatch = (id, key, arr) => {
    if (!id || !key || !arr || !_.isArray(arr)) {
        console.log('emand.docBatch: ERR')
        return
    }
    db.notes.update({
        _id: id
    }, {
        $addToSet: {
            [key]: {
                $each: arr
            }
        }
    }, {}, function () {});

}
/**
 * 
 */

 /**
 * Doc:batch:Rm
 *          Unfinished
 */

emad.docBatchRm = (id, key, arr) => {
    if (!id || !key || !arr ) {
        console.log('emand.docBatch')
        return
    }
    db.notes.update({
        _id: id
    }, {
        $pull: {
            [key]: {
                $each: arr
            }
        }
    }, {}, function () {});

}

/**
 * getNote
 */

emad.getDoc = (id, key, arr) => {
    var d = db.notes.findOne({
        _id: id
    }, {}, function (err, doc) {
        console.log('doc', doc)
    })
}
/**
 *  Emad.noteNew
 */
emad.noteNew = (note) => {
    note.createdAt = new Date()
    note.updatedAt = new Date()
    db.notes.insert(note)
}
/**
 * NoteUpdate
 * -- Working
 */

emad.noteUpdate = (id, data) => {
    console.log('noteUpdate', id, data)
    data.updatedAt = new Date()
    db.notes.update({
        _id: id
    }, {
        $set: data
    })
}

/**
 * URL Meta SET
 */

emad.setURLMeta = (id, url) => {
    console.log(id, url)
    axios.get(url)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                const title = $("title").text();
                const desc = $('meta[name=description]').attr("content");
                var image = $('meta[property="og:image"]').attr('content');
                const meta = {
                    url: url,
                    title: title,
                    desc: desc,
                    image: image,
                }
                console.log(meta)
                Emad.attachUpdate(id, meta)

            }
        }, (err) => console.log(err));

}

/**
 * Create a new Attachment
 */
emad.attachInsert = (docId, attach) => {
    if (!attach) {
        console.log('emad.attachInsert: params missing')
        return
    }
    attach.doc = docId;
    attach.createdAt = new Date();
    attach.updatedAt = new Date();
    // Extract URLS
    attach.urls = Attach.extractURL(attach.text) || []
    // Extract Tags 
    attach.tags = Attach.extractTags(attach.text) || []
    //
    db.attach.insert(attach, (err, doc) => {
        if (attach.urls.length) {
            emad.setURLMeta(doc._id, attach.urls[0])
        }
    })


}

/**
 * Attachment: update
 */
emad.attachUpdate = (id, attach) => {
    if (!id || !attach) {
        console.log('emad.attachInsert: params missing')
        return
    }
    attach.updatedAt = new Date();
    db.attach.update({
        _id: id
    }, {
        $set: attach
    })


}
/**
 * 
 */
emad.attachRemove = (id) => {
    db.attach.remove({
        _id: id
    })
}
/**
 * 
 */

/**
 * 
 */

/**
 * DEMO
 */
db.attach.find({}, function (err, doc) {
    console.log('app.emad log:', doc)
})



/**exports */
export const Emad = emad