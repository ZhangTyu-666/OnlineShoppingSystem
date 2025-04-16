<template>
    <div class="demo">

        <!-- 店铺头部信息 -->
        <div class="shopheadmessage">

            <!-- 返回按钮 -->
            <div class="backbutton">
                <van-button type="primary" @click="onBack">返回</van-button>
            </div>

            <!-- 店铺店名 -->
            <div class="shopname">
                <span>{{ shopInfo.shopName }}</span>
            </div>

            <!-- 店铺图片 -->
            <div class="shoppicture">
                <img :src="getImgUrl(shopInfo.shopPicture)">
            </div>

            <!-- 店铺功能按钮 -->
            <div class="shopfunctionbutton">
                <!-- <van-button type="primary" @click="onCollection(shopInfo.shopId)">收藏店铺</van-button> -->
                <van-button type="danger" @click="goCollection">收藏页</van-button>
                <van-button :icon="[flag ? icon.name2 : icon.name1]" type="primary"
                    @click="onCollection(shopInfo.shopId)">收藏店铺</van-button>
            </div>

        </div>

        <!-- 店铺下拉菜单 -->
        <!-- <div class="downmenu">
            <div class="downmenucontent">
                <ul>
                    <li>首页</li>
                    <li>Mac</li>
                    <li>iPad</li>
                    <li>iPhone</li>
                    <li>Watch</li>
                    <li>AirPods</li>
                    <li>配件</li>
                    <li>App Store充值卡</li>
                </ul>
            </div>
        </div> -->

        <!-- 店铺商品轮播图 -->
        <div class="shopgoodsswiper">
            <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#84B0DB" loop style="height: 600px;"
                active-color="#000">
                <van-swipe-item v-for="value in shopInfo.goodsList" :key="value.goodId"
                    @click="goto(value.shopInfo.goodId)">
                    <img :src="getImgUrl(value.goodPicture)">
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 店铺Iphone商品内容 -->
        <!-- <div class="Iphone">
            <span style="font-size: 24px;color: #666;font-weight: 700;">iPhone </span><br>
            <img src="../assets/Iphone.jpg">
        </div> -->

        <!-- 店铺商品内容 -->
        <div class="shopgoodscontent">
            <ul>
                <li v-for="value in shopInfo.goodsList" :key="value.goodId" @click="goto(value.goodId)">
                    <div class="goodscontent">
                        <img :src="getImgUrl(value.goodPicture)">
                        <span class="goods-name">{{ value.goodName }}</span><br>
                        <span class="goods-message"> {{ value.goodMessage }}</span><br>
                        <span class="goods-rating">￥{{ value.goodPrice }}</span>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script setup>
import { getShopInfoApi, insertCollectionShopInfoApi, shopInfoApi, getGoodsApi, getGoodsCommentsApi } from "@/apis/home";
import { useCounterStore } from "@/stores/counter";
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";

const store = useCounterStore();
const route = useRoute();
const router = useRouter();

const shopInfo = ref({});
const goodsList = ref([]);
const goodscommentsList = ref([]);

// 收藏图标
const icon = reactive({
    name1: 'star-o', //空心
    name2: 'star'    //实心
});

const flag = ref(false);

// 拼接图片路径函数
const getImgUrl = (img) => {
    return "http://127.0.0.1:5419" + img;
};

//添加收藏事件
const onCollection = (e) => {
    collectionShops(store.userInfo.userId, e);
};

// 获取店铺详情信息
const getShopInfo = async (shopId) => {
    const res = await getShopInfoApi(shopId);
    console.log(res);
    shopInfo.value = res.data;
    //goodsList.value.push(...res.rows);
};

// 获取商品的列表信息
// const getGoods = async () => {
//     const res = await getGoodsApi();
//     console.log(res);
//     goodsList.value.push(...res.rows);
// };

// 添加收藏API函数
const collectionShops = async (userId, shopId) => {
    const res = await insertCollectionShopInfoApi(userId, shopId);
    console.log(res);
    if (res.code === 200) {
        flag.value = !flag.value;
    }
};

// 获取商品评论接口
// const getGoodsComments = async (goodId) => {
//     const res = await getGoodsCommentsApi(goodId);
//     console.log(res);
//     goodscommentsList.value.push(...res.rows);
// };

// 查询收藏店铺列表
const getCollectionShop = async (userId, shopId) => {
    const res = await shopInfoApi(userId, shopId);
    console.log(res);
    if (res.total > 0) {
        flag.value = true;
    }
    if (res.total === 0) {
        flag.value = false;
    }
};

// 跳转详情页
const goto = (e) => {
    router.push({
        name: "goods",
        params: {
            goodId: e,
        },
    });
};

//跳转收藏页
const goCollection = () => {
    router.push('/collection');
};

//返回上一级
const onBack = () => history.back();

onMounted(() => {
    console.log(route.params.shopId);
    getShopInfo(route.params.shopId);
    //getGoods();
    getCollectionShop(store.userInfo.userId, route.params.shopId);
});
</script>

<style scoped>
.demo {
    background-color: #f5f6fa;
}

.shopheadmessage {
    background-color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    /* 垂直居中 */
}

.backbutton {
    position: absolute;
    left: 0;
    top: 0;
}

.shopname {
    /* position: absolute;
    top: 8%;
    left: 20%; */
    margin-left: 30%;
    /* 根据需要调整间距 */
}

.shopname>span {
    font-size: 22px;
    font-weight: 700;
}

.shoppicture {
    margin-left: 20px;
    margin-top: 10px;
}

.shoppicture>img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    /* 确保图片保持比例 */
}

.shopfunctionbutton {
    margin-left: 20px;
    /* 根据需要调整间距 */
    display: flex;
    /* 如果按钮内有图标和文字，确保它们在一行 */
    align-items: center;
    /* 垂直居中按钮内的内容 */
}

.downmenu {
    width: 100%;
    background-color: #333333;
    height: 40px;
}

.downmenucontent>ul {
    display: flex;
    flex-wrap: wrap;

}

.downmenucontent>ul>li {
    color: #fff;
    margin: 8px auto;
}

.shopgoodsswiper {
    width: 80%;
    /* 调整为100%，以响应页面宽度 */
    height: 600px;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    /* 防止内容溢出 */
}

/* 推荐内容轮播图样式 */
.van-swipe {
    width: 100%;
    height: 100%;
}

/* 推荐内容轮播图样式 */
.van-swipe-item {
    width: 100%;
    height: 100%;
}

/* 推荐内容轮播图样式 */
.van-swipe-item>img {
    width: 50%;
    height: 100%;
    margin-left: 25%;
    /* object-fit: cover;  */
    /* 确保图片保持比例  */
}

.Iphone {
    width: 70%;
    margin: 80px auto 0 auto;
}

.Iphone>img {
    width: 100%;
}

.shopgoodscontent {
    width: 80%;
    display: flex;
    margin: -10px auto;
    margin-top: 20px;
    background-color: #f5f6fa;
}

.shopgoodscontent>ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    /* 允许子元素换行 */
    list-style: none;
    /* 移除默认的列表样式 */
    margin-left: 40px;
}

.shopgoodscontent>ul>li {
    width: 24%;
    margin: 2px;
    border-radius: 10px;
}

/* .shopgoodscontent>ul>li>img {
    width: 150px;
    height: 150px;
} */

/* 首页店铺内容样式 */
.goodscontent {
    padding: 10px;
    /* margin-top: 10px; */
    background-color: #fff;
}

/* 首页店铺内容鼠标悬浮样式 */
.goodscontent:hover {
    border: 1px solid #1989fa;
    border-radius: 10px;
    transition: all .5s;
}

/* 首页店铺单个内容图片样式 */
.goodscontent>img {
    width: 100%;
    height: 238px;
    border-radius: 15px;
}

.goods-name {
    display: block;
    text-align: center;
    font-size: 20px;
}

.goods-message {
    display: block;
    text-align: center;
}

/* 首页店铺单个内容标签样式 */
.goods-rating {
    display: block;
    text-align: center;
    font-size: 20px;
    color: #f00;
    font-size: 20px;
    font-weight: 600;
}
</style>
