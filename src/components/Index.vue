<template>
  <div class="outbox">
    <div>
      <!-- <el-row>
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-purple">
                <el-tabs v-model="activeName" type= "border-card">
                  <el-tab-pane label="介绍" name="first">内部使用，不开放对应页面</el-tab-pane>
                  <el-tab-pane label="FAQ" name="second">内部使用，不开放对应页面</el-tab-pane>
                  <el-tab-pane label="建议箱" name="third">内部使用，不开放对应页面</el-tab-pane>
                </el-tabs>
          </div>
        </el-col>
      </el-row> -->
    </div>

      <div style="margin:15px 0"> 
      <span v-if = username  >你好,{{username}} ！</span>
      <span v-else @click="dialogVisible = true,this.useralert = false" > <el-link  type="primary">点此登录账号</el-link></span>
      还有<span style="color:blue">{{unlabled}}</span>张图片就完成标注了！！
    </div> 

        <div :class="outerClass">
          <pic-block v-for="(item,i) in piclist" :key="i" :thumbnail="BASEURL+item['thumbnail']" :original="BASEURL+item['original']" :id="item['id']"/>
      </div>
    <el-dialog
      title= "填写名字"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-row v-if="useralert">
            <el-col :span="20" :offset="2">
              <el-alert
                :closable="false"
                title="不存在这样的用户"
                type="error">
              </el-alert>
          </el-col>
      </el-row>

    <el-row >
          <el-col :span="20" :offset="2">
          <span style="float:left">输入你的账号，你的打分行为将会被记录。</span> 
        </el-col>
        
        <el-col :span="20" :offset="2">
          <el-input  v-model="usernameSet" placeholder="请输入账号" style="margin-top: 20px"></el-input>
        </el-col>
    </el-row>
      <el-row>
        <el-col :span="3" :offset="20">
            <el-button type="primary" style="margin-top:20px;float:right " @click="writeName(usernameSet)">确认</el-button>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>
<script>
//想尝试让所有的block都打开同一个dialog
import PicBlock from "@/components/PicBlock";
import {cookieToJson,writeCookie} from "@/api/util.js";

export default {
  components: { PicBlock },
  name: "Index",
  data() {
    return {
      number:10,
      BASEURL:this.$baseurl,
      piclist:[
      ],
      activeName: 'first',
      dialogVisible: false,
      windowHight: document.documentElement.clientHeight,
      windowWidth: document.documentElement.clientWidth,
      outerClass: undefined,
      unlabled:undefined,
      username:undefined,
      usernameSet:undefined,
      useralert: false
    };
  },
  methods:{
    writeName(name){
      //首先需要先检查数据库里面是否有对应的名字。
      //如果检查不到，就要弹出动画系TODO
      // this.$http.post('')
      this.$http.post('checkusername',{"username":this.usernameSet}).then((res) => {
        console.log("-----------------------------------------------")
        console.log(res.data)
        if (res.data == 1) {
          writeCookie("username",this.usernameSet,10000000)
          this.username = this.usernameSet
          this.dialogVisible = false
          
        }
        else{
          this.username = undefined
          this.usernameSet = undefined
          document.cookie = "username="
          this.useralert = true
        }
      })
      writeCookie("username",name,10000000)
    }
  },
  created:function(){
    //要在这里先设置cookie? 如果没有cookie,就重定向到check里面
    // this.$http.get('checkcookie').then((res)=>{
    //   if (res.status == 200) console.log("密码正确")
    // }).catch((error)=>{
    //   this.$router.push("check")
    // })
    //TODO: username这部分还没有完全做好，比如说退出登录，检查是否有对应名字什么的，可能要用到el的右上角弹窗。下面的代码也没测试
    // console.log(document.cookie)
    let cookieObj = cookieToJson(document.cookie)
    // console.log("-----------------------------------------------")
    // console.log(cookieObj["username"])
    this.username = cookieObj["username"]
    
    this.usernameSet = this.username
    //下面要检查username是不是正确的,如果没有就要清除
    if (this.username != undefined) {
      this.$http.post('checkusername',{"username":this.username}).then((res) => {
        console.log("-----------------------------------------------")
        console.log(res.data)
        if (res.data != 1) {
          this.username = undefined
          document.cookie = "username="
        }
      }

      )
    }
    let width = document.documentElement.clientWidth;
    if(width<=626) this.outerClass="outer-1",this.number = 10
    else if(width<=990) this.outerClass="outer-2",this.number = 12
    else if(width<=1316) this.outerClass="outer-3",this.number = 12
    else if(width<=1630) this.outerClass="outer-4",this.number = 12
    else this.outerClass="outer-5",this.number = 15
  },
  mounted: function () {
    


    this.$http.post('getpic', {number:this.number}).then((res) => {
      this.piclist=res.data
    })
    this.$http.get('getunlabled').then((res) => {
      this.unlabled=res.data["unlabled"]
    })
    window.onresize =() =>{
        let width = document.documentElement.clientWidth;
        // console.log(width)
        if(width<=626) this.outerClass="outer-1"
        else if(width<=990) this.outerClass="outer-2"
        else if(width<=1316) this.outerClass="outer-3"
        else if(width<=1630) this.outerClass="outer-4"
        else this.outerClass="outer-5"
    };
    
  }


};
//250单个，544 2个 ，一个272 
</script>
<style>

  .outbox{
    height:300px;
    margin-left:8%;
    margin-right: 8%;
  }
  .picblock-1{
    margin: 0 auto; 
  }
  .outer-1{
    margin: 0 auto;
    width: 272px;
    height: 500px
  }
  .outer-2{
    margin: 0 auto;
    width: 544px;
    height: 500px
  }
  .outer-3{
    margin: 0 auto;
    width: 816px;
    height: 500px
  }
  .outer-4{
    margin: 0 auto;
    width: 1088px;
    height: 500px
  }
  .outer-5{
    margin: 0 auto;
    width: 1360px;
    height: 500px
  }
 
.inner{ /*这里我设置了两个浮动元素*/
    float: left;
    width: 200px;
    height: 200px;
    background-color: #000;
}
</style>