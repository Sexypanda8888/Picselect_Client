<template>
  <div>
    <el-card class="box-card">
      <el-image
        style="width: 200px; height: 200px"
        :src="url"
        :preview-src-list="srcList"
      >
      </el-image>
      <div style="padding-top: 3px">
        <el-button v-for="(item,i) in choices" :key="i" :type="item.css" size="mini" @click="setProperty(item)" :disabled = disable style="margin: 4px 4px;width:40%">
          {{item.name}}
        </el-button>
        <!-- <el-button type="primary" size="small" @click="dialogVisible = true" :disabled= disable>
          二次元
        </el-button>
        <el-button type="primary" size="small" @click="dialogVisible = true" :disabled= disable> 
          真人 
        </el-button>
        <el-button type="primary" size="small" @click="dialogVisible = true" :disabled= disable> 
          其他 
        </el-button> -->
      </div>
    </el-card>
    <el-dialog
      title="选择"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleClose"
    >
      <span>图片"{{ pic_name }}"的安全性如何？</span>
      <div style="padding-top: 30px">
        <el-button type="success" @click="sendJudgement(0)">
          非常安全
        </el-button>
        <el-button type="primary" @click="sendJudgement(1)"> 
          比较安全
        </el-button>
        <el-button type="warning" @click="sendJudgement(2)"> 
          不太安全
        </el-button>
        <el-button type="danger" @click="sendJudgement(3)"> 
          很不安全
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//这里的图片就不做大小限制了，因为是一样的
export default {
  name: "PicBlock",
  props:{//props列表
            thumbnail:{
              type:String,
              required:true
            },
            original:{
              type:String,
              required:true
            },
            id:0
        },
  data() {
    return {
      url: this.thumbnail,
      srcList: [this.original],
      dialogVisible: false,
      disable: false,
      pic_data:{
        id:this.id,
        name: "",
        is_virtual:0,
        is_real:0,
        is_other:0,
        is_3D:0,
        is_text:0,
        danger_level:-1,
        is_labled:0  
      },
      //undecided包括两个作用：1.查看是否被打过标签 2.查看是否归于比较难选的类型
      choices:[
        {
          "name":"虚拟",
          "property":"is_virtual",
          "is_ero":1,
          "css":"primary"
        },
        {
          "name":"现实",
          "property":"is_real",
          "is_ero":1,
          "css":"primary"
        },
        {
          "name":"文本",
          "property":"is_text",
          "is_ero":1,
          "css":"primary"
        },
        {
          "name":"其他",
          "property":"is_other",
          "is_ero":0,
          "css":"danger"
        }

      ]
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    setProperty(item){
      this.pic_data[item.property] = 1
      this.pic_data.is_labled = 1

      if(item.is_ero == 1){
        this.dialogVisible = true
      }
      else{
        this.disable = true
        //如果非黄，就说明要发update包了
        this.$http.post('updatepic', [this.pic_data]).then((res) => {
          //如果服务器未响应的话，这个是没有办法检测的，不过似乎不用管。
          if(res.status==200){
            console.log("OK")
          }
          else{
            alert("服务器访问出现问题！")
            this.disable = false
          }
        })
      }
        
    },
    sendJudgement(level){
      // alert("确定把该图片设为"+level+"吗")
      //把pic_name输过去就可以让后端Java根据名字查找了。
      this.dialogVisible = false
      this.disable = true
      this.pic_data.danger_level = level
      this.$http.post('updatepic', [this.pic_data]).then((res) => {
          if(res.status==200){
            console.log("OK")
          }
          else{
            alert("服务器访问出现问题！")
            this.disable = false
          }
        })
    },

  },
  computed:{
  pic_name:function(){
      let a =this.thumbnail.split("/")
      return a[a.length-1]
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 250px;
  height: 300px;
  margin: 10px;
  float: left;
}
</style>