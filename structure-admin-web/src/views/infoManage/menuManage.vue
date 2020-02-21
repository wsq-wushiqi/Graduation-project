<template>
  <div class="menu-manage-container">
    <el-container>
      <el-header height="45px" class="query-header">
        <span>名称：</span>
        <el-input v-model="queryName" class="query-name" size="small" clearable @clear="query"></el-input>
        <span>路由：</span>
        <el-input v-model="queryRouter" class="query-name" size="small" clearable @clear="query"></el-input>
        <el-button type="primary" plain size="small" icon="el-icon-search" @click="query">查询</el-button>
      </el-header>
      <el-container>
        <el-header height="45px" class="menu-manage-header">
          <el-button @click="add" icon="bs-xinzengcaidan" size="mini">添加</el-button>
          <el-button @click="update" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button @click="drop" icon="bs-shanchu_huaban" size="mini">删除</el-button>
        </el-header>
        <el-main class="menu-manage-main">
          <el-table
          :data="tableData"
          border
          height="100%"
          highlight-current-row
          @row-click="rowClick">
            <el-table-column label="选择" width="50">
              <template slot-scope="scope">
                <el-radio v-model="tableRadio" :label="scope.row"><i /></el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="m_n_id" label="菜单id" :align="center" width="70"></el-table-column>
            <el-table-column prop="m_name" label="名称" :align="center"></el-table-column>
            <el-table-column prop="m_p_id" label="上级id" :align="center" width="70"></el-table-column>
            <el-table-column prop="m_url" label="路由" :align="center"></el-table-column>
            <el-table-column prop="m_icon" label="图标" :align="center"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="addDlgVisible" :title="addDlgTitle" width="400px" class="add-dialog" :close-on-click-modal="false">
      <span v-if="addDlgTitle === '修改菜单'">{{ menuName }}</span>
      <el-form>
        <el-form-item>
          <span class="add-form-span">菜单id：</span><el-input v-model="addForm.m_n_id" :disabled="addDlgTitle==='修改菜单'" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-span">名称：</span><el-input v-model="addForm.m_name" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-span">上级id：</span><el-input v-model="addForm.m_p_id" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-span">路由：</span><el-input v-model="addForm.m_url" class="add-form-input"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="add-form-span">图标：</span><el-input v-model="addForm.m_icon" class="add-form-input"></el-input>
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
      tableData: [],
      center: 'center',
      addDlgVisible: false,
      addDlgTitle: '添加菜单',
      menuName: '',
      addForm: {
        m_n_id: '',
        m_name: '',
        m_p_id: '',
        m_url: '',
        m_icon: ''
      },
      tableRadio: [],
      queryName: '',
      queryRouter: ''
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    ...mapActions([
      'getPageMenuList', // 获取表格数据
      'addMenu', // 添加菜单
      'updateMenu', // 修改菜单
      'deleteMenu' // 删除菜单
    ]),
    getTableData: function() {
      this.getPageMenuList({ name: this.queryName, router: this.queryRouter }).then(res => {
        if (res.errno === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(error => { this.$message.error(error) })
    },
    add: function() {
      this.addDlgTitle = '添加菜单'
      this.addDlgVisible = true
      this.addForm = Object.assign({}, null)
    },
    doAdd: function() {
      if (this.addDlgTitle === '添加菜单') {
        this.addMenu(this.addForm).then(res => {
          if (res.errno === 0) {
            this.$message.success('添加菜单成功')
            this.addDlgVisible = false
            this.getTableData()
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      } else {
        this.updateMenu(this.addForm).then(res => {
          if (res.errno === 0) {
            this.$message.success('修改菜单成功')
            this.getTableData()
            this.addDlgVisible = false
          } else {
            this.$messages.error(res.errmsg)
          }
        }).catch(error => { this.$message.error(error) })
      }
      
    },
    update: function() {
      const row = this.tableRadio
      if (row.length === 0) {
        this.$message.warning('请选择要修改的菜单')
      } else {
        this.addDlgVisible = true
        this.addDlgTitle = '修改菜单'
        this.addForm = Object.assign({}, row)
      }
    },
    rowClick: function(item) {
      this.tableRadio = item
    },
    drop: function() {
      const row = this.tableRadio
      if (row.length === 0) {
        this.$message.warning('请选择要删除的菜单')
      } else {
        this.$confirm('此操作不可恢复， 确定要删除菜单"' + row.m_name + '"吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteMenu({ m_n_id: row.m_n_id }).then(res => {
            if (res.errno === 0) {
              this.$message.success('成功删除菜单"' + row.m_name + '"')
              this.getTableData()
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(error => { this.$message.error(error) })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    },
    query: function() {
      this.getTableData()
    }
  }
}
</script>

<style scoped>
.menu-manage-container {
  height: calc(100vh - 46px);
}
.menu-manage-header {
  line-height: 45px;
  border-bottom: 1px solid rgb(210,226,255);
}
.menu-manage-main {
  height: calc(100vh - 136px);
  padding: 10px;
  overflow: hidden;
}
.add-form-span {
  display: inline-block;
  width: 70px;
  margin-left: 30px;
}
.add-form-input {
  width: 200px;
}
.query-header {
  line-height: 45px;
  min-width: 660px;
}
.query-name {
  width: 200px;
  margin-right: 20px;
}
</style>
<style>
.add-dialog .el-dialog__body {
  padding-bottom: 1px;
}
</style>