<template>
  <div class="demo">

    <!-- 首页头部内容 -->
    <div class="headcontent">

      <!-- logo图片 -->
      <div class="logopicture">
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

    <!-- 首页推荐内容 -->
    <div class="recommendcontent">

      <!-- 商品推荐类型 -->
      <div class="recommendtype">
        <img src="../assets/广告位招租.jpg">
      </div>

      <!-- 商品推荐轮播图 -->
      <div class="recommendswiper">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <img src="../assets/swiper1.jpg" style="width: 100%;">
          </van-swipe-item>
          <van-swipe-item>
            <img src="../assets/swiper2.jpg" style="width: 100%;">
          </van-swipe-item>
          <van-swipe-item>
            <img src="../assets/swiper3.jpg" style="width: 100%;">
          </van-swipe-item>
          <van-swipe-item>
            <img src="../assets/swiper4.jpg" style="width: 100%;">
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 个人登录栏 -->
      <div class="userloginmessage">

        <!--  个人登录信息  -->
        <div class="usermessagepic" @click="goUser">
          <img src="../assets/头像.JPG">
        </div>

        <!-- 个人登录注册文字 -->
        <div class="usermessagetitle">
          <h2 style="font-weight: 800px;">Hi 你好</h2>
          <span style="font-size: 12px;color: #9c9c9c;" @click="gotoRegister">注册</span>
        </div>

        <!-- 个人登录文字 -->
        <div class="usermessagelogintitle">
          <h3 style="font-weight: 800px;text-align: center;">登录后更多精彩</h3>
          <h6 style="font-size: 12px;color: #9c9c9c;text-align: center;">嘿！更懂你的推荐，更便捷的搜索</h6>
        </div>

        <!-- 个人登录按钮 -->
        <div class="userloginbutton">
          <van-button type="primary" style="width: 80%;border-radius: 10px;" @click="goLogin">登录</van-button>
        </div>

        <!-- 个人登录页导航栏 -->
        <div class="userloginnav">

          <!-- 个人登录页店铺收藏导航栏 -->
          <div class="shopscollection" @click="gotoCollection(0)">
            <van-icon name="shop-collect-o" class="navicon" />
            <span>店铺收藏</span>
          </div>

          <!-- 个人登录页商品收藏导航栏 -->
          <div class="goodscollection" @click="gotoCollection(1)">
            <van-icon name="star-o" class="navicon" />
            <span>商品收藏</span>
          </div>

          <!-- 个人登录页购物车导航栏 -->
          <div class="shoppingcart">
            <van-icon name="shopping-cart-o" class="navicon" @click="gotoShoppingCart" />
            <span>购物车</span>
          </div>

        </div>

        <!-- 个人登录商品推荐图片 -->
        <!-- <div class="userloginrecommendpic">
          <img src="../assets/个人登录内容推荐图片.jpg">
        </div> -->
      </div>

    </div>

    <!-- 首页推荐店铺内容 -->
    <div class="recommendshopscontent">
      <ul>
        <li v-for="value in shopsList" :key="value.shopId" @click="goto(value.shopId)">
          <div class="shopscontent">
            <img :src="getImgUrl(value.shopPicture)">
            <span class="self-operated"
              style="background-color: #f00;color: #fff;font-size: 15px;border-radius: 5px;">自营</span>
            <span style="margin-left: 5px;">{{ value.shopName }}</span><br>
            <span>{{ value.shopAddress }}</span><br>
            <span>{{ value.shopTypeName }}</span>
            <span class="shop-rating"
              style="background-color: #1989fa;color: #fff;font-size: 15px;border-radius: 5px;margin-top: 20px;">店铺评分：{{
                value.shopRate }}分</span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { getShopsApi, getShopInfoApi, getUserInfoApi } from "@/apis/home";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from '@/stores/counter';

const route = useRoute();
const router = useRouter();
const store = useCounterStore();
const active = ref(0);

const shopsList = ref([]);
//const UserInfo = ref([]);

// 拼接图片路径函数
const getImgUrl = (img) => {
  return "http://127.0.0.1:5419" + img;
};

//跳转注册页
const gotoRegister = () => {
  router.push('/register');
};

//跳转登录页
const goLogin = () => {
  router.push('/');
};

//跳转详情页
const goto = (e) => {
  router.push({
    name: "shop",
    params: {
      shopId: e,
    },
  });
};

//跳转搜索页
const gotoSearch = () => {
  router.push('/search');
};

//跳转收藏页
const gotoCollection = (flag) => {
  router.push({
    path:'/collection',
    query: { flag }  // 使用query传递参数(0-店铺收藏,1-商品收藏)
  });
};

//跳转用户页
const goUser = () => {
  router.push('/user')
};

//
const gotoShoppingCart = () => {
  router.push('/shoppingcart')
}

// 获取店铺的列表信息
const getShops = async () => {
  const res = await getShopsApi();
  console.log(res);
  shopsList.value.push(...res.rows);
};

// 用户登录信息接口
// const getUserInfo = async (userId) => {
//     const res = await getUserInfoApi(userId);
//     console.log(res);
//     UserInfo.value = res.data;
// };

onMounted(() => {
  getShops();
  //getUserInfo(store.UserInfo.userId);
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
    padding-right: 2px;
}

.searchbutton .van-button {
    background-color: #007bff;
    color: #fff;
    transition: background-color 0.3s ease;
}

.searchbutton .van-button:hover {
    background-color: #0056b3;
}

/* 推荐内容位置及样式 */
.recommendcontent {
  width: 80%;
  margin: 20px auto;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
}

/* 推荐内容类型位置及样式 */
.recommendtype {
  background-color: #fff;
  width: 25%;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.recommendtype>img {
  border-radius: 10px;
  margin-left: 5px;
}

/* 推荐内容轮播图位置及样式 */
.recommendswiper {
  width: 46%;
  height: 400px;
  margin-top: 20px;
  margin-left: 20px;
}

/* 推荐内容轮播图样式 */
.van-swipe {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

/* 推荐内容轮播图样式 */
.van-swipe-item {
  width: 100%;
  height: 100%;
}

/* 推荐内容轮播图样式 */
.van-swipe-item>img {
  width: 100%;
  height: 100%;
  /* object-fit: cover;  */
  /* 确保图片保持比例  */
}

/* 用户登录信息位置及样式 */
.userloginmessage {
  width: 22%;
  background-color: #f5f6fa;
  margin: 20px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 用户登录信息图片位置及样式 */
.usermessagepic {
  margin-bottom: 10px;
}

/* 用户登录信息图片样式 */
.usermessagepic>img {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.usermessagepic>img:hover {
  transform: scale(1.1); /* 悬停时放大 */
}

/* 用户登录信息文字 */
.usermessagetitle {
  text-align: center;
  margin-bottom: 10px;
}

/* 用户登录信息文字 */
.usermessagelogintitle {
  text-align: center;
  margin-bottom: 20px;
}

/* 用户登录按钮 */
.userloginbutton {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.userloginbutton .van-button {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  transition: all 0.3s ease;
}

.userloginbutton .van-button:hover {
  transform: translateY(-1px); /* 悬停时上移 */
}

/* 用户登录信息导航栏位置及样式 */
.userloginnav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 用户登录信息导航栏图标样式 */
.shopscollection,
.goodscollection,
.shoppingcart {
  width: 33%;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shopscollection:hover,
.goodscollection:hover,
.shoppingcart:hover {
  transform: translateY(-2px); /* 悬停时上移 */
}

/* 用户登录信息导航栏图标样式 */
.navicon {
  font-size: 25px;
  display: block;
  margin: 0 auto 5px;
  color: #007bff; /* 图标颜色 */
}

/* 用户登录信息导航栏图标样式 */
/* .userloginrecommendpic>img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;
} */

.userloginrecommendpic>img:hover {
  transform: scale(1.05); /* 悬停时放大 */
}


/* 首页店铺内容 */
.recommendshopscontent {
  width: 80%;
  display: flex;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 15px;
}

/* 首页店铺内容样式 */
ul {
  width: 100%;
  display: flex;
  margin: 0 auto;
  margin-left: 40px;
  flex-wrap: wrap;
  /* 允许子元素换行 */
  list-style: none;
  /* 移除默认的列表样式 */
}

/* 首页店铺单个内容大小 */
li {
  width: 21.5%;
  /* height: 368px; */
  margin-top: 15px;
  margin: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 首页店铺内容样式 */
.shopscontent {
  padding: 10px;
}

/* 首页店铺内容鼠标悬浮样式 */
.shopscontent:hover {
  border: 1px solid #1989fa;
  border-radius: 10px;
  transition: all .5s;
}

/* 首页店铺单个内容图片样式 */
.shopscontent>img {
  width: 100%;
  /* height: 238px; */
  border-radius: 15px;
}

/* 首页店铺单个内容标签样式 */
.self-operated,
.shop-rating {
  /* 自营标签和店铺评分标签的样式 */
  display: inline-block;
  padding: 2px 4px;
  border-radius: 5px;
}
</style>
