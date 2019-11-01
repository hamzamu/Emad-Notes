<template>

    <div class="editor-box" style="">
        <!--  -->
        <div class="statusbar">
            <div class="tag-group">
                <el-tag size="small" effect="plain"><b>Words:</b> {{count.words}}</el-tag>
                <el-tag size="small" effect="plain"><b>Sentences:</b>{{count.sentences}}</el-tag>
                <el-tag size="small" effect="plain"><b>Paragraphs:</b> {{count.paragraphs}}</el-tag>
                <el-tag size="small" effect="plain"><b>Caracters:</b> {{count.characters}}</el-tag>
            </div>
        </div>
        <!--  -->
        <div class="has-border-bt padding-5">
            <!-- <h2>{{doc.title}}</h2> -->
            <el-tag :key="tag" v-for="tag in doc.tags" closable :disable-transitions="true" @close="tagRemote(tag)">
                {{tag}}
            </el-tag>
            <!--  -->
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" style="width:120px;">
            </el-input>
            <!--  -->
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
            </el-button>
        </div>
        <div class="editor-content">
            <vue-countable :text="content" :elementId="'editorBox'" @change="change"></vue-countable>
            <contenteditable id="editorBox editable" ref="editor" tag="div" :contenteditable="isEditable"
                v-model="content" :noNL="false" @input="editorUpdate" @keydown.esc.native="exit" />
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
        props: ['doc', 'id'],
        data() {
            return {
                inputVisible: false,
                inputValue: '',
                note: '',
                content: '',
                isEditable: true,
                count: '',
            }
        },
        watch: {
            doc: function () {
                if (!this.doc) {
                    this.content = "New note"
                    this.focus()
                }
            },
            id() {
                if (this.id) {
                    this.content = this.doc.content
                    this.focus()
                }
            }
        },
        computed: {},
        methods: {
            change(e) {
                this.count = e;
            },
            focus() {
                // this.$nextTick(() => {
                //     this.$refs.editor.$el.focus()
                //     document.execCommand('selectAll', false, null);
                //     document.getSelection().collapseToEnd();
                // });
            },
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
            },
            tagRemote(tag) {
                var self = this;
                this.$db.notes.update({
                    _id: self.doc._id
                }, {
                    $pull: {
                        tags: tag
                    }
                }, {}, function () {});
                EventBus.$emit('fetchDoc', this.doc._id)
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
                Emad.docBatch(this.doc._id, 'tags', [inputValue])
                this.inputVisible = false;
                this.inputValue = '';
                EventBus.$emit('fetchDoc', this.doc._id)
            },
        },
        created() {},
        mounted() {}
    }
</script>
<style>
</style>