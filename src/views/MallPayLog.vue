<template>
  <div>
    <div style="padding:10px 0" >
      <div style="padding:10px 0" >
        <el-input style="width: 200px ;padding:10px" placeholder="请输入订单号" suffix-icon="el-icon-search" v-model="search"></el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        <el-button  class="ml-20" type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </div>
    </div>
    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'" @selection-change="handleSelectionChange">>

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="orderSn" label="支付方式" width="120"></el-table-column>
      <el-table-column prop="payNo" label="订单编号"></el-table-column>
      <el-table-column prop="payMoney" label="支付金额"></el-table-column>
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

    <el-dialog title="支付信息" :visible.sync="dialogFormVisible" width="25%" >
      <el-form label-width="90px" size="small" >


        <el-form-item label="支付方式" >
          <el-input v-model="form.orderSn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单编号" >
          <el-input v-model="form.payNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付金额" >
          <el-input v-model="form.payMoney" autocomplete="off"></el-input>
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
  name: "MallPayLog",
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
    //添加
    handleAdd() {
      this.form={}
      this.dialogFormVisible = true
      this.total = {}
      this.load()

    }
    ,
    load() {
      this.request.get("/mallPayLog/page", {
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
    //改变每页显示的条数
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()

    },
    //改变条数
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },

    //修改
    handleEdit(row)
    {
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogFormVisible=true
      this.load()

    },
    del(id){
      this.request.delete("/mallPayLog/"+id).then(res => {
        if(res){
          this.$message.success("删除成功")
          this.load()
        }else{
          this.$message.error("删除失败")
        }

      })
    },

    Save() {
      this.request.post("/mallPayLog", this.form).then(res => {
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
      this.request.post("/mallPayLog/del/batch",ids).then(res=>{
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