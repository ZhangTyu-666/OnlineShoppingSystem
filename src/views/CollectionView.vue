<template>

    <div class="demo">

        <!-- 收藏页头部 -->
        <div class="collectionhead">
            <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click="gotoBack" />
        </div>

        <!-- 收藏页内容 -->
        <div class="collectioncontent">

            <!-- 收藏页导航 -->
            <van-tabs v-model:active="activeTab" sticky type="card">
                <van-tab v-for="value in arr" :key="value.flag" :title="value.title">

                    <!-- 店铺收藏 -->
                    <ul v-if="value.flag === 0">
                        <li v-for="v in data.shopsList" :key="v.shopId" class="shadow-effect">
                            <div class="shopscollection">
                                <van-card  :desc=v.shopAddress :title=v.shopName currency
                                    :thumb="getImgUrl(v.shopPicture)" @click="gotoshops(v.shopId)">
                                    <template #footer>
                                        <div class="shopstype">
                                            <van-tag plain type="primary">{{ v.shopComments }}</van-tag>
                                        </div>
                                    </template>
                                </van-card>
                                <!-- <img :src="getImgUrl(v.shopPicture)">
                                <div class="content">
                                    <h3 style="font-weight: bold; margin-top: 10px;">{{ v.shopName }}</h3>
                                    <h5 class="address">{{ v.shopAddress }}</h5>
                                </div> -->
                            </div>
                        </li>
                    </ul>

                    <!-- 商品收藏 -->
                    <ul v-else="value.flag === 1">
                        <li v-for="v in data.goodsList" :key="v.goodId" class="shadow-effect">
                            <div class="goodscollection">
                                <van-card :price=v.goodPrice :desc=v.goodMessage :title=v.goodName
                                    :thumb="getImgUrl(v.goodPicture)" @click="gotogoods(v.goodId)">
                                    <template #footer>
                                        <div class="goodsrate">
                                            <span>商品评分:{{ v.goodRate }}<van-icon name="star"/></span>
                                        </div>
                                    </template>
                                </van-card>
                            </div>
                        </li>
                    </ul>

                </van-tab>

            </van-tabs>

        </div>

        <!-- 底部版权图片 -->
        <div class="downlogopicture">
            <img src="../assets/底部版权图片.jpg">
        </div>

    </div>
</template>

<script setup>
import { getCollection1InfoApi, getCollection2InfoApi } from '@/apis/home';
import { useCounterStore } from '@/stores/counter';
import { useRouter, useRoute } from "vue-router";
import { onMounted, reactive } from 'vue';

const store = useCounterStore();
const router = useRouter();
const route = useRoute();
const activeTab = ref(0); // 默认显示第一个标签

// 监听路由参数变化
watch(() => route.query.flag, (newVal) => {
  if (newVal) {
    activeTab.value = parseInt(newVal);
  }
}, { immediate: true });

const data = reactive({
    shopsList: [],
    goodsList: [],
});

const arr = reactive([
    {
        flag: 0,
        title: '店铺收藏'
    },
    {
        flag: 1,
        title: '商品收藏'
    }
]);

// 拼接图片路径函数
const getImgUrl = (img) => {
    return "http://127.0.0.1:5419" + img;
};

//返回上一级
const gotoBack = () => history.back();

// 跳转店铺详情页
const gotoshops = (e) => {
    router.push({
        name: "shop",
        params: {
            shopId: e,
        },
    });
};

// 跳转商品详情页
const gotogoods = (e) => {
    router.push({
        name: "goods",
        params: {
            goodId: e,
        },
    });
};

// 获取店铺的列表信息
const getShops = async (e) => {
    const res = await getCollection1InfoApi(e);
    console.log(res);
    data.shopsList.push(...res.data.shopsList);
};

// 获取商品的列表信息
const getGoods = async (e) => {
    const res = await getCollection2InfoApi(e);
    console.log(res);
    data.goodsList.push(...res.data.goodsList);
};

onMounted(() => {
    getShops(store.userInfo.userId);
    getGoods(store.userInfo.userId);
});
</script>

<style scoped>
.demo {
    width: 100%;
    height: 100%;
    background-color: #f5f6fa;
}

/* 收藏页头部 */
.collectionhead {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
}

/* 收藏页内容 */
.collectioncontent {
    width: 80%;
    margin: 0 auto;
    margin-top: 25px;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
}

/* 收藏页导航栏位置 */
:deep(.van-tabs__nav--card) {
    margin-top: 20px;
}

ul {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    /* 允许子元素换行 */
    list-style: none;
    /* 移除默认的列表样式 */
    margin: 0 auto;
    margin-top: 20px;
}

li {
    width: 22%;
    margin: 15px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.shadow-effect {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

li:hover {
    border: 1px solid #1989fa;
    border-radius: 10px;
    transition: all .5s;
}

:deep(.van-card__price) {
    color: #f00;
}

.shopstype{
    margin-top: -21px;
    margin-right:55px;
}

/*店铺外送 */
.goodsrate {
    margin-top: -20px;
    margin-right: -10px;
}

/*店铺外送时间 */
.goodsrate>span {
    border: 0.5px solid #1989fa;
    border-radius: 2px;
    color: #1989fa;
}

/* 底部版权图片位置 */
.downlogopicture {
    width: 100%;
    margin-top: 20px;
}

/* 底部版权图片样式 */
.downlogopicture>img {
    width: 100%;
    margin-bottom: -8px;
}
</style>