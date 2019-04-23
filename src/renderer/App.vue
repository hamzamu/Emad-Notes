<template>
  <el-container style="height:100vh; border: 0px solid #eee;padding:0;margin:0;" id="app">
    <el-aside width="65px">
      <el-menu style="height:100vh;background-color: rgba(255,255,245,.5);" class="sidebar">
        <el-menu-item index="1" @click="$router.push('/')">
          <i class="el-icon-tickets"></i>
          <!-- <span>Notes</span> -->
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('tags')">
          <i class="el-icon-news"></i>
          <!-- <span>Tags</span> -->
        </el-menu-item>
        <el-menu-item index="3" @click="$router.push('search')">
          <i class="el-icon-search"></i>
          <!-- <span>Search</span> -->
        </el-menu-item>
        <el-menu-item index="3" @click="$router.push('settings')">
          <i class="el-icon-setting"></i>
          <!-- <span>Settings</span> -->
        </el-menu-item>
        <!--  -->
        <el-menu-item index="3" @click="close()" class="is-hiddenx">
          <i class="el-icon-close"></i>
          <!-- <span>Close</span> -->
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <div style="text-align: right; font-size: 12px; padding:0px 10px 0 10px;border-bottom:1px solid #fff;">
        <i class="el-icon-caret-top sysButton" @click="fullScreen(true)"></i>
        <i class="el-icon-caret-bottom sysButton" @click="fullScreen(false)"></i>
        <i class="el-icon-close sysButton" @click="close()"></i>
      </div>
      <el-header style="text-align: right; font-size: 12px; padding:0px 0px 0 0;" class="is-hidden">

        <i class="el-icon-caret-top" @click="fullScreen(true)"></i>
        <i class="el-icon-caret-bottom" @click="fullScreen(false)"></i>
        <i class="el-icon-close" @click="close()"></i>

      </el-header>
      <el-main style="padding:0;margin:0px;">
        <router-view></router-view>
      </el-main>
      <el-footer style="padding:5px;">
        <el-input placeholder="Commands" v-model="input" style="width:100%;"></el-input>
      </el-footer>
    </el-container>
  </el-container>
  <!-- <div id="app">
    <router-view></router-view>
  </div> -->
</template>
<script>
  import {
    remote
  } from 'electron'

  export default {
    name: 'dent-emr',
    data() {
      return {
        test: 'null'
      }
    },
    methods: {
      close() {
        let w = remote.getCurrentWindow()
        w.close()
      },
      fullScreen(v) {
        remote.getCurrentWindow().setFullScreen(v)
      }
    },
    created() {
      this.$db.insert({
        name: "fender jazz bass",
        year: 1977
      })
    },
    mounted() {
      // this.test = JSON.parse(this.$db)
      // console.log(this.$db)
      var self = this
      this.$db.find({year : 1977}, function (err,docs){ self.test = docs })
    }
  }
</script>
<style>
  body {
    padding: 0;
    margin: 0;
    font-family: "Helvetica Neue", Helvetica;
  }

  .sidebar {
    height: 100% !important;
  }

  .is-hidden {
    display: none;
  }

  .sysButton {
    padding: 5px;
    font-size: 16px;
  }

  .is-sharp {
    border-radius: 0px;
  }
</style>