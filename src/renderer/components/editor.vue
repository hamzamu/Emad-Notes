<template>
    <div class="containerx content">
        <!-- <div class="editor" contenteditable="contenteditable" @input="updateInput" v-html="content">
        </div> -->
        <div class="editor">
        <contenteditable tag="div" :contenteditable="isEditable" v-model="content" :noNL="false"  @input="updateInput" />
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';

    export default {
        data() {
            return {
                session: '',
                note: null,
                id: '',
                mode: '',
                preview: '',
                content: '',
                isEditable: true,
            }
        },
        methods: {
            updateInput() {
                var self = this;
                //   this.$emit('input', this.content)
                // this.content = this.$el.innerText;
                var content = this.$el.innerText;
                var title = content.substring(0, 30)
                if (!this.id) {
                    this.$db.insert({
                        title: title,
                        content: content,
                        createdAt: new Date()
                    }, function (err, newDoc) {
                        self.id = newDoc._id
                    });
                } else {
                    this.$db.update({
                        _id: this.id
                    }, {
                        $set: {
                            title: title,
                            content: self.content
                        }
                    }, function () {});
                }
            }
        },
        created() {
            var self = this;
            // console.log(this.$configs.get('id'))
            self.id = this.$configs.get('id');
            if (this.$configs.get('id')) {
                this.$db.findOne({
                    _id: this.$configs.get('id')
                }, function (err, doc) {
                    self.content = doc.content
                    self.note = doc
                });
            }
        }
    }
</script>
<style>
    .container {
        position: relative;
    }

    .editor {
        padding: 20px;
        /* border: 1px solid #eee; */
        height: 100vh;
        color: #323232;
        font-size: 15px;
        border: 0px solid #ddd;
    }
    [contenteditable="true"],
    [contenteditable="true"]:active,
    [contenteditable="true"]:focus {
        border: none;
        outline: none;
        white-space: pre;
        white-space:pre-line;
    }
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 35px;
        background: #333;
        padding: 10px;
    }
</style>