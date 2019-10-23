<template>
    <div class="bg" style="padding:30px;">
        <br />
        <!-- Help -->
        <el-divider content-position="left">
            <h3>Commands</h3>
        </el-divider>
        <br />
        <div>
            <el-card shadow="never" style="border-radius: 0px" v-for="(item,index) in commands" v-bind:key="index">
                <strong>{{item.name}}</strong> <br />
                <p>{{item.value}}
                    <br />
                    {{item.desc}}
                    <br />
                    <br />
                </p>
                <div>
                    <code class="code"> {{item.ex}}</code>
                </div>
            </el-card>
        </div>
        <br />

        <el-divider content-position="left">
            <h3>Shortcuts</h3>

        </el-divider>
        <br />

        <div>
            <el-card shadow="never" style="border-radius: 0px" v-for="(item,index) in shortcuts" v-bind:key="index">
                {{item.value}} : {{item.name}}
                <!-- <br /> {{item.ex}} -->
            </el-card>
        </div>
        <br />
        <!-- <el-divider content-position="left">
                    <h3>Import/ Export</h3>
                </el-divider>
                <div class="padded-30">Work in Progress</div>
                <br /> -->
        <!--  -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                commands: [{
                        value: '#{sideNote} note',
                        name: "Sidenotes",
                        desc: 'Adding Side note to keep track of documment',
                        ex: '#opensource The best open source software'
                    },
                    {
                        cvalue: '#set',
                        name: "Set note props",
                        desc: 'Quickly set document props',
                        ex: '#set status:draft'
                    },
                    {
                        value: '#tag',
                        name: "Document Tag",
                        desc: 'Tag a document for easy classification',
                        ex: '#tag opensource, linux, communication'
                    },
                    {
                        value: '#layout',
                        name: "Document Layout",
                        desc: 'Organize your document with a layout',
                        ex: '#layout introduction; companies; Open source VS Commercial; Conclusion'
                    },
                    {
                        value: '#find {keyword}',
                        name: "Search documents",
                        desc: 'Organize your document with a layout',
                        ex: '#layout introduction; companies; Open source VS Commercial; Conclusion'
                    },
                ],
                shortcuts: [{
                        value: 'CTRL+] / CMD+]',
                        name: "Docs list",
                        desc: 'Adding Side note to keep track of documment',
                        ex: '#opensource The best open source software'
                    },
                    {
                        value: 'CTRL+n / CMD+n',
                        name: "New Note",
                        desc: 'Adding Side note to keep track of documment',
                        ex: '#opensource The best open source software'
                    },

                    {
                        value: 'CTRL+[ / CMD+[',
                        name: "Toggle Doc's Meta",
                        desc: 'Adding Side note to keep track of documment',
                        ex: '#opensource The best open source software'
                    },

                    {
                        value: 'CTRL+p / CMD+p',
                        name: "Toggle Sidebar",
                        desc: 'Adding Side note to keep track of documment',
                        ex: '#opensource The best open source software'
                    },

                    {
                        value: 'CTRL+f / CMD+f',
                        name: "Focus commands",
                        desc: 'Adding Side note to keep track of documment',
                        ex: '#opensource The best open source software'
                    },
                ]
            }
        }
    }
</script>

<style>
    /* Style */

    .padded-30 {
        padding: 30px;
    }

    body {
        background: #eee;
    }

    code {
        background-color: rgba(27, 31, 35, .05);
        /* border-radius: 3px; */
        /* font-size: 85%; */
        margin: 40px 10px 30px 10px;
        padding: .2em .4em;
        padding: 10px;
    }

    /** 
 Keyboard
http://cssdeck.com/labs/apple-keyboard-via-css3
 */
</style>