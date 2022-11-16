<template>
    <div>
        <el-card class="box-card">
            <span style="float:left">
                            可能是第一次登陆，需要输入密码
            </span>

            <el-input v-model="password" placeholder="请输入密码" style="margin-top: 20px"></el-input>

             <el-button type="primary" style="margin: 20px 0px;float:right " @click="setCookie">确认</el-button>
        </el-card>
    </div>    
</template>
<script>
  export default {
    data() {
      return {
        password: ""

      };
    },
    methods: {
        setCookie(){
            document.cookie = "password=" + this.password
            this.$router.push("/")
        }
    }
  };
</script>
<style>
  .box-card {
    width: 480px;
    margin: auto;
    
  }
</style>