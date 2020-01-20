<template>
  <div class="file-manage-container">
    <el-container>
      <el-header height="45px" class="file-manage-header">Header</el-header>
      <el-container>
        <el-header height="45px" class="file-page-header">
          <el-button @click="uploadVisible = true">上传</el-button>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="uploadVisible" title="上传文件">
      <el-form :model="uploadForm">
        <!-- <el-form-item>
          <el-input type="file" value="" />
        </el-form-item> -->
        <el-form-item>
          <el-upload
          :action="action"
          class="upload-component"
          :file-list="modeList"
          :http-request="modeUpload"

          >
          <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
        
      </el-form>
      <div slot="footer">
        <el-button @click="uploadVisible = false">取消</el-button>
        <el-button @click="upload">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      uploadVisible: false,
      uploadForm: {
        f_name: '',
        // listName: ''
      },
      action: 'https://jsonplaceholder.typicode.com/posts/',
      modeList: [],
      file: {}
    }
  },
  methods: {
    ...mapActions([
      'fileUpload' // 文件上传
    ]),
    modeUpload: function(item) {
      console.log(item);
      
      this.file = item.file
      this.uploadForm.f_name = item.file.name
      // this.uploadForm.listName = (item.file.name).split('.')[0]
    },
    upload: function() {
      let formData = new FormData()
      formData.append('f_name', this.uploadForm.f_name)
      formData.append('f_path', this.file)
      // formData.append('f_name', this.uploadForm.f_name)
      // formData.append('file', e.target.files[0])
      console.log(formData);
      
      let config = {
        headers: {'Content-Type':'multipart/form-data'}
      }
      this.fileUpload(formData).then(res => {
        console.log(res);
        
        if (res.errno === 0) {
          this.$message.success('文件上传成功')
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    }
  }
}
</script>

<style scoped>
.file-manage-container {
  height: calc(100vh - 46px);
}
.file-manage-header {
  line-height: 45px;
}
.file-page-header {
  line-height: 45px;
  border-bottom: 1px solid rgb(210,226,255);
}
.upload-component {
  width: auto;
  display: inline-block;
}
</style>