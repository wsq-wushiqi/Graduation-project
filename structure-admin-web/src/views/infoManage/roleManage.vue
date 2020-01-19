<template>
  <div class="role-manage-container">
    <el-container>
      <el-header height="45px" class="role-manage-header">
        <span>名称：</span>
        <el-input v-model="queryName" class="query-name" size="small" clearable @clear="query"></el-input>
        <el-button size="small" @click="query">查询</el-button>
      </el-header>
      <el-container>
        <el-header height="45px" class="page-main-header">
          <el-button size="mini" @click="addDlg">添加</el-button>
          <el-button size="mini" @click="updateDlg">修改</el-button>
        </el-header>
        <el-main class="role-manage-main">
          <el-table
          :data="tableData"
          border
          highlight-current-row
          height="100%"
          @row-click="rowClick">
            <el-table-column label="选择" width="50">
              <template slot-scope="scope">
                <el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="r_name" label="名称" width="80"></el-table-column>
            <el-table-column prop="r_authority" label="权限" :formatter="authorityFormat"></el-table-column>
            <el-table-column prop="r_describe" label="描述"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="addDlgVisible" :title="dlgTitle" :close-on-click-modal="false">
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
      'getTotalMenu' // 获取所有菜单
    ]),
    addDlg: function() {
      this.addDlgVisible = true
      this.dlgTitle = '添加角色'
    },
    getMenu: function() {
      this.getTotalMenu().then(res => {
        if (res.errno === 0) {
          this.menuList = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
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
    getTableData: function() {
      this.getRoleList({ name: this.queryName }).then(res => {
        if(res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
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