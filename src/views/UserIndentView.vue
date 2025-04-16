<template>
  <div class="demo">

    <!-- 首页头部内容 -->
    <div class="headcontent">

      <!-- logo图片 -->
      <div class="logopicture" @click="goHome">
        <img src="../assets/国俭logo.jpg">
      </div>

      <!-- 搜索框 -->
      <div class="search">
        <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" @click="gotoSearch" />
      </div>

      <!-- 搜索按钮 -->
      <div class="searchbutton">
        <van-button type="primary" round @click="gotoSearch" style="width: 80px;">搜索</van-button>
      </div>

    </div>

    <!-- 标签页 -->
    <div class="ordertabs">

      <!-- 订单页头部 -->
      <div class="shoppingcarthead">
        <van-nav-bar title="我的订单" left-text="返回" left-arrow @click="gotoBack" />
      </div>

      <!-- 订单页标签页内容 -->
      <div class="OrderTabsContent">
        <van-tabs v-model:active="activeTab" type="card">
          <van-tab title="全部订单">
            全部订单
          </van-tab>
          <van-tab title="待收货">
            <!-- 订单列表 -->
            <div class="order-list">
              <div v-if="orders.length > 0" class="order-list-content">
                <div v-for="order in orders" :key="order.userIndentId"
                  class="order-item">
                  <!-- 订单头部 -->
                  <div class="order-header">
                    <span class="order-indentId">订单号: {{ order.userIndentId }}</span>
                    <span class="order-time">{{ formatTime(order.userIndentTime) }}</span>
                  </div>
                  <!-- 订单内容 -->
                  <div class="order-content">
                    <!-- 商品信息 -->
                    <div class="order-goods">
                      <img :src="getImgUrl(order.goodPicture)"
                        class="goods-img">
                      <div class="goods-info">
                        <div class="goods-name">{{ order.goodName }}</div>
                      </div>
                    </div>
                    <!-- 订单总价 -->
                    <div class="order-total">
                      <div class="goods-price">¥{{ order.goodPrice }} x {{ order.goodNumber }}</div>
                      合计: ¥{{ (order.goodPrice * order.goodNumber).toFixed(2) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="已评价">
            待评论
          </van-tab>
        </van-tabs>
      </div>


    </div>


  </div>
</template>

<script setup>
import { getUserIndentApi } from '@/apis/home';
import { useCounterStore } from '@/stores/counter';
import { ref, onMounted, watch } from 'vue';
import { useRoute ,useRouter } from 'vue-router';

const store = useCounterStore();
const orders = ref([]);
const route = useRoute();
const router = useRouter();
const activeTab = ref(0); // 默认显示第一个标签

// 监听路由参数变化
watch(() => route.query.flag, (newVal) => {
  if (newVal) {
    activeTab.value = parseInt(newVal);
  }
}, { immediate: true });

// 拼接图片路径函数
const getImgUrl = (img) => {
  return "http://127.0.0.1:5419" + img;
};

// 返回上一级
const gotoBack = () => history.back();

//点击logo图片返回首页
const goHome = () => {
    router.push('/home');
};

//跳转搜索页
const gotoSearch = () => {
    router.push('/search');
};

// 格式化时间
const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

// 获取用户订单信息
const getOrders = async () => {
  try {
    const res = await getUserIndentApi(store.userInfo.userId);
    orders.value = res.data.userIndentList || [];
  } catch (error) {
    console.error('获取订单失败:', error);
  }
};

onMounted(() => {
  getOrders();
});
</script>

<style scoped>
/* 整体布局 */
.demo {
  background-color: #f5f6fa;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

/* 头部添加内容位置及样式 */
.headcontent {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  transition: box-shadow 0.3s ease;
  margin-bottom: 20px;
}

.headcontent:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* logo 图片样式 */
.logopicture img {
  width: 120px;
  cursor: pointer;
  margin-left: 15px;
  transition: transform 0.3s ease;
}

.logopicture img:hover {
  transform: scale(1.25);
}

/* 搜索框位置及样式 */
.search {
  width: 75%;
  margin-left: 10px;
}

.search .van-search {
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  transition: border-color 0.3s ease;
}

.search .van-search:hover {
  border-color: #007bff;
}

/* 搜索按钮位置及样式 */
.searchbutton {
  padding-right: 20px;
}

.searchbutton .van-button {
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s ease;
}

.searchbutton .van-button:hover {
  background-color: #0056b3;
}

/* 订单页头部 */
.shoppingcarthead {
  width: 100%;
  margin-top: 0px;
}

/* 标签页样式 */
.ordertabs {
  width: 80%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: box-shadow 0.3s ease;
}

.ordertabs:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* 标签样式 */
.van-tabs__nav {
  background-color: #f9fafb;
  border-radius: 8px;
}

.van-tab {
  padding: 10px 15px;
  transition: background-color 0.3s ease;
}

.van-tab--active {
  background-color: #e2e8f0;
  border-radius: 8px;
}

.van-tab:hover {
  background-color: #edf2f7;
}

/* 订单列表样式 */
.order-list {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 订单列表内容宽度 */
.order-list-content{
  width: 95%;
  margin-top: 15px;
}

.order-item {
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin-bottom: 20px;
  padding: 15px;
  position: relative;
}

.order-item:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.order-header {
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.05em;
  position: relative;
}

.order-time {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #777;
}


.order-goods {
  display: flex;
  align-items: center;
}

.goods-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
  transition: transform 0.3s ease;
}

.goods-img:hover {
  transform: scale(1.1);
}

.goods-info {
  line-height: 1.5;
}

.goods-name {
  font-size: 18px;
  font-weight: 600;
}

.order-total {
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: #FF6B6B;
  text-shadow: 1px 1px 2px rgba(255, 107, 107, 0.3);
  text-align: right;
}

.goods-price {
  font-size: 16px;
  margin-bottom: 3px;
}

/*  */
.OrderTabsContent{
  margin-top: 10px;
}
</style>    