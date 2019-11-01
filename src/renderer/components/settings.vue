<template>
    <div class="is-fh">
        <el-row :gutter="12">
            <el-col :span="24" style="padding:40px;">
               
                  <h3>Backup your Database</h3>
                  <br/>
                  Emad-Notes uses a flat-file database, You can copy them for backup, However, drag-and-drop new files or deleting the database files without a backup will result in deleting all notes.
                  <span>Please Backup the Database files first</span>
                  <br/>
                  <br/>
                <el-button @click="openDir()">Open Database Directory</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import path from 'path'
import { remote } from 'electron';
const {shell} = require('electron') 
  export default {
    data () {
      return {
      }
    },
    methods:{
      openDir(){
        shell.openItem(path.join(remote.app.getPath('userData'))+'/dbs/')
      }
    }
  }
</script>