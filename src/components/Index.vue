<template>
  <div class="outbox">
    <div>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-purple">
                <el-tabs v-model="activeName" type= "border-card">
                  <el-tab-pane label="介绍" name="first">这里是介绍</el-tab-pane>
                  <el-tab-pane label="FAQ" name="second">这是FAQ   MIMI怎么办？</el-tab-pane>
                  <el-tab-pane label="建议箱" name="third">这里是建议箱，用来发送遇到的问题和建议</el-tab-pane>
                </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin:15px 0">还有{{unlabled}}张图片就完成标注了！！</div> 
    <div :class="outerClass">
          <pic-block v-for="(item,i) in piclist" :key="i" :thumbnail="BASEURL+item['thumbnail']" :original="BASEURL+item['original']" :id="item['id']"/>
    </div>
  </div>
</template>
<script>
//想尝试让所有的block都打开同一个dialog
import PicBlock from "@/components/PicBlock";
export default {
  components: { PicBlock },
  name: "Index",
  data() {
    return {
      number:10,
      BASEURL:"http://localhost:5000/",
      piclist:[
      ],
      activeName: 'first',
      windowHight: document.documentElement.clientHeight,
      windowWidth: document.documentElement.clientWidth,
      outerClass: undefined,
      unlabled:undefined

    };
  },
  methods:{
  },
  created:function(){
    let width = document.documentElement.clientWidth;
    if(width<=626) this.outerClass="outer-1",this.number = 5
    else if(width<=990) this.outerClass="outer-2",this.number = 6
    else if(width<=1316) this.outerClass="outer-3",this.number = 9
    else this.outerClass="outer-4",this.number = 12
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
        //console.log(width)
        if(width<=626) this.outerClass="outer-1"
        else if(width<=990) this.outerClass="outer-2"
        else if(width<=1316) this.outerClass="outer-3"
        else this.outerClass="outer-4"
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