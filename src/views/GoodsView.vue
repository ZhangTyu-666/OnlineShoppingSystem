<template>

    <div class="demo">

        <!-- 首页头部内容 -->
        <div class="headcontent">

            <!-- logo图片 -->
            <div class="logopicture">
                <img src="../assets/国俭logo.jpg" @click="goHome">
            </div>

            <!-- 搜索框 -->
            <div class="search">
                <van-search placeholder="请输入搜索关键词" shape="round" @click="gotoSearch" />
            </div>

            <!-- 搜索按钮 -->
            <div class="searchbutton">
                <van-button type="primary" round @click="gotoSearch" style="width: 80px;">搜索</van-button>
            </div>

        </div>

        <!-- 商品头部信息 -->
        <div class="goodsheadmessage">
            <span style="margin-left: 20px;">
                <van-button @click="goBack" style="background-color: #1989fa;color: #fff;">
                    返回
                </van-button>
            </span>
            <span>
                <img :src="getImgUrl(goodsInfo.goodPicture)">
            </span>
            <span>{{ goodsInfo.goodName }}</span>
            <div class="goodsheadmessagebutton">
                <van-icon :name="[flag ? name.name2 : name.name1]" @click="onCollection(goodsInfo.goodId)">
                    收藏商品
                </van-icon>
                <van-icon name="shop-collect-o" @click="goCollection">
                    我的收藏
                </van-icon>
            </div>
        </div>

        <!-- 商品信息 -->
        <div class="goodsmessage">

            <!-- 商品图片 -->
            <div class="goodsmpicture">
                <img :src="getImgUrl(goodsInfo.goodPicture)">
            </div>

            <!-- 商品信息内容 -->
            <div class="goodsmessagecontent">
                <!-- <span>{{ shopInfo.shopName }}</span> -->

                <!-- 商品信息内容文字 -->
                <div class="goodsmessagecontenttitle">
                    <span style="background-color: #007fec;color: #fff;border-radius: 2px;font-size: 15px;">
                        门店有售
                    </span>
                    <span style="margin-left: 5px;font-size: 20px;font-weight: 700;">
                        {{ goodsInfo.goodComments }}
                        {{ goodsInfo.goodMessage }}
                    </span>
                    <div style="color: #f00;font-size: 12px;margin-top: 10px;">
                        【双11力度玩超大!】{{ goodsInfo.goodName }}系列领券立减500元,以旧换新加补500元,还享12期限时白条免息!超多优惠猛戳
                    </div>
                    <div class="timebuy">
                        <span>
                            <van-icon name="hot-o" style="font-size: 40px;color: #f00;" />
                        </span>
                        <span style="color: #f00;margin-left: 15px;">
                            秒杀预告
                        </span>
                        <span style="margin-left: 10px;">
                            11月11日 20:00
                        </span>
                    </div>
                    <div class="goodsmessagecontentprice">
                        <ul>
                            <li>
                                <span style="color: #b7b7b7;font-size: 14px;">
                                    价格
                                </span>
                                <span style="color: #f00;font-size: 28px;font-weight: 700;">
                                    ￥{{ goodsInfo.goodPrice }}
                                </span>
                                <br>
                            </li>
                            <li>
                                <span style="color: #b7b7b7;font-size: 14px;">
                                    优惠
                                </span>
                                <span style="color: #f00;border: 1px solid #f00;padding: 3px;margin-left: 10px;">
                                    满300减50
                                </span>
                            </li>
                            <li>
                                <span style="color: #b7b7b7;font-size: 14px;">
                                    促销
                                </span>
                                <span style="color: #f00;border: 1px solid #f00;padding: 3px;margin-left: 10px;">
                                    满额返劵
                                </span>
                                <span style="color: #666666;font-size: 14px;margin-left: 10px;">
                                    购指定产品满800元返充值卡100减5元优惠券(数量有限,返完为止)
                                </span>
                            </li>
                        </ul>
                    </div>

                    <!-- 商品购买数量 -->
                    <div class="goodsbuynumber">
                        <span>数量:</span><van-stepper v-model="value" />
                    </div>

                    <!-- 商品信息内容购买与收藏按钮 -->
                    <div class="goodsmessagecontentbutton">
                        <van-button @click="goBuying(goodsInfo.goodId)">
                            领劵购买
                        </van-button>
                        <van-button @click="onInsert(goodsInfo.shopId, goodsInfo.goodId)">
                            加入购物车
                        </van-button>
                    </div>

                </div>

                <!-- 商品信息内容按钮 -->
                <!-- <div class="goodsmessagecontentbutton">
                    <van-action-bar>
                        <van-action-bar-icon icon="shop-o" text="首页" color="#ee0a24" to="/" />
                        <van-action-bar-icon icon="cart-o" text="购物车" to="/cart" />
                        <van-action-bar-icon :icon="[collected ? icon.name2 : icon.name1]" text="已收藏" @click="onCollect" />
                        <van-action-bar-icon icon="star-o" @click="onCollection(goodsInfo.goodId)">收藏</van-action-bar-icon>
                        <van-action-bar-button type="warning" text="加入购物车" @click="onInsert(goodsInfo.goodPrice)" />
                        <van-action-bar-button type="danger" text="立即购买" />
                    </van-action-bar>
                </div> -->

            </div>

        </div>

        <!-- 商品评价及商品宣传图片 -->
        <div class="goodscommentspicture">

            <!-- 商品评论 -->
            <div class="goodscomments">
                <van-tabs v-model:active="active">
                    <van-tab title="用户评价">
                        <div style="margin-left: 13%;font-size: 20px;font-weight: 700;margin-top: 15px;">
                            用户评价
                        </div>

                        <ul>
                            <li v-for="value in goodsCommentsInfo" :key="value.goodId">
                                <div style="margin-left: 12%;margin-top: 2%;display: flex;align-items: center;">
                                    <el-avatar
                                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                    <div class="goodscommentsname">
                                        <span style="margin-left: 10px;">
                                            匿名
                                        </span>
                                        <div style="margin-left: 8px;">
                                            {{ value.goodCommentsName }}
                                        </div>
                                    </div>
                                </div>
                                <div class="goodscommentscontent" style="margin-left: 16.7%;">
                                    {{ value.goodCommentsContent }}
                                </div>
                                <div class="goodscommentpicture" style="margin-left: 16.5%;">
                                    <img :src="getImgUrl(value.goodCommentsPicture)">
                                </div>
                                <hr style="margin-left: 16.5%; width: 70%; border: 1px solid #ccc;">
                            </li>
                        </ul>

                    </van-tab>
                    <van-tab title="参数信息">
                        <div class="picture" style="margin: 0 auto;width: 80%;">
                            <img :src="getImgUrl(goodsInfo.goodPicture)" style="width: 100%;">
                        </div>

                    </van-tab>
                    <van-tab title="售后保障">
                        <img src="../assets/售后.jpg" alt="" style="width: 100%;">
                    </van-tab>
                </van-tabs>
            </div>

        </div>

        <!-- <div class="footer"></div> -->

    </div>

</template>

<script setup>
import { getShopInfoApi, getGoodsBuyingApi, getGoodsInfoApi, insertShoppingCartInfoApi, getGoodsCommentsInfoApi, insertCollectionGoodsInfoApi, goodsInfoApi } from "@/apis/home";
import { useCounterStore } from "@/stores/counter";
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";

const store = useCounterStore();
const route = useRoute();
const router = useRouter();
const activeName = ref('first')

const shopInfo = ref({});
const goodsInfo = ref({});
const goodsCommentsInfo = ref({});
const goodsBuyingList = ref([]);

// 收藏图标
const name = reactive({
    name1: 'like-o', //空心
    name2: 'like'    //实心
});

const flag = ref(false);

// 拼接图片路径函数
const getImgUrl = (img) => {
    return "http://127.0.0.1:5419" + img;
};

//点击logo图片返回首页
const goHome = () => {
    router.push('/home');
};

//返回上一页
const goBack = () => history.back();

//跳转搜索页
const gotoSearch = () => {
    router.push('/search');
};

//跳转收藏页
const goCollection = () => {
    router.push('/collection');
};

//添加收藏事件
const onCollection = (e) => {
    collectionGoods(store.userInfo.userId, e);
};

//获取店铺详情信息
// const getShopInfo = async (shopId) => {
//     const res = await getShopInfoApi(shopId);
//     console.log(res);
//     shopInfo.value = res.data;
// };

// 获取商品详情信息
const getGoodsInfo = async (goodId) => {
    const res = await getGoodsInfoApi(goodId);
    console.log(res);
    goodsInfo.value = res.data;
    console.log(goodsInfo.value);
};

// 添加收藏API函数
const collectionGoods = async (userId, goodId) => {
    const res = await insertCollectionGoodsInfoApi(userId, goodId);
    console.log(res);
    if (res.code === 200) {
        flag.value = !flag.value;
    }
};

// 查询收藏商品列表
const getCollectionGoods = async (userId, goodId) => {
    const res = await goodsInfoApi(userId, goodId);
    console.log(res);
    if (res.total > 0) {
        flag.value = true;
    }
    if (res.total === 0) {
        flag.value = false;
    }
};

// 获取商品直接购买的信息
const getGoodsBuying = async (goodId) => {
    const res = await getGoodsBuyingApi(goodId);
    console.log(res);
    //goodsBuyingList.value.push(...res.rows);
    goodsBuyingList.value = res.data;
};

//获取商品评论详情接口
const getGoodsCommentsInfo = async (goodId) => {
    const res = await getGoodsCommentsInfoApi(goodId);
    console.log(res);
    goodsCommentsInfo.value = res.data;
};

//跳转直接购买页
const goBuying = (e) => {
    router.push({
        name: "buy",
        params: {
            goodId: e,
        },
    });
};

// 加入购物车
const onInsert = (shopId, goodId) => {
    insertCart(store.userInfo.userId, shopId, goodId);
};

// 添加购物车商品信息
const insertCart = async (
    userId,
    shopId,
    goodId,
    shopAddress,
    shopName,
    goodName,
    goodPicture,
    goodMessage,
    goodNumber,
    goodPrice
) => {
    const res = await insertShoppingCartInfoApi(
        userId,
        shopId,
        goodId,
        shopAddress,
        shopName,
        goodName,
        goodPicture,
        goodMessage,
        goodNumber,
        goodPrice
    );
    console.log(res);
    return res;
};

const active = ref(0);

onMounted(() => {
    getGoodsInfo(route.params.goodId);
    getGoodsBuying();
    getGoodsCommentsInfo(route.params.goodId);
    getCollectionGoods(store.userInfo.userId, route.params.goodId);
    // getGoodsBuying();
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

.goodsheadmessage {
    width: 80%;
    height: 70px;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 15px;
    background-color: #fff;
    display: flex;
    align-items: center;
    /* 元素在一行 */
}

.goodsheadmessage>span>img {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-left: 30px;
}

.goodsheadmessagebutton {
    margin-left: 60%;
}

.goodsheadmessagebutton>.van-icon {
    border: 1px solid #e2e4e6;
    padding: 5px;
    border-radius: 5px;
    margin-right: 10px;
}

.goodsmessage {
    width: 80%;
    display: flex;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 20px;
}

.goodsmpicture {
    width: 50%;
    height: 416px;
    border-radius: 20px;
}

.goodsmpicture>img {
    width: 100%;
    height: 100%;
    /* object-fit: cover; 确保图片保持比例  */
}

.goodsmessagecontent {
    background-color: #fff;
    width: 100%;
}

.goodsmessagecontenttitle {
    margin-top: 5px;
    width: 100%;
}

.timebuy {
    display: flex;
    align-items: center;
    /* 元素在一行 */
    width: 95%;
    height: 42px;
    margin-top: 10px;
    background-color: #ececec;
}

.goodsmessagecontentprice {
    width: 95%;
    height: 140px;
    background-color: #f3f3f3;
}

.goodsmessagecontentprice>ul {
    width: 90%;
    margin: 0 auto;
}

.goodsmessagecontentprice>ul>li {
    padding-top: 10px;
}

.goodsbuynumber {
    margin-top: 15px;
}

.goodsmessagecontentbutton {
    display: flex;
    /* 使用flex布局来确保子元素紧密排列 */
}

.goodsmessagecontentbutton>.van-button {
    color: #fff;
    font-weight: 500;
    margin: 0;
    /* 确保没有外边距 */
    padding: 0;
    /* 确保没有内边距（如果有需要内边距，请根据需要设置） */
    /* 其他样式保持不变 */
}

.goodsmessagecontentbutton>button:nth-of-type(1) {
    margin-top: 25px;
    /* 如果只需要第一个按钮有上边距，可以这样设置 */
    width: 235px;
    height: 48px;
    background-color: #ff4f00;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    /* 注意：这里不需要设置右边框的圆角，因为两个按钮是紧挨着的 */
}

.goodsmessagecontentbutton>button:nth-of-type(2) {
    margin-top: 25px;
    /* 如果只需要第一个按钮有上边距，可以这样设置 */
    background-color: #ff9b02;
    width: 235px;
    height: 48px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    /* 注意：这里不需要设置左边框的圆角，因为两个按钮是紧挨着的 */
}

.goodscommentspicture {
    width: 80%;
    margin: 0px auto;
    background-color: #fff;
}

.goodscomments {
    padding-top: 30px;
}

.goodscommentsname {
    margin-left: 10px;
}

/* :deep(.van-tabs--line .van-tabs__wrap){
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
} */
</style>