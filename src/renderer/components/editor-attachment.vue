<template>
  <div class="attactments-editor">
    <!-- back to editor/ change View: attachment browser -->    
    <h4>  Attachments for: <strong>{{doc.title}}</strong><br /></h4>
    <div label="Activity form">
      <el-input type="textarea" v-model="attachment" @keyup.enter.native="attach" placeholder=" Add URLS, Text and use #hashtags"></el-input>
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
      }
    },
    mounted() {},
    created() {}
  }
</script>