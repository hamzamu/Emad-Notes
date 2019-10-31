<template>
    <div class="editor-container">
        <!-- <p>Tasks
        </p> -->
        <br />
        <!-- <div v-if=" ">
            There is no tasks.
        </div> -->
        <el-row v-for="(task, i) in tasks" v-bind:key="i" class="task">
            <el-col :span="12">

                <i v-if="!task.checked" class="el-icon-circle-check"
                    @click="taskSet(task._id,{checked:true,updatedAt: new Date()})"
                    style="font-size:20px; margin:8px 4px 0 4px;"></i>


                <span :class="{'is-checked-task' : task.checked == true}">{{task.text}}</span><br />
               
                <span
                    style="margin:20px 10px; padding:10px;"><strong><small>{{ task.createdAt | moment("from", "now") }}</small></strong></span>
            </el-col>
            <el-col :span="6" class="row-padding">
            </el-col>
            <el-col :span="6" class="row-padding has-text-right" style="padding:10px 10px 0 10px;">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete" @click="taskRm(task._id)"></i>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import _ from 'lodash'
    import {
        EventBus
    } from '../eventBus.js'
    import {
        App
    } from '../app.engine.js'
    import {
        Emad
    } from '../app.emad.js'
    export default {
        props: ['doc', 'id'],
        data() {
            return {
                tasks: ''
            }
        },
        computed: {
        },
        watch: {
            doc() {
                if (this.doc._id) {
                    this.fetchTasks()
                }else{
                    this.tasks = ''
                }
            },
        },
        methods: {
            fetchTasks() {
                var self = this;
                self.$db.attach.find({
                    doc: this.doc._id,
                    isTask: true
                }, (err, docs) => {
                    var docs = _.orderBy(docs, ['checked','updatedAt'], ['desc']);
                    self.tasks = docs
                })
            },
            taskRm(id) {
                Emad.attachRemove(id)
                EventBus.$emit('fetchDoc', this.doc._id)
            },
            taskSet(id, data) {
                console.log(id, data)
                Emad.attachUpdate(id,data)
                EventBus.$emit('fetchDoc', this.doc._id)
            }
        },
        created() {
        }
    }
</script>
<style>
.is-checked-task{
    font-style: oblique;
      text-decoration: line-through;
    color: #888;
}
</style>