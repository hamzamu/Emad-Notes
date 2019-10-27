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

    {{doc}}
    <el-divider content-position="left">
      <i class="el-icon-price-tag"></i>
      Tags
    </el-divider>
    <!-- Tags -->


      <div>
        <h4>Tags</h4>
        <el-tag :key="tag" v-for="tag in doc.cats" closable :disable-transitions="false" @close="tagRemote(tag)">
          {{tag}}
        </el-tag>
        <!--  -->
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" style="width:120px;">
        </el-input>
        <!--  -->
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
        </el-button>
        <el-divider></el-divider>
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
    import _ from 'lodash';
    import axios from 'axios';
    import marked from 'marked';
    import {
        EventBus
    } from '../eventBus.js'
    import {
        App
    } from '../app.engine.js'
    import {
        Emad
    } from '../app.emad.js'
    const {
        remote
    } = require('electron');
    const { clipboard } = require('electron')
  export default {
    props: ['cats', 'tags', 'doc','id'],
    data() {
      return {
                inputVisible: false,
                inputValue: '',
      }
    },
    watch: {},
    methods: {
      tagRemote(tag) {
        var self= this;
        // this.cats.splice(this.cats.indexOf(tag), 1);
        this.$db.update({
          _id: self.doc._id
        }, {
          $pull: {
            cats: tag
          }
        }, {}, function () {});

         EventBus.$emit('fetchDoc',this.doc._id)
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
         console.log('tag',inputValue,this.doc._id)
        Emad.docBatch(this.doc._id, 'cats', [inputValue])
        this.inputVisible = false;
        this.inputValue = '';
        // this.fetch()
        EventBus.$emit('fetchDoc',this.doc._id)
      }
    },
    mounted() {},
    created() {

    }
  }
</script>
<style>
  .attactments-editor {
    padding: 20px 30px;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
</style>