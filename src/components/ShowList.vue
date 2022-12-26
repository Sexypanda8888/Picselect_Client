<template>
  <div class="outbox">
    <div></div>
    <div style="margin: 15px 0">
      <span v-if="username">你好,{{ username }} ！</span>
      <span v-else @click="(dialogVisible = true), (this.useralert = false)">
        <el-link type="primary">点此登录账号</el-link></span
      >
      已经有<span style="color: blue">{{ record }}</span
      >张图片在该记录页面
    </div>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="选择日期"
      @change="getPicData"
      value-format="yyyy-MM-dd"
      >
    </el-date-picker>
    <div :class="outerClass">
      <pic-block
        v-for="(item, i) in piclist"
        :key="i"
        :thumbnail="$thumbhttp + item['thumbnail']"
        :original="$srchttp + item['original']"
        :pic_data="item"
      />
    </div>
    <el-dialog title="填写名字" :visible.sync="dialogVisible" width="40%">
      <el-row v-if="useralert">
        <el-col :span="20" :offset="2">
          <el-alert :closable="false" title="不存在这样的用户" type="error">
          </el-alert>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="20" :offset="2">
          <span style="float: left"
            >输入你的账号，你的打分行为将会被记录。</span
          >
        </el-col>

        <el-col :span="20" :offset="2">
          <el-input
            v-model="usernameSet"
            placeholder="请输入账号"
            style="margin-top: 20px"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="20">
          <el-button
            type="primary"
            style="margin-top: 20px; float: right"
            @click="writeName(usernameSet)"
            >确认</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
//想尝试让所有的block都打开同一个dialog
import PicBlock from "@/components/PicBlock2";
import { cookieToJson, writeCookie } from "@/api/util.js";

export default {
  components: { PicBlock },
  name: "Index",
  data() {
    return {
      number: 10,
      BASEURL: this.$srchttp,
      piclist: [],
      activeName: "first",
      dialogVisible: false,
      windowHight: document.documentElement.clientHeight,
      windowWidth: document.documentElement.clientWidth,
      outerClass: undefined,
      record: undefined,
      username: undefined,
      usernameSet: undefined,
      useralert: false,
      date:undefined,
      pic_data:{
        id:"",
        name: "",
        is_virtual:0,
        is_real:0,
        is_other:0,
        is_text:0,
        danger_level:-1,
        is_labled:0  
      },
    };
  },
  methods: {
    writeName(name) {
      //首先需要先检查数据库里面是否有对应的名字。
      //如果检查不到，就要弹出动画系TODO
      // this.$http.post('')
      this.$http
        .post("checkusername", { username: this.usernameSet })
        .then((res) => {
        //   console.log("-----------------------------------------------");
        //   console.log(res.data);
          if (res.data == 1) {
            writeCookie("username", this.usernameSet, 10000000);
            this.username = this.usernameSet;
            this.dialogVisible = false;
          } else {
            this.username = undefined;
            this.usernameSet = undefined;
            document.cookie = "username=";
            this.useralert = true;
          }
        });
      writeCookie("username", name, 10000000);
    },
    getPicData(){
        this.$http.post("getpicbytime", { date: this.date }).then((res) => {
        this.piclist = res.data;
        this.record = res.data.length;
    });
    }
  },
  created: function () {
    //要在这里先设置cookie? 如果没有cookie,就重定向到check里面
    this.$http
      .get("checkcookie")
      .then((res) => {
        if (res.status == 200) console.log("密码正确");
      })
      .catch((error) => {
        this.$router.push("check");
      });
    // console.log(document.cookie)
    let cookieObj = cookieToJson(document.cookie);
    // console.log("-----------------------------------------------")
    // console.log(cookieObj["username"])
    this.username = cookieObj["username"];

    this.usernameSet = this.username;
    //下面要检查username是不是正确的,如果没有就要清除
    if (this.username != undefined) {
      this.$http
        .post("checkusername", { username: this.username })
        .then((res) => {
        //   console.log("-----------------------------------------------");
        //   console.log(res.data);
          if (res.data != 1) {
            this.username = undefined;
            document.cookie = "username=";
          }
        });
    }
    let width = document.documentElement.clientWidth;
    if (width <= 626) (this.outerClass = "outer-1"), (this.number = 10);
    else if (width <= 990) (this.outerClass = "outer-2"), (this.number = 12);
    else if (width <= 1316) (this.outerClass = "outer-3"), (this.number = 12);
    else if (width <= 1630) (this.outerClass = "outer-4"), (this.number = 12);
    else (this.outerClass = "outer-5"), (this.number = 15);
  },
  mounted: function () {
      //接下来要改这个,从而能够

    this.$http.get("getunlabled").then((res) => {
      this.unlabled = res.data["unlabled"];
    });
    window.onresize = () => {
      let width = document.documentElement.clientWidth;
      // console.log(width)
      if (width <= 626) this.outerClass = "outer-1";
      else if (width <= 990) this.outerClass = "outer-2";
      else if (width <= 1316) this.outerClass = "outer-3";
      else if (width <= 1630) this.outerClass = "outer-4";
      else this.outerClass = "outer-5";
    };
  },
};
//250单个，544 2个 ，一个272
</script>
<style>
.outbox {
  height: 300px;
  margin-left: 8%;
  margin-right: 8%;
}
.picblock-1 {
  margin: 0 auto;
}
.outer-1 {
  margin: 0 auto;
  width: 272px;
  height: 500px;
}
.outer-2 {
  margin: 0 auto;
  width: 544px;
  height: 500px;
}
.outer-3 {
  margin: 0 auto;
  width: 816px;
  height: 500px;
}
.outer-4 {
  margin: 0 auto;
  width: 1088px;
  height: 500px;
}
.outer-5 {
  margin: 0 auto;
  width: 1360px;
  height: 500px;
}

.inner {
  /*这里我设置了两个浮动元素*/
  float: left;
  width: 200px;
  height: 200px;
  background-color: #000;
}
</style>