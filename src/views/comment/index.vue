<template>
  <el-card>
    <!-- el-card 具名插槽 header -->
    <bread-crumb slot="header">
      <!-- 面包屑的插槽 具名插槽  title-->
      <template slot="title">评论列表</template>
    </bread-crumb>

    <el-table :data="list" style="width: 100%">
      <el-table-column width="400" prop="title" label="标题"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            @click="closeOrOpen(obj.row)"
            :style="{color:obj.row.comment_status ? '#E6A23C':'#409EFE'}"
            type="text"
          >{{ obj.row.comment_status ? "关闭评论" : "打开评论" }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination background layout="prev, pager, next" :page-size="page.pageSize"
        :total="page.total"
        :current-page="page.currentPage"
       ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 200
      },
      list: []
    }
  },
  methods: {
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      console.log(row.id, row.comment_status)
      this.$confirm(`您确定要${mess}评论吗`, '提示').then(() => {
        this.$axios({

          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } // 状态是反着的
        }).then(() => {
          // 如果进入到then函数 一定成功
          this.getComments()
        })
      })
    },
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
