/**
 * Data Controller
 */

import _ from 'lodash';
import db from './datastore'
const emad = {}

/**
 * Extract Attachments
 */
emad.attachmentSet = (id,str)=>{
    console.log('emad attachment', id, str)
}
/**
 * Note => Tags (cats)
 */
emad.tagsSet = (id,tags)=>{

}
/**
 * Doc New
 */
emad.docNew = (content)=>{
    db.insert(content)
}

/**
 * Doc:update
 */

 emad.docUpdate = (id,key,value)=>{
    db.update(id,{$set: {[key]:value}})
 }

/**
 * Props
 */
emad.docProps = (id,key,value)=>{
    db.update({_id: id},{ $set: {
        ["props." + key]: value,
        updatedAt: new Date()
    }},function(err,doc){
        if(err){
            console.log('err',err)
        }
    })
}

/**
 * Doc:batch
 */

emad.docBatch = (id,key,arr)=>{
    db.update({
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
  * getNote
  */

 emad.getDoc = (id,key,arr)=>{
    var d = db.findOne({_id:id}, {},function(err,doc){
        console.log('doc',doc)
    })
 }

 /**exports */
export const Emad = emad