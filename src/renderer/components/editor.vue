<template>
    <div>
        <div class="statusbar">
            <div class="tag-group">
                <el-tag size="small"><b>Words:</b> {{count.words}}</el-tag>
                <el-tag size="small"><b>Sentences:</b>{{count.sentences}}</el-tag>
                <el-tag size="small"><b>Paragraphs:</b> {{count.paragraphs}}</el-tag>
                <el-tag size="small"><b>Caracters:</b> {{count.characters}}</el-tag>
            </div>
        </div>
        <!--  -->
        <!-- editors background -->
        <div class="container content" v-bind:style="{ backgroundImage: 'url(' + bg + ')' }">
            <div class="meta-editor" v-if="isMeta">
                <!-- Meta -->
                <div class="meta-container disable-select">
                    <!-- {{note}} -->
                    <!-- <el-button circle icon="el-icon-edit" @click.native="editor = !editor"></el-button> -->
                    <el-tag size="small" type='info' v-if="meta.createdAt"><i class="el-icon-watch"></i> <span
                            class="small"> {{ meta.createdAt | moment("from", "now") }}</span></el-tag>
                    <el-tag size="small" type='success' v-if="meta.updatedAt"><i class="el-icon-circle-check"></i> <span
                            class="small">{{ meta.updatedAt | moment("from", "now") }}</span></el-tag>
                    <!--  -->
                    <div class="box-cardx" v-if='!id'>
                        <p>
                            There is notes, categories, or metas for this document. <br /> <br /> Please add some.
                            <br /> <br /> Checkout the help window to know the commands.
                        </p>
                    </div>
                    <!--  -->
                    <div v-if="id">
                        <div v-if="cats">
                            <h4>Tags</h4>
                            <el-tag :key="tag" v-for="tag in cats" closable :disable-transitions="false"
                                @close="tagRemote(tag)">
                                {{tag}}
                            </el-tag>
                            <!--  -->
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                                size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"
                                style="width:120px;">
                            </el-input>
                            <!--  -->
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
                            </el-button>
                            <el-divider></el-divider>
                        </div>
                        <!--  -->
                        <!-- Layout-->
                        <div class="tag-groupx" v-if='layout'>
                            <h4>Layout</h4>
                            <div v-for="(value, index) in layout" v-bind:key="index" size="small" type='info'>
                                <el-button circle icon="el-icon-edit" size="mini"
                                    @click="editLayout = true ; editingLayout = value; oldLayout = value">
                                </el-button>
                                {{value}}
                            </div><br />
                            <el-divider></el-divider>
                        </div>
                        <!--  -->
                        <!-- Tags/Cats -->
                        <!-- <div class="tag-group" v-if='cats'>
                        <h4>Tags</h4>
                        <el-tag v-for="(value, index) in cats" v-bind:key="index" size="small" type='info'>{{value}}
                        </el-tag>
                        <el-divider></el-divider>
                    </div> -->
                        <!--  -->
                        <!--  -->
                        <div class="" v-if='props'>
                            <h4>Meta</h4>
                            <div class="box-cardx" v-for="(value, name) in props" v-bind:key="name">
                                <span>{{name}}</span> : {{value}}
                            </div>
                            <el-divider></el-divider>
                        </div>
                        <!--  -->
                        <!-- Notes -->
                        <div class="tag-group" v-if="tags && tags.length">
                            <h4>Notes</h4>
                            <!-- <el-tag v-for="(i,index) in tags" v-bind:key="index" type="success">{{i}}</el-tag> -->
                            <br />
                            <div class="tag-group" v-if="tags">
                                <div v-for="(tag,index) in tags" v-bind:key="index">
                                    <el-tag>{{tag}}</el-tag><br />
                                    <ul class="notes">
                                        <li v-for="(i,index) in rdr(tag)" v-bind:key="index">
                                            <el-button circle icon="el-icon-edit" size="mini"
                                                @click="editNote = true ; sideNoteData.text = i.text; sideNoteData.tag = tag">
                                            </el-button>
                                            {{i.text}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <el-divider></el-divider>
                        </div>

                        <!--  -->
                        <!--  -->
                        <div v-if="notes && notes.length">
                            <h4>Drafts</h4>
                            <div class="" v-for="(value, index) in notes" v-bind:key="index">
                                {{value}}
                                <el-divider></el-divider>
                            </div>
                        </div>
                        <!--  -->
                        <div class="" v-if='urls'>
                            <h4>Attachments</h4>
                            <el-row :gutter="12">
                                <el-col :span="8" v-for="(value, index) in urls" v-bind:key="index">
                                    <el-card shadow="hover">
                                        <span> <a class='board-item-a' :href="value" target="_blank"
                                                @click.prevent="openExternalBrowser">{{value}}</a></span>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </div>
                        <!--  -->
                    </div>

                    <!-- Clipboard paste -->
                    <!--  -->
                    <el-button type="primary" @click="updateClipboard">Clipboard to note</el-button>
                    <!-- Layouts -->
                    <!--  -->
                    <!--  -->
                </div>
            </div>
            <!--  -->
            <div class="editor">
                <!-- FIX NOTE -->
                <vue-countable :text="content" :elementId="'editorBox'" @change="change"></vue-countable>
                <!-- <img  v-bind:src="imageUrl"/> -->
                <contenteditable v-if="editor" id="editorBox" ref="editor" tag="div" :contenteditable="isEditable"
                    v-model="content" :noNL="false" @input="updateInput" @keydown.esc.native="exit" />
                <!--  -->
                <div class="editorContent" v-html="compiledMarkdown" v-if="!editor"></div>
            </div>
        </div>
        <!--  -->
        <!-- Edit Note  -->
        <el-dialog title="Edit side note" :visible.sync="editNote" width="40%">
            <p>
                {{sideNoteData.text}}
                <el-input placeholder="Search tags" ref="tags" v-model="sideNote" style="width:100%;"></el-input>
            </p>
            <div>
            </div>
            <!--  -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editNote = false ; editSideNote()" style="float:left;" icon="el-icon-delete"
                    type="danger">
                </el-button>
                <el-button @click="editNote = false">Cancel</el-button>
                <el-button type="primary" @click="editNote = false ; editSideNote()" icon="el-icon-edit"></el-button>
            </span>
        </el-dialog>
        <!--  -->
        <!-- Edit Layout -->
        <el-dialog title="Edit Layout" :visible.sync="editLayout" width="40%">
            <p>
                {{sideNoteData.value}}
                <el-input placeholder="New Layout" ref="tags" v-model="editingLayout" style="width:100%;"></el-input>
            </p>
            <div>
            </div>
            <!--  -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editLayout = false ; editLayoutAction()" style="float:left;" icon="el-icon-delete"
                    type="danger">
                </el-button>
                <el-button @click="editLayout = false">Cancel</el-button>
                <el-button type="primary" @click="editLayout = false ; editLayoutAction()" icon="el-icon-edit">
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import _ from 'lodash';
    import axios from 'axios';
    import marked from 'marked';
    import {
        EventBus
    } from '../eventBus.js'
    import {
        App
    } from '../app.engine.js'
    import {
        Emad
    } from '../app.emad.js'
    const {
        remote
    } = require('electron');
    const { clipboard } = require('electron')
    // const cheerio = require('cheerio')
    export default {
        props: ['input'],
        components: {},
        data() {
            return {
                session: '',
                note: null,
                id: '',
                mode: '',
                preview: '',
                content: '',
                tags: '',
                cats: "",
                layout: "",
                meta: '',
                att: '',
                isEditable: true,
                // bg: 'static/images/lined-paper-2.png',
                bg: "",
                count: '',
                props: '',
                isMeta: true,
                editor: true,
                editNote: false,
                sideNote: '',
                sideNoteData: {},
                editLayout: false,
                editingLayout: "",
                oldLayout: "",
                urls: "",
                inputVisible: false,
                inputValue: '',
                notes: ""
            }
        },
        watch: {
            content() {
                /**
                 * Watch Content
                 */
                var content = this.content;
                if (!content) {
                    return
                }
                var urlRegex =
                    /https?:\/\/([\w\d-\.]+)?[\w\d-\.]+\.{1}[\w]{1,4}((\/{1})?)([a-zA-Z0-9&-@_\+.‌​~#?\/=]*)?/gi;
                var urls = content.match(urlRegex)
                if (!urls || !urls.length) {
                    return
                }
                var urls = _.uniq(urls)
                // console.log(urls)
                this.urls = urls;
                this.attach(urls)
                /**
                 * 
                 */
                // axios.get(urls[0]).then((response) => {
                //     console.log(response)
                //     if (status == 200) {
                //     }
                // });
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.content, {
                    sanitize: true
                })
            }
        },
        methods: {
            updateClipboard(){
                Emad.docBatch(this.id,'notes',[clipboard.readText('selection')]);
                this.fetch()
            },
            openExternalBrowser(e) {
                remote.shell.openExternal(e.target.href);
            },
            editSideNote() {
                var data = {
                    '$pull': {
                        'meta': {
                            text: this.sideNoteData.text
                        }
                    }
                }
                
                if (this.sideNote) {
                    data["$addToSet"] = {
                        meta: {
                            name: this.sideNoteData.tag,
                            text: this.sideNote
                        }
                    }
                }
                this.$db.notes.update({
                    _id: this.id
                }, data, function () {});
                this.sideNote = '';
                this.fetch();
            },
            editLayoutAction() {
                var data = {
                    '$pull': {
                        'layout': this.oldLayout
                    }
                }
                // if (this.sideNote) {
                data["$push"] = {
                    layout: this.editingLayout
                }
                // }
                this.$db.notes.update({
                    _id: this.id
                }, data, function () {});
                this.sideNote = '';
                this.fetch();
            },
            rdr(tag) {
                var att = JSON.stringify(this.att)
                var notes = _.filter(JSON.parse(att), {
                    name: tag
                });
                return notes;
            },
            exit() {
                this.$el.querySelector('#editorBox').blur()
            },
            fetch() {
                var self = this;
                if (this.$configs.get('id')) {
                    this.$db.notes.findOne({
                        _id: this.$configs.get('id')
                    }, function (err, doc) {
                        self.content = doc.content
                        self.tags = doc.tags
                        self.props = doc.props
                        self.meta = {
                            createdAt: doc.createdAt,
                            updatedAt: doc.updatedAt
                        }
                        self.cats = doc.cats;
                        self.att = doc.meta;
                        self.layout = doc.layout;
                        self.note = doc;
                        self.notes = doc.notes;
                    });
                }
            },
            updateInput(e) {
                var self = this;
                var content = this.content
                var c = this.$refs.editor.innerText
                var content = event.target.innerText
                // console.log(xx)
                var title = this.content.substring(0, 30);
                if (!this.id) {
                    if (!this.content) return;
                    this.$db.notes.insert({
                        title: title,
                        content: this.content,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }, function (err, newDoc) {
                        self.id = newDoc._id
                    });
                    this.fetch()
                } else {
                    this.$db.notes.update({
                        _id: this.id
                    }, {
                        $set: {
                            title: title,
                            content: self.content,
                            updatedAt: new Date()
                        }
                    }, function () {});
                    this.fetch()
                }
            },
            /**
             * Temp. testing
             */
            appendContent(input) {
                console.log('setting notes', input)
                var content = this.content + "\n" + input;
                // this.$db.notes.update({
                //     _id: this.id
                // }, {
                //     $set: {
                //         // title: title,
                //         content: content,
                //         updatedAt: new Date()
                //     }
                // }, function () {});
                this.$db.notes.update({
                    _id: this.id
                }, {
                    // $set: {
                    //     updatedAt: new Date()
                    // },
                    $addToSet: {
                        notes: input
                    }
                }, function () {});
                //
                this.fetch()
            },
            change(e) {
                this.count = e;
            },
            toggleMeta() {
                this.isMeta = (this.isMeta) ? false : true;
            },
            /** setAttachments */
            attach(urls) {
                console.log(urls)
                //     axios.get(urls[0]).then((response) => {
                //       console.log(response)
                //       if(status == 200){
                //       }
                //   });
            },
            /**Tags 
             * Remove Tag
             */
            tagRemote(tag) {
                // this.cats.splice(this.cats.indexOf(tag), 1);
                this.$db.notes.update({
                    _id: this.id
                }, {
                    $pull: {
                        cats: tag
                    }
                }, {}, function () {});

                this.fetch()
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (!inputValue) {
                    return
                }
                Emad.docBatch(this.id, 'cats', [inputValue])
                this.inputVisible = false;
                this.inputValue = '';
                this.fetch()
            }
        },
        mounted() {
            
            EventBus.$on('updateEditor', this.fetch);
            EventBus.$on('appendEditor', this.appendContent);
            EventBus.$on('toggle-meta', this.toggleMeta);
            /**
             * Open Links in The browser
             */
            this.$el.querySelectorAll('.board-item-a').forEach(a => {
                a.addEventListener('click', (e) => {
                    e.preventDefault()
                    require('electron').shell.openExternal(e.target.href)
                })
            })
        },
        created() {
            var self = this;
            self.id = this.$configs.get('id');
            Emad.attachmentSet('id', 'data')
            this.fetch()
        }
    }
</script>
<style>
    .container {
        position: relative;
        /* background: #fff; */
        min-height: 100vh;
        overflow-y: hidden;
        overflow-x: hidden;
        /* background-image: url("https://transparenttextures.com/patterns/graphy-dark.png"); */
    }

    .editor {
        /* border: 1px solid #eee; */
        width: 50%;
        height: auto;
        min-height: 87vh;
        color: #323232;
        font-size: 15px;
        border: 0px solid #ddd;
        overflow-y: hidden;
        overflow-x: hidden;
    }

    .editorContent {
        padding: 20px;
        width: 100%;
        display: block;
        border: none;
        outline: none;
        white-space: pre;
        white-space: pre-line;
    }

        [contenteditable="true"],
        [contenteditable="true"]:active,
        [contenteditable="true"]:focus {
            border: none;
            outline: none;
            white-space: pre;
            white-space: pre-line;
            padding: 20px;
        }

    /** */
    /*  */


    .meta-editor {
        width: 50%;
        display: block;
        /* height: auto; */
        height: 100vh;
        position: fixed;
        right: 0;
        top: 0;
        color: #333;
        background-color: rgba(255, 255, 255, 0.75);
        border-left: 1px solid #e4e4e4;
        z-index: 1009;
        overflow-y: scroll !important;
        overflow: auto;
        padding-bottom: 100px;
    }

    .meta-container {
        padding: 10px !important;
        padding-bottom: 100px !important;
        width: 95%;
        margin: 0px auto;
        height: auto;
        overflow-y: scroll !important;
        overflow: auto;
    }

    /** */
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 35px;
        background: #333;
        padding: 10px;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    ul.notes {
        list-style: none;
        padding: 0 0 4px 5px;
        margin: 0;
    }

    ul.notes li {
        padding: 4px;
    }

    /*  tags */
    .el-tag+.el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>