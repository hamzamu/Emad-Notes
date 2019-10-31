<template>
    <div class="bg is-fh disable-scrollx" style="background:#FFF;position:relative;">
        <el-row :gutter="12" class="is-fh disable-selectx disable-scroll">
            <!-- Toolbar -->
            <el-row :gutter="24" style="padding:0px;border-bottom:1px solid #eee;">

                <el-col :span="5" class="notes-listx" style="text-align:center;">
                    <el-input placeholder="Search note" style="width:98%;margin:10px 15px" v-model="searchInput"
                        @change="searchDocs"></el-input>
                </el-col>
                <!--  -->
                <el-col :span="6">
                    <el-button-group style="margin:10px;" v-if="id">

                        <el-button size="small" :class="{'btn-focus' : currentView == 'editor'}" round
                            @click="currentView = 'editor' ; noteSet('id',{currentView:'editor'})">Editor
                        </el-button>

                        <el-button size="small" :class="{'btn-focus' : currentView == 'attach'}" round
                            @click="currentView = 'attach'; noteSet('id',{currentView:'attach'})">
                            Attachments
                        </el-button>


                        <el-button size="small" :class="{'btn-focus' : currentView == 'tasks'}" round
                            @click="currentView = 'tasks'; noteSet('id',{currentView:'tasks'})">
                            Tasks
                        </el-button>


                    </el-button-group>
                </el-col>
                <!--  -->
                <el-col class="topbar-fix" :span="6">
                    <!-- ADD EVENTS -->
                    <!-- <i class="el-icon-star-off"></i> -->
                    <!-- <el-button icon="el-icon-star-off" circle @click="pin(id)"></el-button> -->
                    <!-- <i class="el-icon-set-up"></i> -->
                    <!-- <i class="el-icon-open"></i> -->
                </el-col>
                <!--  -->
                <el-col :span="6" class="topbar-fix">
                    <!-- Add Event -->
                     <el-button icon="el-icon-delete" circle @click="remove(id)"></el-button>

                </el-col>
            </el-row>
            <!--  -->
            <!-- List: Notesss -->
            <el-col :span="5" class="has-sidebar disable-select is-list" style="padding:0;">

                <el-card v-if="!docs || !docs.length">
                    There is no notes yet, Create some notes.
                </el-card>
                <el-row :gutter="12" class="is-sharp boxed is-clickable" v-for="(i,index) in docs" v-bind:key="index"
                    style="margin:0;padding:0;">
                    <!--  -->
                    <el-col :span="12" class="notes-listx" :class="{ 'note-active' : id == i._id}"
                        style="width:100%;padding:10px;margin:0;font-size:90%;" @click.native="viewNote(i._id)">

                        <p>
                            <i class="el-icon-star-on" v-show="i.pinned"></i>
                            <span style="display:block;width:100%;">{{i.title}}</span>
                        </p>
                        <small><strong>{{ i.updatedAt | moment("from", "now") }}</strong></small>
                    </el-col>
                    <!-- <el-col :span="12" style="float:right;text-align:right;">
                        <el-button @click="viewNote(i._id)" icon="el-icon-edit" type="text" circle></el-button>
  
                    </el-col> -->
                </el-row>
            </el-col>
            <!-- Editor -->
            <el-col :span="19" class="is-list" style="position:relative;">
                <editor v-show="currentView == 'editor'" v-bind:doc="doc" v-bind:id="doc._id"></editor>
                <attachments v-show="currentView == 'attach'" v-bind:doc="doc"></attachments>
                <tasks v-show="currentView == 'tasks'" v-bind:doc="doc"></tasks>
                <!-- Navigation -->
                <br />
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {
        EventBus
    } from '../eventBus.js'
    import _ from 'lodash';
    import {
        App
    } from '../app.engine.js'
    import {
        Emad
    } from '../app.emad.js'
    const {
        remote
    } = require('electron');
    import Editor from './editor-content'
    import Attachments from './editor-attachment'
    import Tasks from './editor-tasks'
    export default {
        name: 'list',
        props: ['docs', 'config', 'input'],
        components: {
            Editor,
            Attachments,
            Tasks
        },
        // props:['config','input'],
        data() {
            return {
                // docs: "",
                count: 'loading..',
                notes: null,
                selected: '',
                doc: '',
                id: '',
                currentView: '',
                searchInput: '',
            }
        },
        watch: {
            currentView: function () {
                if (!this.currentView) {
                    this.currentView = 'editor'
                }
            },

        },
        computed: {},
        methods: {
            searchDocs() {
                EventBus.$emit('searchDocs', this.searchInput)
            },
            setEditorView(view) {
                this.currentView = view;
            },
            fetch() {},
            /**
             * getNote
             */
            getNote(id) {
                var self = this;
                // this.$configs.get('id')
                // var id = this.$configs.get('id');
                // console.log(id,this.$configs.get('id'))
                if (id) {
                    this.$db.notes.findOne({
                        _id: id
                    }, function (err, doc) {
                        self.$configs.set('id', doc._id)
                        self.doc = doc;
                        self.notes = doc.notes;
                        self.currentView = doc.currentView || 'editor';
                        self.id = doc._id
                    });
                } else {
                    this.$db.notes.findOne({}, {
                        updatedAt: -1
                    }, function (err, doc) {
                        if (!doc || !doc._id) {
                            return
                        }
                        self.$configs.set('id', doc._id)
                        self.doc = doc;
                        self.notes = doc.notes;
                        self.currentView = doc.currentView || 'editor'
                        self.id = doc._id
                    });
                }
            },
            /**
             * Remove Note
             */
            remove(id) {
                this.$db.notes.remove({
                    _id: id
                }, function (err) {});
                this.fetch()
                EventBus.$emit('docRefresh');
            },
            /**
             * Pin Note
             */
            pin(id, v) {
                var v = (v) ? false : true;
                this.$db.notes.update({
                    _id: id
                }, {
                    $set: {
                        pinned: v
                    }
                }, function (err) {});
                EventBus.$emit('docRefresh');
            },
            // OLD
            setNote(id) {
                this.$configs.set('id', id)
                this.$router.push('editor')
            },
            /**
             * Current Working
             */
            viewNote(id) {
                this.$configs.set('id', id)
                // EventBus.$emit('getNote', id);
                this.id = id;
                this.getNote(id)
            },
            /**
             * Set Note: Options
             */
            noteSet(id, data) {
                Emad.noteUpdate(this.doc._id, data)
                this.getNote(this.doc._id)
            },
            /**New Editor */
            newNote() {
                this.currentView = 'editor';
                this.$configs.set('id', '')
                this.doc = ''
                this.id = ''
            },

        },
        created() {
            this.$configs.set('id', '')
            // this.$db.notes.remove({}, { multi: true }, function (err, numRemoved) {
            // });
        },
        mounted() {
            // Fetch All docs

            this.currentView = 'editor'
            EventBus.$on('fetchDocs', this.fetch)
            // Fetch Doc 
            EventBus.$on('fetchDoc', this.getNote)
            // New Editor
            EventBus.$on('newNote', this.newNote)
            //

            // EventBus.$on('newNote', this.newNote)
            // Refresh
            this.fetch()
            this.getNote()
        }
    }
</script>
<style>
    .bgx {
        background: #eee;
    }

    .is-clickable {
        cursor: pointer;
    }

    .is-list {
        overflow-y: scroll;
        height: 100vh;
        position: relative;
        scroll-behavior: smooth;
        color: #444;

    }

    .boxed {
        display: block;
        width: 100%;
        /* height: auto; */
        overflow: hidden;
        padding: 20px 10px 10px 5px;
        border-bottom: 1px solid #eee;
    }

    .has-sidebar {
        border-right: 1px solid #eee;
        padding-right: 0;
    }

    .is-fh {
        height: 100vh;
        overflow: hidden;
    }

    .is-sharp {
        border-radius: 0px;
        margin: 0px !important;
        border: 0px auto;
        box-shadow: none;
    }

    .notes-list {
        padding: 0 5px 0 10px !important;
    }

    .note-active {
        background: #f5f5f5;
    }

    .btn-focus {
        background: #a0cfff !important;
        color: #fff !important;

    }
</style>