<template>
  <div class="role-manage-container">
    <el-container>
      <el-header height="45px" class="role-manage-header">
        <span>名称：</span>
        <el-input v-model="queryName" class="query-name" size="small" clearable @clear="query"></el-input>
        <el-button type="primary" plain size="small" icon="el-icon-search" @click="query">查询</el-button>
      </el-header>
      <el-container>
        <el-header height="45px" class="page-main-header">
          <el-button size="mini" icon="bs-xinzengguanliyuan" @click="addDlg">添加</el-button>
          <el-button size="mini" icon="el-icon-edit" @click="updateDlg">修改</el-button>
          <el-button size="mini" icon="el-icon-delete" @click="dropRole">删除</el-button>
        </el-header>
        <el-main class="role-manage-main">
          <el-table
          :data="tableData"
          border
          highlight-current-row
          height="100%"
          @row-click="rowClick"
          @header-dragend="headerDragend">
            <el-table-column label="选择" width="50">
              <template slot-scope="scope">
                <el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="r_name" label="名称" width="80"></el-table-column>
            <el-table-column prop="r_authority" label="权限" :formatter="authorityFormat" show-overflow-tooltip></el-table-column>
            <el-table-column prop="r_describe" label="描述"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加、修改角色对话框 -->
    <el-dialog :visible.sync="addDlgVisible" :title="dlgTitle" :close-on-click-modal="false" width="400px">
      <el-form :model="addForm">
        <el-form-item>
          <span class="add-form-span">角色名称：</span><el-input v-model="addForm.r_name" placeholder="请输入角色名称" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-span">角色描述：</span><el-input v-model="addForm.r_describe" placeholder="请输入角色描述" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-span">权限:</span>
          <el-cascader
          v-model="addForm.r_authority"
          :options="menuList"
          :props="props"
          collapse-tags
          :show-all-levels="false"
          clearable
          class="add-form-input"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDlgVisible = false">取消</el-button>
        <el-button @click="doAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      addDlgVisible: false,
      addForm: {
        r_name: '',
        r_describe: '',
        r_authority: []
      },
      menuList: [],
      props: {
        expandTrigger: 'hover',
        multiple:true,
        label: 'm_name',
        value: 'm_n_id'
      },
      tableData: [],
      dlgTitle: '添加角色',
      tableRadio: [],
      queryName: ''
    }
  },
  mounted() {
    this.getTableData()
    this.getMenu()
  },
  methods: {
    ...mapActions([
      'addRole',
      'getRoleList',
      'updateRole',
      'deleteRole', // 删除角色
      'getTotalMenu' // 获取所有菜单
    ]),
    // 打开添加角色对话框
    addDlg: function() {
      this.addDlgVisible = true
      this.dlgTitle = '添加角色'
    },
    // 获取菜单列表
    getMenu: function() {
      this.getTotalMenu().then(res => {
        if (res.errno === 0) {
          this.menuList = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 添加角色
    doAdd: function() {
      if (this.dlgTitle === '添加角色') {
        let params = {
          r_name: this.addForm.r_name,
          r_describe: this.addForm.r_describe,
          r_authority: JSON.stringify(this.addForm.r_authority)
        }
        this.addRole(params).then(res => {
          if (res.errno === 0) {
            this.$message.success('添加成功')
            this.addDlgVisible = false
            this.getTableData()
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else if (this.dlgTitle === '修改角色') {
        let params = {
          r_id: this.tableRadio.r_id,
          r_name: this.addForm.r_name,
          r_describe: this.addForm.r_describe,
          r_authority: JSON.stringify(this.addForm.r_authority)
        }
        this.updateRole(params).then(res => {
          if (res.errno === 0) {
            this.$message.success('修改成功')
            this.getTableData()
            this.addDlgVisible = false
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
      
    },
    // 获取表格数据
    getTableData: function() {
      this.getRoleList({ name: this.queryName }).then(res => {
        if(res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    // 表格权限列格式化显示
    authorityFormat: function(row, column) {
      let data = JSON.parse(row.r_authority)
      let result = []
      for (let i=0; i<data.length; i++) {
        let val = data[i][1]
        for (let j=0; j<this.menuList.length; j++) {
          if (this.menuList[j].children !== undefined) {
            let menu = this.menuList[j].children
            for (let k =0; k<menu.length; k++) {
              if (menu[k].m_n_id === val) {
                result.push(menu[k].m_name)
              }
            }
          }
        }
      }
      let value = ''
      for (let i=0; i<result.length; i++) {
        if(i === 0) {
          value = result[i]
        } else {
          value = value + ','+result[i]
        }
      }
      return value
    },
    // 打开修改角色信息对话框
    updateDlg: function() {
      const row = this.tableRadio
      if (row.length === 0) {
        this.$message.warning('请选择要修改的角色')
      } else {
        this.dlgTitle = '修改角色'
        this.addDlgVisible = true
        this.addForm = Object.assign({}, row)
        this.addForm.r_authority = JSON.parse(row.r_authority)
      }
    },
    rowClick: function(item) {
      this.tableRadio = item
    },
    query: function() {
      this.getTableData()
    },
    // 表格列宽改变触发事件
    headerDragend: function(newWidth, oldWidth, column) {
      let totalWidth = document.body.clientWidth
      if (column.label === '选择' && newWidth > 100) {
        column.width = 100
      } else if (column.label === '名称') {
        if (newWidth > totalWidth * 0.3) {
          column.width = totalWidth * 0.3
          column.showOverflowTooltip = false // 列宽足够时不需要show-overflow-tooltip
        } else {
          column.showOverflowTooltip = true
        }
      }
    },
    // 删除角色
    dropRole: function() {
      const row = this.tableRadio
      if (row.length === 0) {
        this.$message.warning('请选择要删除的用户')
      } else {
        const label = row.r_name
        this.$confirm('此操作不可恢复，你确定要删除用户"' + label +  '"吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRole({r_id: row.r_id}).then(res => {
            if (res.errno === 0) {
              this.$message.success('成功删除角色"' + label + '"')
              this.getTableData()
            }
          }).catch(error => { this.$message.error(res.errmsg) })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    }
  }
}
</script>

<style scoped>
.role-manage-container {
  height: calc(100vh - 46px);
}
.role-manage-header {
  line-height: 45px;
}
.role-manage-main {
  height: calc(100vh - 136px);
  padding: 10px 10px 2px 10px;
}
.page-main-header {
  line-height: 45px;
  border-bottom: 1px solid rgb(210,226,255);
}
.add-form-span {
  display: inline-block;
  width: 80px;
}
.add-form-input {
  width: 200px;
}
.query-name {
  width: 200px;
}
</style>