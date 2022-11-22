<template>
<div>
<el-card class="box-card">
    <el-image
    style="width: 200px; height: 200px"
    :src="url"
    :preview-src-list="srcList"
    lazy
    >
    </el-image>
    <div style="padding-top: 3px">
        <div style="display:block">
            <span style="font-size: 13px;">类型：</span><el-tag :type="pic_type.color">{{pic_type.type}}</el-tag>
            <span style="font-size: 13px;">等级：</span><el-tag :type="pic_level.color">{{pic_level.type}}</el-tag>
        </div>
        <div style="margin-top:5px">
            <span style="margin-right:5px">判定人：{{pic_data.username}}</span>
            <el-button size="mini" @click="dialogVisible = true" :disabled = "disable">修正</el-button>
        </div>
    </div>

</el-card>
<el-dialog
    title= "修改图片打分"
    :visible.sync="dialogVisible"
    width="45%"
>
    <el-radio-group v-model="picType">
        <el-radio-button label="is_virtual">虚拟</el-radio-button>
        <el-radio-button label="is_real">现实</el-radio-button>
        <el-radio-button label="is_text">文本</el-radio-button>
        <el-radio-button label="is_other">其他</el-radio-button>
    </el-radio-group>
    <div style="margin-top: 20px">
        <el-radio-group v-model="picLevel" size="medium">
            <el-radio-button label="0">非常安全</el-radio-button>
            <el-radio-button label="1">比较安全</el-radio-button>
            <el-radio-button label="2">不太安全</el-radio-button>
            <el-radio-button label="3">很不安全</el-radio-button>
        </el-radio-group>
    </div>
    <el-button style="margin-top:10px" @click="setProperty">确定</el-button>
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
    },
data() {
return {
    url: this.thumbnail,
    srcList: [this.original],
    dialogVisible: false,
    disable: false,

    judger:undefined,
    picType:undefined,
    picLevel:undefined,

    selectTitle:"",
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
setProperty(){
    this.pic_data.is_virtual=0
    this.pic_data.is_real=0
    this.pic_data.is_text=0
    this.pic_data.is_other=0
    this.pic_data[this.picType] = 1
    this.pic_data.is_labled = 1
    this.pic_data.danger_level = parseInt(this.picLevel)
    this.disable = true
    //如果非黄，就说明要发update包了
    this.$http.post('updatepic', [this.pic_data]).then((res) => {
        //如果服务器未响应的话，这个是没有办法检测的，不过似乎不用管。
        if(res.status==200){
            console.log("OK")
            this.dialogVisible = false
        }
        else{
            alert("服务器访问出现问题！")
            this.disable = false
        }
    })
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
},
pic_type: function(){
    if (this.pic_data.is_virtual == 1) {
        return {
            "type":"虚拟",
            "color":"primary"
        }
    }
    else if(this.pic_data.is_real == 1){
        return {
            "type":"现实",
            "color":"primary"
        }
    }
    else if(this.pic_data.is_text == 1){
        return {
            "type":"文本",
            "color":"primary"
        }
    }
    else if(this.pic_data.is_other == 1){
        return {
            "type":"其他",
            "color":"primary"
        }
    }
    else{
        return {
            "type":"未加载",
            "color": "info"
        }
    }
},
pic_level: function(){
    if (this.pic_data.danger_level == -1) {
        return {
            "type":"未评",
            "color":"info"
        }
    }
    else if(this.pic_data.danger_level == 0){
        return {
            "type":"非常安全",
            "color":"success"
        }
    }
    else if(this.pic_data.danger_level == 1){
        return {
            "type":"比较安全",
            "color":"primary"
        }
    }
    else if(this.pic_data.danger_level == 2){
        return {
            "type":"不太安全",
            "color":"warning"
        }
    }
    else if(this.pic_data.danger_level == 3){
        return {
            "type":"很不安全",
            "color":"danger"
        }
    }
    else{
        return {
            "type":"错误",
            "color": "info"
        }
    }
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