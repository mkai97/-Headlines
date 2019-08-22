<template>
 <el-card>
      <!-- el-card 具名插槽 header -->
     <bread-crumb slot="header">
      <!-- 面包屑的插槽 具名插槽  title-->
<template slot="title">评论列表</template>
     </bread-crumb>

         <el-table :data="list"
                   style="width: 100%">
           <el-table-column width="500" prop="title"
                            label="标题"
                           >
           </el-table-column>
            <el-table-column prop="comment_status"
                            label="评论状态"
                           >
           </el-table-column>
            <el-table-column prop="total_comment_count"
                            label="总评论数"
                           >
           </el-table-column>
              <el-table-column prop="fans_comment_count"
                            label="粉丝评论数"
                           >
           </el-table-column>
              <el-table-column prop=""
                            label="操作"
                           >
                           <el-button type="text">修改</el-button>
       <el-button type="text">关闭评论</el-button>
           </el-table-column>
         </el-table>

 </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 查询评论列表数据
    // query参数 => 指的是get参数 => url链接上
    // post参数 => 指的是body参数
    // axios 中 有一个对象存储的就是query参数  params
    // axios 中 有一个对象存储的就是body参数  data
    getComments () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        this.list = result.data.results
      })
    },
    // row 当条数据对象
    // column 当前列的属性
    // cellValue当前单元格属性值
    // index索引
    // formatter需要返回结果 需要根据当前值 进行返回
    // 类似过滤器
    // formatter 是elementUI提供的 ,过滤器是Vue自身特性
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
