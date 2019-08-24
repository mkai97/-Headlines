<template>
  <el-card>
    <bread-crumb>
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form style="margin-left:40px">
      <el-form-item label="文章状态">
        <el-radio-group v-model="formData.status" @change="refreshList">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核成功</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select v-model="formData.channel_id" @change="refreshList" placeholder="请选择">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="formData.dateRange"
          @change="refreshList"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholde="开始日期"
          end-placeholde="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total_title">共找到{{page.total}}条符合条件的内容</div>
    <div class="content-list">
      <div class="content-item" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img :src="item.cover.images[0]" alt srcset />
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag style="with:60px" :type="item.status | statusType">{{item.status | statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <span>
            <i class="el-icon-edit">修改</i>
          </span>
          <span>
            <i class="el-icon-delete">删除</i>
          </span>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center" style="margin:20px 0 " >
        <el-pagination @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" background layout="prev, pager, next" :total="page.total"></el-pagination>

    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        dateRange: null
      },
      channels: [],
      list: [],
      page: {
        total: 0
      }
    }
  },
  methods: {
    getConditions () {
      let { status, channel_id: cid, dateRange } = this.formData
      let params = {
        status: status === 5 ? null : status,
        channel_id: cid,
        begin_pubdate: dateRange && dateRange.length ? dateRange[0] : null,
        end_pubdate: dateRange && dateRange.length > 1 ? dateRange[1] : null }
      params.page = this.page.currentPage
      params.per_page = this.page.pageSize
      return params
    },
    refreshList () {
      this.page.currentPage = 1
      this.getArticles(this.getConditions()) // 调用查询接口 传入参数
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: { ...params }
      }).then(result => {
        this.list = result.data.results // 将当前的数据赋值给data中对象
        this.page.total = result.data.total_count // 当前总条数
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getArticles(this.getConditions())
    },

    getChannels () {
      this.$axios({
        url: '/channels'

      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    this.getArticles({ page: 1, per_page: 10 })
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.total_title {
  height:60px;
  line-height: 60px;
  border-bottom: 1px dashed #ccc;
}
.content-list {
  .content-item {
    padding: 10px;
    border-bottom: 1px solid #f2f3f5;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width:150px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        margin-left:10px;
        display: flex;
        height: 100px;
        padding: 5px 0;
        flex-direction: column;
        justify-content: space-between;
        .date {
          color:#999;
          font-size:12px;
        }
      }
    }
    .right {
      span,span i {
        font-size:12px;
        color:#333
      }
      span {
        margin-right: 5px;
      }
    }
  }
}

</style>
