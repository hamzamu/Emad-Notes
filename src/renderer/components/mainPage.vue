<template>
    <div>
        <el-row :gutter="12">
            <div v-if="count == ''">No Posts {{count}}</div>
            <el-col :span="24" v-for="(i,index) in docs" v-bind:key="index">
                <el-card class="is-sharp" shadow="never">
                    <!-- <span class="float:right;">
                        <el-switch v-model="i.selected" @click.native="selected = i._id"></el-switch>
                    </span> -->
                    <!--  -->
                    <div style="float:right;text-align:center;width:220px;padding:5px 0 5px 0;">
                        <el-button @click="remove(i._id)" icon="el-icon-edit" type="success" circle></el-button>
                        <el-button @click="remove(i._id)" icon="el-icon-check" type="primary" circle></el-button>
                        <el-button @click="remove(i._id)" icon="el-icon-delete" type="danger" circle></el-button>
                    </div>
                    <div style="float:right;text-align:center;width:120px;padding:5px 0 5px 0;">
                        <small>Status: draft</small> <br />
                        <el-progress style="margin-top:10px;" color="#8e71c7" :show-text="false" :text-inside="false"
                            :stroke-width="10" :percentage="43">
                        </el-progress>
                    </div>
                    <a @click="setNote(i._id)">{{i.title}}</a><br />
                    <!-- <p>{{i.content}}</p> -->

                    <!-- <router-link to="editor" style="text-decoration:none;">{{i.name}}</router-link> <br /> -->
                    <small @click="setNote(i._id)">{{i.date}}</small>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
    .is-sharp {
        border-radius: 0px;
        margin: 0px !important;
        border: 0px auto;
        box-shadow: none;
    }
</style>
<script>
    import {
        EventBus
    } from '../eventBus.js'
    import _ from 'lodash';
    export default {
        name: 'list',
        props:['docs','config','input'],
        data() {
            return {
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
            },
            archive() {

            },
            setNote(id) {
                this.$configs.set('id', id)
                this.$router.push('editor')
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