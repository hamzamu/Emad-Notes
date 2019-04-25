<template>
    <div class="container">
        <div class="editor" contenteditable="contenteditable" @input="updateInput">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                note: null
            }
        },
        methods: {
            updateInput() {
                //   this.$emit('input', this.content)
                if (this.$configs.get('id')) {
                    console.log(this.$el.innerText)
                }else{
                    // Init Post
                }
                // if No ID create New and return the ID. 

                // Submit ton the ID.
                
            }
        },
        created() {
            var self = this;
            // console.log(this.$configs.get('id'))
            if (this.$configs.get('id')) {
                this.$db.findOne({
                    _id: this.$configs.get('id')
                }, function (err, doc) {
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
        padding: 10px;
        border: 1px solid #eee;
        height: 100%;
        color: #666;
        font-size: 15px;
    }

    [contenteditable="true"],
    [contenteditable="true"]:active,
    [contenteditable="true"]:focus {
        border: none;
        outline: none;
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