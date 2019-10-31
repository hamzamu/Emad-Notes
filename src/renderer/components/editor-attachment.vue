<template>
  <div class="attactments-editor">
    <!-- back to editor/ change View: attachment browser -->
    Attachments for: <strong>{{doc.title}}</strong><br />
    <!-- Tags -->
    <div class="has-border-bt">
      <h4>Tags</h4>
      <el-tag :key="tag" v-for="tag in doc.cats" closable :disable-transitions="true" @close="tagRemote(tag)">
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
    <h4> Attachments</h4>
    <p>
      Add URLS, Text and use #hashtags
    </p>
    <div label="Activity form">
      <br />
      <el-input type="textarea" v-model="attachment" @keyup.enter.native="attach"></el-input>
      <br /> <br />
    </div>
    <!-- Attachments -->
    <!-- <el-divider content-position="left">
      <i class="el-icon-wallet"></i>
      <el-button size="small" round>Tasks</el-button>
      <el-button size="small" round>Attachments</el-button>
      <el-button size="small" round>Notes</el-button>
      <el-button size="small" round>Layout</el-button>
      <el-button size="small" round>Memos</el-button>
    </el-divider> -->
    <el-row :gutter="12">
      <el-col :span="8" v-for="(att, index) in attachs" :key="index" class="attach-box">
        <el-card shadow="hover" class="box-card" v-bind:style="{ backgroundImage: 'url(' + att.image + ')' }" style="">
          <div class="" style="text-align:right;overflow:hidden;">
            <strong style="float:left;">{{att.updatedAt | moment("from", "now")}}</strong>
            <i class="el-icon-edit"></i>
            <i class="el-icon-remove" @click="attachRemove(att._id)"></i>
          </div>
          <br />
          <p class="" style="padding:10px;background:#fff;">
            {{att.title}} <br />
            <!-- {{att.image}} -->
            {{att.text}}
          </p>
          <p>
            <el-tag v-for="(tag,index) in att.tags" v-bind:key="index">{{tag}}</el-tag>
          </p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 
    <el-row v-for="(att, index) in attachs" :key="index">
      <el-divider content-position="left">
        {{att.createdAt | moment("from", "now")}}
      </el-divider>
      <el-col :span="18">
        <p>
         {{att.text}}
        </p>
      </el-col>
      <el-col :span="6">
        <p class="" style="text-align:right;">
          <i class="el-icon-edit"></i>
          <i class="el-icon-remove" @click="attachRemove(att._id)"></i>
        </p>
      </el-col>
    </el-row> -->
    <!-- Notes -->
    <br />
    <br />
  </div>
</template>
<style>
  .attactments-editor {
    padding: 20px 30px;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }

  .attach-box {
    margin: 0 0 20px 0;
  }

  .box-card {
    height: 100% !important;
    min-height: 300px;
    max-height: 400px;
    overflow-y: scroll;
  }
</style>
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
  const {
    clipboard
  } = require('electron')
  export default {
    props: ['cats', 'tags', 'doc', 'id'],
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        attachment: '',
        attachs: ''
      }
    },
    watch: {
      doc() {
        if (this.doc._id) {
          this.attachmentsFetch(this.doc._id)
        }else{
          this.attachs = '';
        }
      }
    },
    methods: {
      /**
       * Fetch Attachments: 
       */
      attachmentsFetch(id) {
        var self = this;
        self.$db.attach.find({
          doc: id,
          $not: {
            isExtra: true
          }
        }, (err, docs) => {
          var docs = _.orderBy(docs, ['updatedAt'], ['desc']);
          self.attachs = docs
        })
      },
      attach() {
        if (event.key == "Enter" && this.attachment !== null) {
          var i = this.attachment.trim()
          Emad.attachInsert(this.doc._id, {
            text: i
          });
          Emad.noteUpdate(this.doc._id, {
            updatedAt: new Date()
          })
          this.attachmentsFetch()
          setTimeout(() => {
            this.attachmentsFetch()
          }, 2000)
          EventBus.$emit('docRefresh');
          this.attachment = ""
        }
      },
      attachRemove(id) {
        Emad.attachRemove(id)
        this.attachmentsFetch()
      },
      tagRemote(tag) {
        var self = this;
        // this.cats.splice(this.cats.indexOf(tag), 1);
        this.$db.notes.update({
          _id: self.doc._id
        }, {
          $pull: {
            cats: tag
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
        console.log('tag', inputValue, this.doc._id)
        Emad.docBatch(this.doc._id, 'cats', [inputValue])
        this.inputVisible = false;
        this.inputValue = '';
        EventBus.$emit('fetchDoc', this.doc._id)
      },
    },
    mounted() {},
    created() {}
  }
</script>