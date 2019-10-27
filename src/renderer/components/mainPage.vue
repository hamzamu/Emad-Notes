<template>
    <div class="bg is-fh disable-scrollx" style="background:#FFF;">
        <el-row :gutter="12" class="is-fh disable-selectx disable-scroll">
            <!-- <div v-if="count == ''">No Posts {{count}}</div> -->
            <!-- List -->
            <el-col :span="5" class="has-sidebar disable-select is-list" style="padding:0;">
                <el-row :gutter="12" class="is-sharp boxed " v-for="(i,index) in docs" v-bind:key="index">
                    <!-- <span class="float:right;">
                        <el-switch v-model="i.selected" @click.native="selected = i._id"></el-switch>
                    </span> -->
                    <!--  -->
                    <!-- Actions WIP width:120px;padding:0px 0 5px 0;-->
                    <!-- <div style="float:right;text-align:center;width:120px;padding:5px 0 5px 0;">
                        <small>Status: draft</small> <br />
                        <el-progress style="margin-top:10px;" color="#8e71c7" :show-text="false" :text-inside="false"
                            :stroke-width="10" :percentage="43">
                        </el-progress>
                    </div> -->
                    <!--  -->
                    <el-col :span="12" class="notes-list">
                     
                       <i class="el-icon-star-on" v-show="i.pinned"></i>
                        <!-- <a @click="setNote(i._id)">{{i.title}}</a> -->
                         <a @click="viewNote(i._id)">{{i.title}}</a>
                        <!-- <p>{{i.content}}</p> -->
                       
 
                        <br />
                    
                        <small @click="setNote(i._id)">{{ i.createdAt | moment("from", "now") }}</small>
                    </el-col>

                    <!-- <el-col :span="12" style="float:right;text-align:right;">
                        <el-button @click="viewNote(i._id)" icon="el-icon-edit" type="text" circle></el-button>
                        <el-button type="text" @click="pin(i._id,i.pinned)" icon="el-icon-check" circle></el-button>
                        <el-button type="text" @click="remove(i._id)" icon="el-icon-delete" circle></el-button>
                    </el-col> -->

                </el-row>
            </el-col>
            <!-- Editor -->
            <el-col :span="19" class="is-list" style="">
                <!-- <editor></editor> -->
                <todo></todo>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {
        EventBus
    } from '../eventBus.js'
    import _ from 'lodash';
    import Editor from './editor-comp'
    import Todo from './todo'
    export default {
        name: 'list',
        props: ['docs', 'config', 'input'],
        components: {
            Editor, Todo
        },
        // props:['config','input'],
        data() {
            return {
                // docs: "",
                count: 'loading..',
                notes: null,
                selected: ''
            }
        },
        watch: {
        },
        computed: {},
        methods: {
            fetch() {
                // var self = this
                // this.$db.find({}, function (err, docs) {
                //     if (docs.length > 0) {
                //         self.count = docs.length
                //     }
                //     var docs = _.orderBy(docs, ['updatedAt'], ['desc']);
                //     //self.notes = docs;
                //     self.docs = docs;
                // })
            },
            remove(id) {
                this.$db.remove({
                    _id: id
                }, function (err) {});
                this.fetch()
                // EventBus.$on('fetchDocs', this.fetch)
                EventBus.$emit('docRefresh');
            },
            pin(id, v) {
                var v = (v) ? false : true;
                this.$db.update({
                    _id: id
                }, {
                    $set: {
                        pinned: v
                    }
                }, function (err) {});
                EventBus.$emit('docRefresh');
            },
            setNote(id) {
                this.$configs.set('id', id)
                this.$router.push('editor')
            },
            viewNote(id){
                this.$configs.set('id', id)
                EventBus.$emit('getNote', id);
            }
        },
        created() {
            this.$configs.set('id', '')
            // this.$db.remove({}, { multi: true }, function (err, numRemoved) {
            // });
        },
        mounted() {
            EventBus.$on('fetchDocs', this.fetch)
            this.fetch()
        }
    }
</script>


<style>
    .bgx {
        background: #eee;
    }
    .is-list {
        overflow-y: scroll;
        height: 100vh;
        position: relative;
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
    .notes-list{
        padding: 0 5px 0 10px !important;
    }
</style>