<template>
   <div>
     <div style="padding:10px 0" >
       <el-input style="width: 200px ;padding:10px" placeholder="请输入用户编号" suffix-icon="el-icon-search" v-model="search"></el-input>
       <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
       <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
     </div>

     <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'" @selection-change="handleSelectionChange">>

       <el-table-column type="selection" width="55"></el-table-column>
       <el-table-column prop="userId" label="用户编号" width="80"></el-table-column>
       <el-table-column prop="keyword" label="搜索关键字" width="120"></el-table-column>
       <el-table-column prop="source" label="搜索来源" width="120"></el-table-column>
       <el-table-column prop="addTime" label="创建时间"></el-table-column>
       <el-table-column prop="updateTime" label="更新时间"></el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>

           <el-popconfirm
               class="ml-5"
               confirm-button-text='确定'
               cancel-button-text='我再想想'
               icon="el-icon-info"
               icon-color="red"
               title="您确定删除吗？"
               @confirm="del(scope.row.id)"
           >

             <el-button type="danger" slot="reference">删除<i class="el-icon-remove-outline"></i></el-button>

           </el-popconfirm>
         </template>
       </el-table-column>

     </el-table>
     <div style="padding: 10px 0">
       <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pageNum"
           :page-sizes="[2, 5,10, 20]"
           :page-size="pageSize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="total">
       </el-pagination>
     </div>

     <el-dialog title="搜索历史" :visible.sync="dialogFormVisible" width="25%" >
       <el-form label-width="90px" size="small" >

         <el-form-item label="用户编号" >
           <el-input v-model="form.userId" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="搜索关键字" >
           <el-input v-model="form.keyword" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="搜索来源" >
           <el-input v-model="form.source" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="创建时间" >
           <el-input v-model="form.addTime" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="更新时间" >
           <el-input v-model="form.updateTime" autocomplete="off"></el-input>
         </el-form-item>
       </el-form>

       <div slot="footer" class="dialog-footer">
         <el-button @click="dialogFormVisible = false">取 消</el-button>
         <el-button type="primary" @click="Save">确 定</el-button>
       </div>
     </el-dialog>
   </div>
</template>

<script>
export default {
  name: "MallSearchHistory",
  data(){
    return{

      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      search:"",
      form: {},
      dialogFormVisible: false,
      multipleSelection:[],
      headerBg: 'headerBg'

    }
  },

  created() {

    this.load()
  },
  methods: {

    reset() {
      this.search = ''
      this.load()

    }
    ,
    handleAdd() {
      this.form={}
      this.dialogFormVisible = true
      this.total = {}
      this.load()

    }
    ,
    load() {
      this.request.get("/mallSearchHistory/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.records
        this.total = res.total
      })
    },

    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()

    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleEdit(row)
    {
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogFormVisible=true
      this.load()

    },
    del(id){
      this.request.delete("/mallSearchHistory/"+id).then(res => {
        if(res){
          this.$message.success("删除成功")
          this.load()
        }else{
          this.$message.error("删除失败")
        }

      })
    },

    Save() {
      this.request.post("/mallSearchHistory", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible=false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleSelectionChange(val){
      console.log(val)
      this.multipleSelection=val
    },
    delBatch(){
      let ids=this.multipleSelection.map(v => v.id)  //[{},{},{}]=>[1,2,3]
      this.request.post("/mallSearchHistory/del/batch",ids).then(res=>{
        if(res)
        {
          this.$message.success("批量删除成功")
          this.load()
        }else{
          this.$message.error("批量删除失败")
        }


      })
    }

  }

}
</script>

<style>
.headerBg{
  background: #E4E7ED !important;
}
</style>