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

        <!-- 购物车内容 -->
        <div class="shoppingcartcontent">

            <!-- 购物车头部 -->
            <div class="shoppingcarthead">
                <van-nav-bar title="购物车" left-text="返回" left-arrow @click="gotoBack" />
            </div>

            <!-- 购物车商品数量 -->
            <div class="shoppingcartgoodsnumber">
                全部商品:{{ data.shoppingCartList.length }}
            </div>
            <!-- 购物车商品组别 -->
            <div class="shoppingcartgoodsgroup">
                <ul>
                    <li style="width: 20%; margin-left: 5%;">商品</li>
                    <li style="width: 30%; margin-left: 0;">信息</li>
                    <li style="width: 20%; margin-left: 0;">数量</li>
                    <li style="width: 20%; margin-left: 0;">单价</li>
                </ul>
            </div>
            <!-- 购物车商品内容 -->
            <div class="shoppingcartgoodscontent" ref="goodsContentRef">
                <van-checkbox-group v-model="selectedItems" ref="checkBox" shape="square">
                    <ul>
                        <li v-for="value in data.shoppingCartList" :key="value.shoppingCartId">
                            <van-swipe-cell>
                                <template #left>
                                    <van-checkbox :name="value" style="margin: 0 auto;height: 100%;margin-left: 1%;">
                                    </van-checkbox>
                                </template>
                                <div class="goods-card">
                                    <div class="product-container">
                                        <div class="shop-name">{{ value.shopName }}</div>
                                        <div class="goods-image" style="width: 100%; margin-left: 0;">
                                            <img :src="getImgUrl(value.goodPicture)" />
                                        </div>
                                    </div>
                                    <div class="goodscontent">
                                        <span class="goods-info" style="width: 30%;">
                                            <span class="goods-name">{{ value.goodName }}</span><br>
                                            <span class="goods-description">{{ value.goodMessage }}</span>
                                        </span>
                                        <span class="goods-quantity" style="width: 20%;">
                                            <van-button size="mini" @click="add(value.shoppingCartId)"
                                                class="quantity-button">+</van-button>
                                            <span>{{ value.goodNumber }}</span>
                                            <van-button size="mini" @click="minus(value.shoppingCartId)"
                                                class="quantity-button">-</van-button>
                                        </span>
                                        <span class="goods-price" style="width: 20%;padding-right: 70px;">￥{{
                                            value.goodPrice }}</span>
                                    </div>
                                </div>
                                <template #right>
                                    <van-button square type="danger" @click="onDelete(value.shoppingCartId)"
                                        class="delete-button">删除</van-button>
                                </template>
                            </van-swipe-cell>
                        </li>
                    </ul>
                </van-checkbox-group>
            </div>


            <!-- 底部支付栏 -->
            <div class="footer" :class="{ 'fixed-bottom': data.shoppingCartList.length === 0 }">
                <van-submit-bar :price="totalPrice" button-text="提交订单" @click="onSubmit()">
                    <van-checkbox v-model="checked" @change="onChange">全选</van-checkbox>
                    <!-- <template #tip>
                        全部删除:<span @click="onClickLink">修改地址</span>
                    </template> -->
                </van-submit-bar>
            </div>


        </div>
        <!-- 底部版权图片 -->
        <!-- <div class="downlogopicture">
            <img src="../assets/底部版权图片.jpg">
        </div> -->
    </div>
</template>


<script setup>
import { getShoppingCartApi, delShoppingCartInfoApi, delAllShoppingCartInfoApi, insertUserIndentInfoApi, getUserIndentApi } from '@/apis/home';
import { useCounterStore } from '@/stores/counter';
import { useRoute, useRouter } from "vue-router";
import { onMounted, computed, ref, reactive } from 'vue';


const store = useCounterStore();
const route = useRoute();
const router = useRouter();

const goodsContentRef = ref(null);
const list = ref([]);
const data = reactive({
    shoppingCartList: []
});
const selectedItems = ref([]);
const checkBox = ref(null);
const checked = ref(false);
//const goodsInfo = ref({});


// 拼接图片路径函数
const getImgUrl = (img) => {
    return "http://127.0.0.1:5419" + img;
};

//点击logo图片返回首页
const goHome = () => {
    router.push('/home');
};

//跳转搜索页
const gotoSearch = () => {
    router.push('/search');
};

//返回上一级
const gotoBack = () => history.back();

// 
const buynumber = ref(1);


// 增加商品数量
const add = (e) => {
    data.shoppingCartList[data.shoppingCartList.findIndex(obj => obj.shoppingCartId === e)].goodNumber++;
};


// 减少商品数量
const minus = (e) => {
    if (data.shoppingCartList[data.shoppingCartList.findIndex(obj => obj.shoppingCartId === e)].goodNumber > 1) {
        data.shoppingCartList[data.shoppingCartList.findIndex(obj => obj.shoppingCartId === e)].goodNumber--;
    }
};

// 删除购物车商品
const onDelete = async (e) => {
    delShoppingCartInfo(e);
    data.shoppingCartList.splice(data.shoppingCartList.findIndex(obj => obj.shoppingCartId === e), 1);

    // 刷新购物车商品信息
    //await getShoppingCart(store.userInfo.userId);
};

// 删除购物车全部商品
const onClickLink = () => {
    delAllShoppingCartInfo(result.value);
};

// 购买购物车商品
const onChange = (e) => {
    if (e === true) {
        checkBox.value.toggleAll(true);
    };
    if (e === false) {
        checkBox.value.toggleAll(false);
    };
};

// 计算购物车商品价格
const totalPrice = computed(() => {
    let sum = 0;
    return data.shoppingCartList.reduce((sum, item) => sum + item.goodPrice * item.goodNumber * 100, 0);
});


// 提交商品订单
const onSubmit = async () => {
    try {
        if (selectedItems.value.length === 0) {
            alert('请选择要购买的商品');
            return;
        }

        // 购买商品时间 - 格式化为当前计算机的年月日时分秒
        const now = new Date();
        const currentTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        for (const item of selectedItems.value) {
            await insertUserIndent(
                store.userInfo.userId,
                item.shopId,
                item.goodId,
                item.shopName,
                item.goodName,
                item.goodPicture,
                item.goodMessage,
                item.goodNumber,
                item.goodPrice,
                currentTime // 传递格式化的时间戳
            );
        }

        // 从购物车中删除已提交的商品
        const idsToRemove = selectedItems.value.map(item => item.shoppingCartId);
        await delAllShoppingCartInfoApi(idsToRemove);

        // 添加商品订单
        data.shoppingCartList = data.shoppingCartList.filter(item => !idsToRemove.includes(item.shoppingCartId));
        selectedItems.value = [];
        alert('订单提交成功！');
    } catch (error) {
        console.error('提交订单失败:', error);
        alert('提交订单失败，请重试');
    }
};


// 添加商品订单信息
const insertUserIndent = async (
    userId,
    shopId,
    goodId,
    shopName,
    goodName,
    goodPicture,
    goodMessage,
    goodNumber,
    goodPrice,
    userIndentTime
) => {
    const res = await insertUserIndentInfoApi(
        userId,
        shopId,
        goodId,
        shopName,
        goodName,
        goodPicture,
        goodMessage,
        goodNumber,
        goodPrice,
        userIndentTime
    );
    return res;
};


// 获取用户商品订单信息
const getUserIndent = async (userId) => {
    const res = await getUserIndentApi(userId);
    return res.data.userIndentList;
};


// 获取商品详情信息
// const getGoodsInfo = async (e) => {
//     const res = await getGoodsInfoApi(e);
//     console.log(res);
//     goodsInfo.value = res.data;
//     console.log(goodsInfo.value);
// };


// 获取购物车信息
const getShoppingCart = async (e) => {
    const res = await getShoppingCartApi(e);
    console.log(res);
    //list.value.splice(0);
    //list.value.push(...res.data.shoppingCartList);
    data.shoppingCartList.push(...res.data.shoppingCartList);
};

// 删除单个购物车信息
const delShoppingCartInfo = async (e) => {
    const res = await delShoppingCartInfoApi(e);
    console.log(res);
    if (res.code === 200) {
        getShoppingCart(store.userInfo.userId);
    }
};

// 删除全部购物车信息
const delAllShoppingCartInfo = async (e) => {
    const res = await delAllShoppingCartInfoApi(e);
    console.log(res);
    if (res.code === 200) {
        getShoppingCart(store.userInfo.userId);
    }
};

onMounted(() => {
    //getGoodsInfo();
    getShoppingCart(store.userInfo.userId);
    getUserIndent(store.userInfo.userId);
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

/* 购物车头部 */
.shoppingcarthead {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    background-color: #fff;
}


/*  */
:deep(.van-nav-bar__content) {
    border-radius: 15px;
}

/* 购物车内容 */
.shoppingcartcontent {
    width: 80%;
    margin: 0 auto;
    margin-top: 15px;
    min-height: 600px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    padding-bottom: 100px;
    /* 为底部支付栏预留足够空间 */
}


.shoppingcartgoodsnumber {
    margin-left: 25px;
    padding-top: 15px;
    font-size: 20px;
    color: #1989fa;
    font-weight: 600;
}


.shoppingcartgoodsgroup {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    height: 50px;
    line-height: 50px;
    background-color: #f3f3f3;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
}


.shoppingcartgoodsgroup>ul {
    display: flex;
    list-style: none;
    padding: 0;
    width: 100%;
    justify-content: space-between;
}


.shoppingcartgoodsgroup>ul>li {
    text-align: center;
    font-weight: bold;
}


.shoppingcartgoodscontent {
    width: 100%;
    margin: 0 auto;
    list-style: none;
    padding: 0;
    min-height: 100px;
    position: relative;
}


.goods-card {
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}


.product-container {
    width: 20%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
}


.shop-name {
    font-weight: 600;
    margin-bottom: 5px;
}


.goods-image {
    width: 100%;
    text-align: center;
}


.goods-image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    /* border-radius: 50%;
    border: 2px solid #ddd; */
}


.goodscontent {
    display: flex;
    align-items: center;
    width: 70%;
    justify-content: space-between;
}


.goods-info {
    width: 30%;
    text-align: center;
}


.goods-name {
    font-weight: 700;
    margin-bottom: 5px;
}


.goods-description {
    font-size: 12px;
    color: #666;
}


.goods-quantity {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0;
}


.quantity-button {
    width: 25px;
    margin: 0 5px;
    background-color: #f3f3f3;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}


.quantity-button:hover {
    background-color: #ddd;
}


.goods-price {
    width: 20%;
    margin-left: 0px;
    text-align: center;
    font-weight: 600;
}


.delete-button {
    height: 100%;
    width: 60px;
}


.footer {
    width: 80%;
    background-color: #1989fa;
    z-index: 1;
    border-radius: 10px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}


.fixed-bottom {
    background-color: #1989fa;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}


:deep(.van-submit-bar) {
    position: relative;
    top: 0;
    left: 0;
}


/* 底部版权图片位置 */
.downlogopicture {
    width: 100%;
}


/* 底部版权图片样式 */
.downlogopicture>img {
    width: 100%;
    margin-bottom: -8px;
}
</style>
