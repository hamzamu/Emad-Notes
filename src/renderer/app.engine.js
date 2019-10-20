import _ from 'lodash';
import db from './datastore'
const app = {}
app.log = function(){
    console.log('logging')
}
app.commands = ['get','set','search','tags','show','toggle','hide','log','backup','toc','export','history']
app.tags = ['me', 'today', 'todo', 'tasks', 'project', 'media', 'quote', 'note', 'code', 'read', 'idea', 'tomorrow', 'nextweek', 'book'];
// app.commands = ['get', 'set', 'put', 'search', 'bot', 'log', 'se', 'tag', 'tags', 'reset'];
app.cols = ['left', 'right', 'center'];
app.args = ['=', '-', '@', '$'];
app.commands = ['find','fetch', 'set','get','tag', 'layout']
/*
*/
app.view = function (page) {
    //$('#'+id).load('views/'+page+'.html')
    //$('#viewpage').load('./' + page + '.html')
}
/*
*/
app.getTags = (input)=>{
    var value = input && input.trim();
    var value = value.toLowerCase();
    var tags = value.match(/#[a-zA-Z]+/gi);
    return tags
}
/*
    Extract URL(s)
*/
app.getURL = (str)=>{
}
/*
    Setting up tags
*/
app.metaSet = (data,id)=>{
    if(!id || !data) return;
    var tags = app.getTags(data)
    var text = data.replace(/#[a-zA-Z]+/, "");
    var r = []
    _.each(tags,(tag)=>{
        r.push({name:tag,text:text})
    })
    db.update({ _id: id }, { $push: { meta: {  $each: r } } }, {}, function () {});
}
/*
Does not work
*/

app.setTags = (cats,id)=>{
    if(!id || !cats) return;
    db.update({ _id: id }, { $addToSet: { tags: {  $each: cats } } }, {}, function () {});    
}


app.tagsSet = (cats,id)=>{
    if(!id || !cat) return;
    db.update({ _id: id }, { $addToSet: { cats: {  $each: cats } } }, {}, function () {});    
}


app.cleanTags = function (arr) {
    var arr = _.map(arr, function (tag) {
        // return tag.replace(/#[^a-zA-Z]/g, "");
        return tag.replace(/#+/g, "");
    });
    var arr = _.uniq(arr);
    return arr;
}

app.commandParse = (str)=>{    
    var arr = app.getTags(str);
    var arr = app.cleanTags(arr);
    var isCommand = _.intersection(arr,app.commands)
    if(isCommand.length){        
        var param = str.replace(/#[a-zA-Z]+/, "").trim() || null;
        return {command:isCommand[0],param:param}
    }
}

app.find = (option)=>{
    var option = option.trim()
    var result;
    console.log(option)
    db.find({}, function (err, docs) {
       result = docs;
    })
    console.log('result',result)
}


app.siteMeta = (url)=>{
}
app.get = ()=>{
}
app.set = ()=>{
}
app.search = ()=>{
}
export  const App = app