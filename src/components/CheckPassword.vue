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
        writeCookie(name, value, hours)
          {
            var expire = "";
            if(hours != null)
            {
              expire = new Date((new Date()).getTime() + hours * 3600000);
              expire = "; expires=" + expire.toGMTString();
            }
            document.cookie = name + "=" + escape(value) + expire;
          },
        
        setCookie(){
            this.writeCookie("password",this.password,100000)
            this.writeCookie("test","123456",100000)
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