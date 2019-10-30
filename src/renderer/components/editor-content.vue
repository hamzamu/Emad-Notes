<template>
    <div class="editor-box" style="">
        <div class="editor-content">
            <!-- {{doc}} -->
            <contenteditable id="editorBox" ref="editor" tag="div" :contenteditable="isEditable" v-model="content"
                :noNL="false" @input="editorUpdate" @keydown.esc.native="exit" />
        </div>
    </div>
</template>
<script>
    import {
        App
    } from '../app.engine.js'
    import {
        Emad
    } from '../app.emad.js'
    import {
        EventBus
    } from '../eventBus.js'
    export default {
        props: ['doc'],
        data() {
            return {
                note: '',
                content: '',
                isEditable: true,
                id: ''
            }
        },
        watch: {
            content: function () {
                // console.log('content', this.content)
            },
            doc: function () {
                if (this.doc) {
                    this.content = this.doc.content
                    this.id = this.doc._id
                } else {
                    this.content = ""
                    this.id = ""
                }
            }
        },
        computed: {},
        methods: {
            editorUpdate() {
                // console.log('editorUpdate',this.id)
                var content = this.content;
                // var title = this.content.substring(0, 30);
                var title = this.content.split('\n')[0].trim()
                var subtitle = this.content.substring(0, 50).trim();
                if(title && subtitle){
                }
                var data =  {
                        content: content.trim(),
                        title: title,
                        subtitle: subtitle
                    }
                if (this.id) {
                    Emad.noteUpdate(this.id,data);
                } else {
                    data.updatedAt = new Date()
                    data.createdAt = new Date()
                    this.$db.notes.insert(data,(err,doc)=>{
                        console.log('new id',doc._id)
                        this.id = doc._id
                    })
                }
                // mainPage
                EventBus.$emit('setDoc', this.id)
                // App
                EventBus.$emit('docRefresh');
            }
        },
        created() {},
        mounted() {
        }
    }
</script>
<style>
    /*  */
    .editor-box {
        height: 95vh;
        /* min-height: 100%; */
        /* height: auto; */
        width: 100%;
        overflow-y: scroll !important;
        overflow: auto;
        /* background: #000; */
        /* border: 1px solid #eee; */
        /* background:#eee; */
    }
    .editor-content {
        width: 95%;
        /* padding: 20px 40px 20px 30px; */
        line-height: 2.1em;
        overflow-y: scroll !important;
        overflow: auto;
        color: #222;
        font-size: 90%;
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
</style>