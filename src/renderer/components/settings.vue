<template>
    <div>
        <el-row :gutter="12">
            <el-col :span="24" style="padding:40px;">
                <el-input placeholder="Passkey" v-model="input" style="width:400px;"></el-input>
                <br/>
                <br/>
                <el-switch v-model="value1" active-text="Pay by month" inactive-text="Pay by year">
                </el-switch>
                <br/>
                <br/>
                <el-switch v-model="value2"  active-text="Pay by month" inactive-text="Pay by year" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
                <br/>
                <br/>
                <el-button>Save</el-button>
            </el-col>
        </el-row>
    </div>
</template>


<script>
  export default {
    data () {
      return {
        value1: true,
        value2: true
      }
    }
  }
</script>