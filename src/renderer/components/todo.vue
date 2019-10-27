<template>
  <div class="attactments-editor">
    <!-- Navigation -->
    <el-row>
      <el-col :span="6">
        <el-button size="small" round>Editor</el-button>
        <el-button size="small" round>Writer mode</el-button>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!-- back to editor/ change View: attachment browser -->
    <el-divider content-position="left">
      <i class="el-icon-price-tag"></i>
      Tags
    </el-divider>
    <!-- Tags -->
    <div>
      <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini"
        @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" style="width:100px;">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <el-divider content-position="left">
      <i class="el-icon-paperclip"></i>
      Attachments
    </el-divider>
    <!-- FORM* input (Text/ Data)-->
    <div label="Activity form">
      <br />
      <el-input type="textarea"></el-input>
      <br /> <br />
    </div>
    <!-- Attachments -->
    <el-divider content-position="left">
      <i class="el-icon-wallet"></i>
      <!--  -->
      <el-button size="small" round>Tasks</el-button>
      <el-button size="small" round>Attachments</el-button>
      <el-button size="small" round>Notes</el-button>
      <el-button size="small" round>Layout</el-button>
      <el-button size="small" round>Memos</el-button>
    </el-divider>
    <el-row v-for="o in 10" :key="o">
      <el-divider content-position="left">
        TIME
      </el-divider>
      <el-col :span="18">
        <p>
          A lightweight comments widget built on GitHub issues. Use GitHub issues for blog comments, wiki pages and
          more!
        </p>
      </el-col>
      <el-col :span="6">
        <p class="" style="text-align:right;">
        <i class="el-icon-edit"></i>
        <i class="el-icon-mobile"></i>
        </p>
      </el-col>
    </el-row>
    <!-- Notes -->
    <br />
    <br />
    <br />
  </div>
</template>
<script>
  export default {
    props: [],
    data() {
      return {
        dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
        inputVisible: false,
        inputValue: ''
      }
    },
    watch: {
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    mounted() {
    },
    created() {
    }
  }
</script>
<style>
  .attactments-editor {
    padding: 20px 30px;
    overflow-y: scroll;
  }
</style>