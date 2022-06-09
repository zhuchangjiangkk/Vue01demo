<template>
  <div>
    <div style="padding:10px 0" >
      <div style="padding:10px 0" >
        <el-input style="width: 200px ;padding:10px" placeholder="请输入标题" suffix-icon="el-icon-search" v-model="search"></el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        <el-button  class="ml-20" type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </div>
    </div>
    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'" @selection-change="handleSelectionChange">>

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="80"></el-table-column>
      <el-table-column prop="subtitle" label="子标题" width="120"></el-table-column>
      <el-table-column prop="content" label="专题内容"></el-table-column>
      <el-table-column prop="price" label="最低价"></el-table-column>
      <el-table-column prop="readCount" label="专题阅读量"></el-table-column>
      <el-table-column prop="addTime" label="创建时间"></el-table-column>
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

    <el-dialog title="专题列表信息" :visible.sync="dialogFormVisible" width="25%" >
      <el-form label-width="90px" size="small" >

        <el-form-item label="标题" >
          <el-input v-model="form.title"  autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="子标题" >
          <el-input v-model="form.subtitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专题内容" >
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最低价" >
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专题阅读量" >
          <el-input v-model="form.readCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" >
          <el-input v-model="form.addTime" autocomplete="off"></el-input>
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
  name: "MallTopic",
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
      this.form.addTime = this.myformatter(new Date)
      this.dialogFormVisible = true
      this.total = {}
      this.load()

    }
    ,
    load() {
      this.request.get("/mallTopic/page", {
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
      this.request.delete("/mallTopic/"+id).then(res => {
        if(res){
          this.$message.success("删除成功")
          this.load()
        }else{
          this.$message.error("删除失败")
        }

      })
    },

    Save() {
      this.request.post("/mallTopic", this.form).then(res => {
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
     //设置日期格式
    myformatter(date){
       var strDate = date.getFullYear()+"-"
       strDate += date.getMonth()+1+"-"
       strDate += date.getDate()
       return strDate
    },

delBatch(){
      let ids=this.multipleSelection.map(v => v.id)  //[{},{},{}]=>[1,2,3]
      this.request.post("/mallTopic/del/batch",ids).then(res=>{
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