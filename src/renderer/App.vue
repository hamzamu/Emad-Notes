<template>
    <div class="disable-scroll" style="position:relative">
        <!-- <el-row class="" style="background:#fff;border-bottom:1px solid #eee;">
            <el-col :span="8">
                .
            </el-col>
            <el-col :span="8">
                <el-input
                    placeholder="Start a new note by writing the title then [Enter] or use Command like: #find KEYWORD|TAG"
                    ref="commands" @keyup.right.native="checkTag" @blur.native="input == ''"
                    @keyup.esc.native="clearInput()" @keyup="input = $event.target.value;"
                    @keyup.enter.native="submitNote()" v-model="input" style="width:100%;border-radius:0px;"
                    class="command">
                </el-input>
            </el-col>
            <el-col :span="8">
                <div class="appActions">
                    <i class="el-icon-caret-top sysButton" @click="fullScreen(true)"></i>
                    <i class="el-icon-caret-bottom sysButton" @click="fullScreen(false)"></i>
                    <i class="el-icon-close sysButton" @click="close()"></i>
                </div>
            </el-col>
        </el-row> -->
        <!--  -->

        <!-- <div id="commands" style="fixedFooter">
            <el-input
                placeholder="Start a new note by writing the title then [Enter] or use Command like: #find KEYWORD|TAG"
                ref="commands" @keyup.right.native="checkTag" @blur.native="input == ''"
                @keyup.esc.native="clearInput()" @keyup="input = $event.target.value;"
                @keyup.enter.native="submitNote()" v-model="input" style="width:100%;border-radius:0px;"
                class="command">
            </el-input>
        </div> -->
        <!--  -->
        <!-- <div class="toolbar is-hiddenx">
            <el-row>
                <el-col :span="1" style="text-align:center;">
                    <el-button type="primary" icon="el-icon-edit" circle @click="$router.push('/editor')"></el-button>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="Please input" v-model="input"></el-input>
                </el-col>
                <el-col :span="15">
                    <div class="appActions">
                        <i class="el-icon-caret-top sysButton" @click="fullScreen(true)"></i>
                        <i class="el-icon-caret-bottom sysButton" @click="fullScreen(false)"></i>
                        <i class="el-icon-close sysButton" @click="close()"></i>
                    </div>
                </el-col>
            </el-row>
        </div> -->
        <!-- height:100vh; border: 0px solid #eee;padding:0;margin:0; -->
        <el-container class="disable-scroll" style="" id="app">
            <el-aside width="65px" v-if="isSideOpen">
                <el-menu style="height:100vh;" class="sidebar">
                    <el-menu-item index="1" @click="$router.push('/')">
                        <i class="el-icon-notebook-2"></i>
                    </el-menu-item>
                    <!--  -->
                    <el-menu-item index="2" @click="newNote()">
                        <i class="el-icon-plus"></i>
                    </el-menu-item>
                    <!--  -->
                    <!-- <el-menu-item index="2" @click="$router.push('/editor')">
                        <i class="el-icon-plus"></i>
                    </el-menu-item> -->
                    <!--  -->
                    <!-- HELP -->
                    <!-- <el-menu-item index="3" @click="$router.push('/help')">
                        <i class="el-icon-warning-outline"></i>
                    </el-menu-item> -->
                    <!--  -->
                    <!-- <el-menu-item index="2" @click="$router.push('tags')">
                      <i class="el-icon-news"></i>
                    </el-menu-item> -->
                    <!-- <el-menu-item index="3" @click="$router.push('search')">
                      <i class="el-icon-search"></i>
                    </el-menu-item> -->
                    <!-- <el-menu-item index="3" @click="$router.push('settings')">
                    <i class="el-icon-setting"></i>
                </el-menu-item> -->
                    <!-- toggle -->
                    <!-- <el-menu-item index="3" @click="isSideOpen = !isSideOpen" class="is-hiddenx">
                    <i class="el-icon-back"></i>
                </el-menu-item> -->
                    <!--  -->
                    <el-menu-item index="3" @click="close()" class="is-hiddenx">
                        <i class="el-icon-close"></i>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- Container -->
            <el-container>
                <div class="meta-logger" v-if="isMetaOpen">
                    <div class="meta-logger-content">
                        DATA
                    </div>
                </div>
                <!-- 
                    AUTO COMPLETE
                   -->
                <!-- Auro complete tags -->
                <div class="statusbar-shadow">
                    <!-- {{$config}} -->
                    <!-- {{$configs}} -->
                    <div class="tag-group" v-if="tags">
                        <el-tag v-for="(i,index) in tags" v-bind:key="index" type="danger">{{i}}</el-tag>
                        <!-- <el-tag><b>Words:</b></el-tag> -->
                    </div>
                </div>
                <!-- <div style="text-align: right; font-size: 12px; padding:0px 10px 0 10px;border-bottom:1px solid #fff;">
                  </div> -->
                <el-main class="disable-scroll" style="padding:0;margin:0px;background:#fff; ">
                    <!-- {{$configs}} -->
                    <router-view :config="config" :docs="docs" :input="input"></router-view>
                </el-main>
                <!--  -->
            </el-container>
            <!-- Dialog Test -->
            <el-dialog title="Tags" :visible.sync="dialogVisible" width="100%" fullscreen>
                <p>
                    <el-input placeholder="Search tags" ref="tags" @keyup="input = $event.target.value;"
                        @keyup.enter.native="getTags" v-model="searchTags" style="width:100%;"></el-input>
                </p>
                <div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">Search</el-button>
                </span>
            </el-dialog>
        </el-container>
    </div>
</template>
<script>
    import {
        remote
    } from 'electron';
    import _ from 'lodash';
    import {
        EventBus
    } from './eventBus.js';
    import {
        App
    } from './app.engine.js'
    import {
        Emad
    } from './app.emad.js'
    // TESTING
    // import axios from 'axios';
    // import got from 'got';
    // (async () => {
    //   try {
    //     const response = await got('medevel.com');
    //     // console.log(response.body);
    //   } catch (error) {
    //     // console.log(error.response.body);
    //   }
    // })();
    export default {
        name: 'app',
        data() {
            return {
                test: '',
                input: '',
                current: this.$configs.get('id'),
                // id: ,
                dialogVisible: false,
                searchTags: '',
                isSideOpen: true,
                isMetaOpen: false,
                tags: '',
                config: 'patata',
                docs: ''
            }
        },
        watch: {
            input() {
                var self = this;
                // Editor
                var cmd = App.commandParse(this.input)
                if (cmd && cmd.command) {
                    return
                }
                // Auto Complete Tags
                if (this.$configs.get('id') && this.input) {
                    // Tags filter
                    this.$db.notes.findOne({
                        _id: this.$configs.get('id')
                    }, function (err, doc) {
                        if (doc && doc.tags) {
                            var tags = doc.tags.filter((i) => i.indexOf(self.input) > -1)
                            self.tags = tags
                        }
                    });
                }
            },
            /**
             * On Router changes
             */
            '$route'(to, from) {
                var route = this.$route
                if (route.name == "main-page") {
                    this.tags = ""
                    this.input = ""
                }
            }
        },
        computed: {
            /**Computed */
            id() {
                return this.$configs.get('id')
            }
        },
        methods: {
            newNote() {
                EventBus.$emit('newNote')
            },
            set(data) {
                // Set
                var data = data.split(':')
                var id = this.$configs.get('id');
                if (!id || !data.length || !data[0] || !data[1]) {
                    return
                }
                Emad.docProps(id, data[0], data[1])
                EventBus.$emit('updateEditor', '');
                this.input = ''
            },
            get(data) {
                // cat/ progress/ status
            },
            tag(options) {
                var self = this;
                // => if is ID
                var input = this.input;
                var input = input.replace(/#[a-zA-Z]+/, "").trim().split(" ")
                if (!input[1]) {
                    this.$message('Please at the post tags: #cat set tag1,tag2,tag');
                    return;
                }
                // debug
                // SET
                var tags = input[1].trim()
                var tags = tags.split(",")
                if (this.$configs.get('id') && tags.length && input[0] === 'set') {
                    var tags = _.compact(tags)
                    this.$db.notes.update({
                        _id: this.$configs.get('id')
                    }, {
                        $addToSet: {
                            cats: {
                                $each: tags
                            }
                        }
                    }, {}, function () {});
                    //
                    EventBus.$emit('updateEditor', '');
                }
                // GET
                if (input[0] == 'get' && tags.length) {
                    this.$db.notes.find({
                        cats: {
                            $in: tags
                        }
                    }, function (err, docs) {
                        console.log('docs', docs)
                        var docs = _.orderBy(docs, ['updatedAt'], ['desc']);
                        self.docs = docs;
                    });
                }
            },
            layout(i) {
                var id = this.$configs.get('id');
                if (!id) {
                    return
                }
                var i = i.trim()
                if (i) {
                    var layout = i.split(";")
                } else {
                    this.$message(
                        'Err; Specify the layout please by: #layout title; notes about the article; conclusion');
                    return
                }
                Emad.docBatch(id, 'layout', layout)
                EventBus.$emit('updateEditor', '');
            },
            checkTag(e) {
                if (this.$configs.get('id') && this.input) {
                    var tag = this.tags[0];
                    console.log(tag)
                    if (!tag) return;
                    this.input = tag + ' ';
                    console.log(this.tags)
                    this.tags = '';
                }
            },
            close() {
                let w = remote.getCurrentWindow()
                w.close()
            },
            fullScreen(v) {
                remote.getCurrentWindow().setFullScreen(v)
            },
            /**
             * Command Parser
             */
            submitNote(e) {
                var self = this;
                if (event.key == "Enter" && this.input) {
                    var input = self.input.trim()
                    // Command Parser
                    var command = App.commandParse(input)
                    if (command && command.command) {
                        this[command.command](command.param);
                        this.input = ''
                    }
                    var id = this.$configs.get('id')
                    console.log(id)
                    // IF ID 
                    var tags = App.getTags(this.input)
                    if (id && tags && tags.length) {
                        App.setTags(tags, this.$configs.get('id'))
                        App.metaSet(self.input, this.$configs.get('id'))
                        EventBus.$emit('updateEditor', 'hello');
                    }
                    //
                    if (id && !tags) {
                        EventBus.$emit('appendEditor', this.input);
                    }
                    //
                    if (!id) {
                        /**
                         * Add a new Note
                         */
                        //  self.$db.insert({
                        //     title: self.input,
                        //     content: self.input,
                        //     createdAt: new Date(),
                        //     updatedAt: new Date(),
                        //     notes:[],
                        //     cats: [],
                        //     tags: tags || []
                        // }, function (err, newDoc) {
                        //     // // App.setTags(tags, newDoc._id)
                        //     // App.metaSet(self.input, newDoc._id)
                        //     // self.id = newDoc._id
                        // });
                        var doc = {
                            title: self.input,
                            content: self.input,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            notes: [],
                            cats: [],
                            tags: tags || []
                        }
                        Emad.docNew(doc)
                    }
                    // EventBus.$emit('fetchDocs');
                    self.input = ''
                    self.fetch()
                }
            },
            logIt() {
                this.dialogVisible = true
            },
            focus() {
                this.$nextTick(() => this.$refs.commands.focus())
            },
            setView(view) {
                this.$router.push(view)
            },
            toggle(view) {
                this[view] = (this[view]) ? false : true;
                // this[view] != this[view]
            },
            clearInput(event) {
                this.$refs.commands.blur()
                this.input = ''
                this.tags = ''
            },
            fetch() {
                // console.log('note fetch')
                var self = this
                this.$db.notes.find({}, function (err, docs) {
                    if (docs.length > 0) {
                        self.count = docs.length
                    }
                    var docs = _.orderBy(docs, ['updatedAt'], ['desc']);
                    self.docs = docs;
                    self.input = ''
                    self.clearInput
                })
            },
            /**
             * Search Docs
             * */
            find(option) {
                var self = this;
                var regex = new RegExp(option, 'ig');
                this.$db.notes.find({
                    title: {
                        $regex: regex
                    }
                }, function (err, docs) {
                    if (docs && docs.length > 0) {
                        self.count = docs.length
                        var docs = _.orderBy(docs, ['updatedAt'], ['desc']);
                        self.docs = docs;
                    }
                })
            }
        },
        created() {},
        mounted() {
            var self = this;
            this.fetch()
            EventBus.$on('docRefresh', this.fetch)
            EventBus.$on('searchDocs',this.find)
            // EventBus.$emit('docRefresh');
            // 
            // EventBus.$emit('fetchDocs');
            self.input = ''
            // 
            // this.$mousetrap.bind(['command+k', 'ctrl+k'], this.logIt);
            this.$mousetrap.bind(['ctrl+f', 'command+f'], this.focus)
            /**
             * 
             * Focus Commands
             * 
             * */
            this.$mousetrap.bind(['ctrl+e', 'command+e'], function () {
                self.$refs.commands.blur()
            })
            /**
             * Main Editor
             * */
            this.$mousetrap.bind(['command+n', 'ctrl+n'], function (e) {
                self.setView('editor')
            })
            /**
             * Main View
             * */
            this.$mousetrap.bind(['command+]', 'ctrl+]'], function (e) {
                self.setView('/')
            })
            /**
             * Sidebar 
             */
            this.$mousetrap.bind(['ctrl+p', 'command+p'], function (e) {
                self.toggle('isSideOpen')
            })
            /**
             * Toggle Logger* WIP
             * */
            // this.$mousetrap.bind(['ctrl+m'], function (e) {
            //   self.toggle('isMetaOpen')
            // });
            /**
             * Toggle Search results
             * */
            this.$mousetrap.bind(['ctrl+[', 'command+['], function (e) {
                EventBus.$emit('toggle-meta', '');
            })
        }
    }
</script>
<style>
    .is-hidden {
        display: none;
    }

    .fixedFooter {
        padding: 5px;
        border-top: 1px solid #ccc;
        background: #fff;
        position: absolute;
        width: 100%;
        bottom: 100px;
        left: 0;
        z-index: 1009;
    }

    .el-input__inner {
        border-radius: 0px !important;
    }

    .command {
        border-radius: 0px;
    }

    html,
    body {
        overflow: hidden;
        scroll-behavior: smooth;
    }

    html {
        /* overflow: scroll; */
        overflow-y: hidden;
        overflow-x: hidden;
        /* position: fixed;  */
        scroll-behavior: smooth;
    }

    ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
        overflow-y: hidden;
        overflow-x: hidden;
        /* make scrollbar transparent */
    }

    .bg {
        background: #fff;
    }

    body {
        padding: 0;
        margin: 0;
        font-family: "Helvetica Neue", Helvetica;
        overflow-y: hidden;
        overflow-x: hidden;
        background: #fff;
        scroll-behavior: smooth;
    }

    .statusbar-shadow {
        width: 100%;
        height: 28px;
        position: fixed;
        bottom: 100px;
        z-index: 1009;
        padding: 10px;
        font-size: 13px;
        font-family: Arial, sans-serif;
        font-family: 'Open Sans', sans-serif;
    }

    /*  */
    .statusbar {
        width: 100%;
        height: 28px;
        position: fixed;
        bottom: 60px;
        z-index: 1009;
        padding: 10px;
        font-size: 13px;
        font-family: Arial, sans-serif;
        font-family: 'Open Sans', sans-serif;
        text-transform: uppercase;
    }

    /*  */
    .el-tag {
        margin: 3px 4px 2px;
        display: inline-block;
    }

    /*  */
    /*  */
    .meta-logger {
        width: 100%;
        display: block;
        height: auto;
        min-height: 40vh;
        position: fixed;
        right: 0;
        bottom: 60px;
        background-color: rgba(39, 39, 39, 0.8);
        z-index: 1009;
    }

    .meta-logger-content {
        width: 90%;
        margin-left: 40px;
        padding-left: 25px;
    }

    .sidebar {
        height: 100% !important;
    }

    #commands {
        z-index: 1100;
    }

    .is-hidden {
        display: none;
    }

    .sysButton {
        padding: 5px;
        font-size: 16px;
    }

    .is-sharp {
        border-radius: 0px;
    }

    .toolbar {
        display: block;
        width: 100%;
        height: 60px;
        z-index: 1004;
        line-height: 50px;
        background: #fff;
        padding-top: 5px;
        /* background-image: linear-gradient(top, red 0%, bottom 100%); */
    }

    .tools {
        width: 48%;
        display: block;
        float: left;
        padding: 5px;
        margin-right: 5px;
    }

    .appActions {
        width: 48%;
        text-align: right;
        float: right;
        padding-right: 10px;
    }

    .small {
        font-size: 12px !important;
    }

    .disable-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .disable-scroll {
        overflow: hidden;
    }
    .has-border-bt{
        border-bottom: 1px solid #eee;
        padding-bottom: 7px;
    }
    /* 
        editor-container
     */
     .editor-container{
         padding:10px;
     }
     .task{
         border: 1px solid #eee;
         padding:20px 10px 20px 20px;
     }
     .row-padding{
         padding-top: 5px;
     }
     .has-text-right{
         text-align: right;
     }
</style>