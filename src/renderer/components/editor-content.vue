<template>
    <div class="editor-box" style="">
        <div class="editor-content">
            {{id}}
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
        props: ['doc','id'],
        data() {
            return {
                note: '',
                content: '',
                isEditable: true,
             
            }
        },
        watch: {
            doc: function () {
                if (!this.doc) {
                    this.content = "New note"
                }
            },
            id(){
                if(this.id){
                    this.content = this.doc.content
                }
            }
        },
        computed: {
        },
        methods: {
            editorUpdate() {
                var content = this.content;
                var title = this.content.split('\n')[0].trim()
                var subtitle = this.content.substring(0, 50).trim();
                if (title && subtitle) {}
                var data = {
                    content: content.trim(),
                    title: title,
                    subtitle: subtitle
                }
                if (this.id) {
                    Emad.noteUpdate(this.id, data);
                } else {
                    data.updatedAt = new Date()
                    data.createdAt = new Date()
                    data.currentView = 'editor';
                    this.$db.notes.insert(data, (err, doc) => {
                        EventBus.$emit('fetchDoc', doc._id)
                    })
                }
                // Refresh All Notes.
                EventBus.$emit('docRefresh');
            }
        },
        created() {
             

        },
        mounted() {

           
            
        }
    }
</script>
<style>

</style>