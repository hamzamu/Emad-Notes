<template>
    <div class="editor-box">
        <div class="editor-content">

        <!-- {{id}} -->

        {{note.content}}
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
        data() {
            return {
                id:"",
                note:''
            }
        },
        watch:{
        
        },
        computed:{
            // id(){
            //     var id = this.$configs.get('id')
            //     return  id
            // }
        },
        methods:{
            fetch(){
                this.id = this.$configs.get('id')
                var self = this;
                if (this.$configs.get('id')) {
                    this.$db.findOne({
                        _id: this.$configs.get('id')
                    }, function (err, doc) {
                        self.content = doc.content
                        self.tags = doc.tags
                        self.props = doc.props
                        self.meta = {
                            createdAt: doc.createdAt,
                            updatedAt: doc.updatedAt
                        }
                        self.cats = doc.cats;
                        self.att = doc.meta;
                        self.layout = doc.layout;
                        self.note = doc;
                        self.notes = doc.notes;
                    });
                }                
            }
        },
        created(){

        },
        mounted(){
            EventBus.$on('getNote', this.fetch);
        }
    }
</script>

<style>
.editor-box{
    height: 100vh;
    width: 100%;
        overflow-y: scroll !important;
     overflow: auto;
    /* background: #000; */
    /* border: 1px solid #eee; */
    /* background:#eee; */
}
.editor-content{
    padding:20px 40px;
    line-height:2.1em;
    overflow-y: scroll !important;
     overflow: auto;
     color:#222;
     font-size: 110%
}
</style>