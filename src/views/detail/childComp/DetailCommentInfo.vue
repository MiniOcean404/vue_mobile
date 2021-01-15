<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img
          :src="item"
          v-for="(item, index) in commentInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="scss" scope>
.comment-info {
  padding: 5px 12px;
  color: #333;
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .header-title {
      float: left;
      font-size: 15px;
    }
    .header-more {
      float: right;
      margin-right: 10px;
      font-size: 13px;
    }
  }

  .info-user {
    padding: 10px 0 5px;
    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }
    span {
      position: relative;
      font-size: 15px;
      top: -15px;
      margin-left: 10px;
    }
  }

  .info-detail {
    padding: 4px 5px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    p {
      font-size: 14px;
      color: #777;
      line-height: 1.5;
      margin-left: 6px;
    }
    .info-other {
      font-size: 12px;
      color: #999;
      margin-top: 10px;
      margin-left: 5px;
      .date {
        margin-right: 8px;
      }
    }
    .info-imgs {
      margin-top: 10px;
      margin-bottom: 10px;
      img {
        width: 100%;
        margin-right: 5px;
      }
    }
  }
}
</style>
