<template>

    <div class="demo">

        <!-- 搜索页头部内容 -->
        <div class="headcontent">

            <!-- logo图片 -->
            <div class="logopicture">
                <img src="../assets/国俭logo.jpg" @click="goHome">
            </div>

            <!-- 搜索框 -->
            <div class="search">
                <van-search v-model="message" placeholder="请输入搜索关键词" @search="onSearch" shape="round"
                    @click-input="onClear" />
            </div>

            <!-- 搜索按钮 -->
            <div class="searchbutton">
                <van-button type="primary" round @click="onCancel" style="width: 80px;">取消</van-button>
            </div>

        </div>

        <!-- 搜索记录 -->
        <div class="content">
            <span class="hissearch">历史搜索</span>
            <span class="delete">
                <van-icon name="delete-o" @click="fn" />
            </span>
            <ul>
                <li v-for="(value, index) in store.searchHistory" :key="index" @click="onClick(value)"
                    class="searchtitle2">
                    <span>{{ value }}</span>
                </li>
            </ul>
        </div>

        <div class="searchInfo">

            <!-- 这里写搜索内容，用v-for遍历输出 -->
            <div class="searchnumber"> 总共查询到:{{ total }}条</div>

            <!-- 搜索内容 -->
            <div class="searchcontent">
                <ul>
                    <li v-for="value in list" :key="value.good_id" class="shadow-effect">
                        <div class="searchgoodscontent">
                            <van-card :price="value.goodPrice" :desc="value.goodMessage" :title="value.goodName"
                                :thumb="getImgUrl(value.goodPicture)" @click="goto(value.goodId)">
                                <template #footer>
                                    <div class="goodsrate">
                                        <span>商品评分:{{ value.goodRate }}<van-icon name="star"/></span><br>
                                        <span>{{ value.shopName }}</span>
                                    </div>
                                </template>
                            </van-card>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

    </div>
</template>

<script setup>
import { getSearchInfoApi, getGoodsInfoApi } from '@/apis/home';
import { useCounterStore } from '@/stores/counter';
import { useRouter } from "vue-router";
import { showFailToast } from 'vant';

const router = useRouter();
const store = useCounterStore();
const goodsInfo = ref({});


// 拼接图片路径函数
const getImgUrl = (img) => {
    return "http://127.0.0.1:5419" + img;
};

//存搜索内容
const list = ref([]);

//存搜索到列表信息的数据
const total = ref(0);

const message = ref("");

//搜索事件
const onSearch = () => {
    searchGoods(message.value);

    //插入搜索记录
    if (store.searchHistory.indexOf(message.value) === -1) {
        store.searchHistory.unshift(message.value);
    }
    else {
        store.searchHistory.splice(store.searchHistory.indexOf(message.value), 1);
        store.searchHistory.unshift(message.value);
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

// 获取店铺详情信息
const getGoodsInfo = async (goodId) => {
    const res = await getGoodsInfoApi(goodId);
    console.log(res);
    goodsInfo.value = res.data;
};

//取消事件
const onCancel = () => {
    message.value = "";
    history.back();
};

//点击logo图片返回首页
const goHome = () => {
    router.push('/home');
};

//清空上一次搜索内容
const onClear = () => {
    // list.value.splice(0);
    // message.value = "" ;
    if (message.value === '') {
        return;
    };
    if (message.value !== '') {
        list.value.splice(0);
    };
};

//点击搜索记录进行查询
const onClick = (e) => {
    if (list.value.length === 0) {
        searchGoods(e);
    };
    if (list.value.length > 0) {
        list.value.splice(0);
        searchGoods(e);
    };
};

//清空搜索记录
const fn = () => {
    store.clearSearchHistory();
};

//校验搜索结果
const searchGoods = async (e) => {
    const res = await getSearchInfoApi(e);
    console.log(res);
    total.value = res.total;
    if (total.value === 0) {
        showFailToast("未查到搜索内容!");
    }
    else {
        list.value.push(...res.rows);
    }
};

onMounted(() => {
    //console.log(store.goodsInfo.goodId);
    //getGoodsInfo(store.goodsInfo.goodId);
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

/* 搜索记录框架 */
.content {
    width: 80%;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 15px;
    padding: 15px;
    /* border-top-left-radius: 15px;
    border-top-right-radius: 15px; */
}

/* 历史搜索记录文字 */
.hissearch {
    margin-top: 20px;
    margin-left: 20px;
}

/* 垃圾桶位置 */
.delete {
    margin-left: 20px;
}

/* 垃圾桶大小 */
.delete>.van-icon {
    font-size: 20px;
}

/* 历史搜索记录文字位置 */
.content ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;
    margin-top: 10px;
}

/* 历史搜索记录文字样式 */
.searchtitle2 {
    width: 15%;
    height: 25px;
    line-height: 25px;
    margin-right: 15px;
    background-color: #f5f5f5;
    border-radius: 15px;
    text-align: center;
}

/* 搜索信息样式 */
.searchInfo {
    width: 80%;
    margin: 0 auto;
    margin-top: 25px;
    height: 600px;
    background-color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

/* 搜索信息数字样式 */
.searchnumber {
    margin-left: 25px;
    padding-top: 20px;
}

/* 搜索内容位置 */
.searchcontent {
    padding-top: 10px;
    display: flex;
    background-color: #fff;
}

/* 搜索内容推荐文字样式 */
.searchcontent>ul {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    /* 允许子元素换行 */
    list-style: none;
    /* 移除默认的列表样式 */
    margin: 0 auto;
}

.searchcontent>ul>li {
    width: 24%;
    margin-top: 15px;
    margin: 5px;
}

.shadow-effect {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.searchcontent>ul>li:hover {
    border: 1px solid #1989fa;
    border-radius: 10px;
    transition: all .5s;
}

.searchgoodscontent {
    padding: 5px;
}

/* 搜索内容卡片样式 */
.van-card {
    background-color: #fff;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

/* 搜索内容图片样式 */
:deep(.van-card__thumb img) {
    position: relative;
    left: -15px;
    top: -10px;
}

/* 搜索内容卡片中文字位置 */
:deep(.van-card__content) {
    margin-left: -15px;
}

/* 搜索内容卡片中价格位置 */
:deep(.van-card__price) {
    position: relative;
    top: -18px;
    color: #f00;
}

/*店铺外送 */
.goodsrate {
    margin-top: -40px;
}

/*店铺外送时间 */
.goodsrate>span:nth-of-type(1) {
    border: 0.5px solid #1989fa;
    border-radius: 2px;
    color: #1989fa;
}
</style>