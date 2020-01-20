const Base = require('./base')
const fs = require('fs')
const path = require('path')
const rename = think.promisify(fs.rename, fs)
// const express = require('express')
// const bodyParser = require('body-parser')
// const multer = require('multer')
// var objMulter = multer({dest: './www/upload/'})
const formidable = require('formidable')
// const util = require('util')
module.exports = class extends Base {
  async fileUploadAction(req, res, next) {
    try {
      // let {f_name, f_path} = this.post()
      // console.log(f_name);
      // console.log(f_path);
      
      // let file = this.file('f_path');
      // console.log(file.name);
      // const filepath = path.join(think.ROOT_PATH, '/upload/' + file.name)
      // think.mkdir(path.dirname(filepath))
      // // await rename(file.path, filepath)
      // let form = new formidable.IncomingForm({keepExtension:true})
      // form.parse(req, function(err, fields, file) {
      //   fs.rename(file.path, filepath, function(a, b) {
      //   })
      //   res.json({success: '修改成功'})
      // })
      // let filepath = themefile.path;//为防止上传的时候因文件名重复而覆盖同名已上传文件，path是MD5方式产生的随机名称
      // console.log(filepath);
      
      // let uploadpath = think.RESOURCE_PATH + '/static/theme';
      // think.mkdir(uploadpath);//创建该目录
      // //提取出用 ‘/' 隔开的path的最后一部分。
      // let basename = path.basename(filepath);
      // let basename = themefile.originalFilename;//因为本系统不允许上传同名主题，所以文件名就直接使用主题名
      // //将上传的文件（路径为filepath的文件）移动到第二个参数所在的路径，并改为第二个参数的文件名。
      // fs.renameSync(filepath, uploadpath + '/' + basename);
      // themefile.path = uploadpath + '/' + basename;
      // //读取压缩文件信息存数据库
      // let zip = new JSZip();
      // console.log(zip);
      

      // let allfiles = this.file() // 获取所有文件
      // console.log(allfiles.f_path);
      // fs.writeFile()
      // let filepath = allfiles.f_path.path //为防止上传的时候因文件名重复而覆盖同名已上传文件，path是MD5方式产生的随机名称
      // let uploadpath = think.ROOT_PATH + '\\www' + '\\static\\theme' // 定义文件上传的路径，think.RESOURCE_PATH常量为静态资源根目录
      // think.mkdir(uploadpath);//创建该目录
      // let basenamelist = filepath.split('\\')
      // let basename = basenamelist[basenamelist.length-1]
      // //将上传的文件（路径为filepath的文件）移动到第二个参数所在的路径，并改为第二个参数的文件名。
      // var form = new formidable.IncomingForm()
      // form.uploadDir = 'temp'
      // fs.renameSync(filepath, uploadpath + '\\' + basename);
      // filepath = uploadpath + '\\' + basename;

      return this.success('11111');
    }
    catch(e) {
      console.log(e);
      return this.fail('上传文件失败')
    }
    
  }
}