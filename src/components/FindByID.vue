<template>
    <div>
        <el-card>
            <el-row>
                    <span></span>
                <el-input v-model="id" placeholder="请输入要查找的id">
                    输入id：
                </el-input>
                <el-button @click="findPic" size="mini" style="margin: 5px 0px;float:right;display:block">
                    查找
                </el-button>
            </el-row>

            <el-image style = "margin:5px auto; display:block" 
            :src="url" 
            :preview-src-list="srcList"
            v-if="img_show"
            >
            </el-image>
        </el-card>
    </div>
</template>
<script>
//一个搜索框，搜索发送请求，返回图片
import PicBlock from "@/components/PicBlock";
export default {
  components: { PicBlock },
  name: "Index",
  data() {
    return {
        BASEURL:this.$srchttp,
        id:undefined,
        url: undefined,
        srcList: [
        ],
        img_show:false
    };
  },
  methods:{
      findPic(){
          //TODO: 还要先postman试试看能不能刑
            this.$http.post("findbyid",{"id":this.id}).then(res=>{
                let data = res.data[0]
                this.url = this.$thumbhttp + data.thumbnail
                this.srcList = [this.$srchttp + data.original]
                this.img_show = true
              
          })
      }
  },
  created:function(){
  }


};

</script>
<style>

</style>