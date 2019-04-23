<template>
    <div>
        <el-row :gutter="12">
            <el-col :span="24" v-for="(i,index) in notes" v-bind:key="index">
                <el-card shadow="hover" class="is-sharp">
                    <div style="float:right;text-align:center;width:100px;padding:5px;">
                        <small>Status: xdraft</small> <br />
                        <el-progress style="margin-top:10px;" color="#8e71c7" :show-text="false" :text-inside="false"
                            :stroke-width="10" :percentage="43">
                        </el-progress>
                    </div>
                    <router-link to="editor" style="text-decoration:none;">{{i.name}}</router-link> <br />
                    <small>{{i.date}}</small>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
    .is-sharp {
        border-radius: 0px;
    }
</style>

<script>
export default {
    data () {
        return {
            notes : null
        }
    },
        created() {
      this.$db.insert({
        name: "fender jazz bass",
        date: 1977
      })
    },
    mounted() {

      var self = this
      this.$db.find({}, function (err,docs){ self.notes = docs })
    }
}
</script>
