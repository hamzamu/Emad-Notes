<template>
    <div>
        <el-row :gutter="12">
            <!-- {{notes}} -->
            <el-col :span="24" v-for="(i,index) in notes" v-bind:key="index">
                <div v-if="count == '0'">No Posts</div>
                <el-card  class="is-sharp">
                    <div style="float:right;text-align:center;width:100px;padding:5px 0 5px 0;">
                        <small>Status: xdraft</small> <br />
                        <el-progress style="margin-top:10px;" color="#8e71c7" :show-text="false" :text-inside="false"
                            :stroke-width="10" :percentage="43">
                        </el-progress>
                    </div>
                    <a @click="setNote(i._id)">{{i.title}}</a>
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
        margin:0px !important;
        border:0px auto;
        box-shadow:none;
    }
</style>
<script>
    export default {
        data() {
            return {
                count: 1,
                notes: null
            }
        },
        methods: {
            setNote(id) {
                // console.log(id)
                // this.$note = 'id'
                this.$configs.set('id', id)
                this.$router.push('editor')
            }
        },
        created() {

// this.$db.remove({}, { multi: true }, function (err, numRemoved) {
// });

        },
        mounted() {
            var self = this
            this.$db.find({}, function (err, docs) {
                self.notes = docs;
                if(docs.length == 0){
                    self.count = 0
                }
            })
        }
    }
</script>