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

        <!-- 个人用户信息 -->
        <div class="usermessage">
            <el-row>
                <el-col :span="4">
                    <div class="usercontentleft">
                        <img :src="getImgUrl(userMessage.picture)"
                            style="width: 120px;border-radius: 120px;margin-top: 25px;">
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="usercontentcenter">
                        <div>
                            <div style="font-size: 30px;font-weight: 500;">{{ store.userInfo.userName }}</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="14">
                    <!-- <div class="usercontentright" style="background-color: #f5f6fa;margin-left: 40%;height: 80%;margin-top: 20px;">
                        <van-barrage v-model="list">
                            <div class="video" style="width: 100%; height: 150px"></div>
                        </van-barrage>
                        <van-space style="position: relative;top: -20px;left: -80px;">
                            <van-button @click="append" type="primary" size="small"> 我的信息 </van-button>
                        </van-space>
                    </div> -->
                </el-col>
            </el-row>
        </div>

        <!-- 用户个人订单 -->
        <div class="userorder">

            <!-- 用户个人订单位置 -->
            <div class="userordertitle">
                我的订单
            </div>

            <!-- 用户个人订单信息 -->
            <div class="userordermessage">
                <van-grid :border="true">
                    <van-grid-item icon="bill-o" text="全部订单" @click="gotoUserIndent(flag=0)"/>
                    <van-grid-item icon="debit-pay" text="待收货" @click="gotoUserIndent(flag=1)"/>
                    <van-grid-item icon="comment-o" text="待评价" @click="gotoUserIndent(flag=1)"/>
                    <van-grid-item icon="cart-o" text="购物车" @click="goShoppingCart" />
                </van-grid>
            </div>

        </div>

        <!-- 底部版权图片 -->
        <!-- <div class="downlogopicture">
            <img src="../assets/底部版权图片.jpg">
        </div> -->

    </div>

</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
import { getUserMessageApi } from "@/apis/home";
import { useRoute, useRouter } from 'vue-router';

const store = useCounterStore();
const router = useRouter();
const route = useRoute();

// 
const userMessage = ref({});

// 拼接图片路径函数
const getImgUrl = (img) => {
    return "http://127.0.0.1:5419" + img;
};

//跳转购物车
const goShoppingCart = () => {
    router.push('/shoppingcart');
};

//点击logo图片返回首页
const goHome = () => {
    router.push('/home');
};

//跳转搜索页
const gotoSearch = () => {
    router.push('/search');
};

//跳转用户订单页
const gotoUserIndent = (flag) => {
  router.push({
    path: '/userindent',
    query: { flag }  // 使用query传递参数
  });
};

// 退出登录
const loginOut = () => {
    router.push('/');
    store.clearUserInfo();
};

// 获取用户信息详情接口
const getUserMessage = async (userId) => {
    const res = await getUserMessageApi(userId);
    console.log(res);
    userMessage.value = res.data;
};

// 弹幕
const defaultList = [
     { id: 100, text: '想得美' },
    // { id: 101, text: '可定制的' },
    // { id: 102, text: '移动端' },
     { id: 103, text: '哈哈哈' },
    // { id: 104, text: '组件库' },
    // { id: 105, text: 'VantUI' },
     { id: 106, text: '666' },
];

const list = ref([...defaultList]);
const append = () => {
    list.value.push({ id: Math.random(), text: '个性签名:哈哈哈' });
};

onMounted(() => {
    getUserMessage(store.userInfo.userId);
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

/* 个人用户信息样式 */
.usermessage {
    width: 80%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
    padding: 20px;
    display: flex;
    align-items: center;
    transition: box-shadow 0.3s ease;
}

.usermessage:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.usercontentleft {
    margin-left: 20px;
}

.usercontentleft img {
    border: 3px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.usercontentcenter {
    margin-left: 30px;
}

.usercontentcenter li {
    margin-bottom: 5px;
}

.usercontentright {
    flex: 1;
    margin-left: 40px;
    background-color: #f5f6fa;
    border-radius: 10px;
    padding: 10px;
    position: relative;
}

.usercontentright .van-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

/* 用户个人订单样式 */
.userorder {
    width: 80%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    padding: 20px;
    transition: box-shadow 0.3s ease;
}

.userorder:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.userordertitle {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
}


.userordermessage .van-grid-item {
    margin-top: 10px;
    transition: transform 0.3s ease;
}

.userordermessage .van-grid-item:hover {
    transform: translateY(-5px);
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