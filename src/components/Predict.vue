<template>
<div style="width:50%;margin:auto">
<el-upload
  class="upload-demo"
  action="http://jp-tyo-ntt-1.natfrp.cloud:62972/predict"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :on-success="handleSuccess"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>


</div>

</template>
<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList){
        let danger = response["danger"]
        let type = response["type"]
        file.name = "色情程度:" + danger +"　　　　" + "类型:" + type
      }
    }
  }
</script>