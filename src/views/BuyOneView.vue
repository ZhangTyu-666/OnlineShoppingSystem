<template>

    <div class="demo">

        <!-- 购买页头部 -->
        <div class="buyinghead">
            <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />
        </div>

        <!-- 收货地址 -->
        <div class="goodsaddress">

            <!-- 确认收货地址文字 -->
            <div class="goodsaddresstitle">
                确认收货地址
            </div>

            <!-- 选择确认收货地址 -->
            <div class="address-container">
                <van-radio-group v-model="checked" class="radio-group">
                    <van-radio name="1" class="custom-radio">
                        <div class="address-info">
                            <p>辽宁省大连市甘井子区凌水街道</p>
                            <p class="bold">凌水街道大连东软信息学院三期生...</p>
                            <p>不道啊 138888888</p>
                        </div>
                    </van-radio>
                    <van-radio name="2" class="custom-radio">
                        <div class="address-info">
                            <p>辽宁省沈阳市法库县龙山街道</p>
                            <p class="bold">凌水街道大连东软信息学院三期生...</p>
                            <p>不道啊 138888888</p>
                        </div>
                    </van-radio>
                </van-radio-group>
            </div>

        </div>

        <!-- 确认订单信息 -->
        <div class="suregoodsmessage">

            <!-- 确认订单信息文字 -->
            <div class="suregoodsmessagetitle">
                确认订单信息
            </div>

            <!-- 订单信息内容 -->
            <div class="goodsmessagecontent">
                <span style="margin-left: 5%;">店铺宝贝</span>
                <span style="margin-left: 25%;">商品属性</span>
                <span style="margin-left: 25%;">原价</span>
                <span style="margin-left: 10%;">数量</span>
                <span style="margin-left: 10%;">小计</span>
            </div>

            <!-- 商品购买信息 -->
            <div class="goodsbuymessage">

                <!-- 商品店铺名称 -->
                <div class="goodsshopsname">
                    <h3 style="font-weight: 700;margin-left: 3%;">{{ goodsBuyingInfo.shopName }}</h3>
                </div>

                <!-- 商品购买信息 -->
                <div class="goodsbuymessage">
                    <span>
                        <img :src="getImgUrl(goodsBuyingInfo.goodPicture)">
                    </span>
                    <span style="position: relative;left: 12%;top: -50px;">
                        {{ goodsBuyingInfo.goodMessage }}
                        <span style="margin-left: 10%;">
                            ￥{{ goodsBuyingInfo.goodPrice }}
                        </span>
                        <span style="margin-left: 8%;">
                            <!-- {{ goodsBuyingInfo.goodNumber }} -->
                            <van-stepper v-model="value" />
                        </span>
                        <span style="margin-left: 5%;color: #f00;font-weight: 800;">
                            ￥{{ goodsBuyingInfo.goodPrice }}
                        </span>
                    </span>
                </div>

                <!-- 商品购买按钮 -->
                <div class="goodsbuybutton">
                    <!-- <van-button style="background-color: #1989fa; color: #fff;font-weight: 700;font-size: 16px;border-radius: 10px;">
                        提交订单
                    </van-button> -->

                    <el-button plain @click="dialogOverflowVisible = true" style="background-color: #1989fa; color: #fff;font-weight: 700;font-size: 16px;border-radius: 5px;">
                        提交订单
                    </el-button>

                    <el-dialog v-model="dialogOverflowVisible" title="叮咚" width="500" draggable overflow>
                        <span>
                            已成功下单
                        </span>
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button type="primary" @click="dialogOverflowVisible = false">
                                    <span @click="goHome">返回首页</span>
                                </el-button>
                            </div>
                        </template>
                    </el-dialog>

                </div>
            </div>
        </div>

        <!-- 底部版权图片 -->
        <div class="downlogopicture">
            <img src="../assets/底部版权图片.jpg">
        </div>

    </div>

</template>

<script setup>
import { getGoodsBuyingInfoApi } from "@/apis/home";
import { useRoute , useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const goodsInfo = ref({});
const goodsBuyingInfo = ref({});

// 拼接图片路径函数
const getImgUrl = (img) => {
    return "http://127.0.0.1:5419" + img;
};

//返回上一级
const onClickLeft = () => history.back();

//地址选择
const checked = ref('1');

//商品数量
const value = ref(1);

//提交订单弹出
const dialogOverflowVisible = ref(false);

const goHome = () => {
    router.push('/home');
};

// 获取商品直接购买详情信息
const getGoodsBuyingInfo = async (goodId) => {
    const res = await getGoodsBuyingInfoApi(goodId);
    console.log(res);
    goodsBuyingInfo.value = res.data;
};

onMounted(() => {
    getGoodsBuyingInfo(route.params.goodId);
});
</script>

<style scoped>
.demo {
    width: 100%;
    height: 100%;
    background-color: #f5f6fa;
}

.buyinghead {
    width: 80%;
    margin: 0 auto;
}

.goodsaddress {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 20px;
}

.goodsaddresstitle {
    margin-left: 20px;
    padding-top: 20px;
    font-weight: 700;
    font-size: 20px;
}

.address-container {
    display: flex;
    /* 设置为 Flex 容器 */
    justify-content: space-between;
    /* 子元素之间的间距 */
    align-items: flex-start;
    /* 子元素在交叉轴上的对齐方式 */
    /* 根据需要调整容器宽度和其他样式 */
    width: 100%;
    /* 或者设置具体的宽度值 */
    margin: 30px;

}

.radio-group {
    display: flex;
    /* 确保 radio-group 也是 Flex 容器 */
    width: 100%;
    /* 根据需要调整宽度 */
    margin-bottom: 40px;
}

.custom-radio {
    margin-right: 16px;
    /* 右侧间距，用于分隔两个 radio */
    /* 注意：这里可能需要额外的样式来确保 radio 的布局正确 */
    /* 因为 Vant 的 van-radio 可能有自己的布局逻辑 */
}

.custom-radio:last-child {
    margin-right: 0;
    /* 移除最后一个 radio 的右侧间距 */
}

.address-info {
    /* 自定义地址信息的样式 */
    background-color: #fff;
    /* 或者其他背景色 */
    border: 1px solid #1989fa;
    /* 边框样式 */
    border-radius: 10px;
    /* 圆角 */
    padding: 16px;
    /* 内边距 */
    /* 根据需要调整其他样式 */
}

/* 注意：如果 Vant 的 van-radio 组件有默认的样式影响布局，  
   您可能需要覆盖这些样式。此外，如果地址信息过长，  
   您可能需要添加样式来处理文本溢出，如使用 text-overflow: ellipsis; */

.address-info p {
    margin: 0;
    /* 移除段落间距 */
    line-height: 1.5;
    /* 调整行高 */
}

.bold {
    font-weight: bold;
    /* 加粗字体 */
}

.suregoodsmessage {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 15px;
}

.suregoodsmessagetitle {
    margin-left: 20px;
    padding-top: 20px;
    font-weight: 700;
    font-size: 20px;
}

.goodsmessagecontent {
    width: 95%;
    margin: 0 auto;
    height: 50px;
    border-radius: 10px;
    line-height: 50px;
    margin-top: 10px;
    background-color: #f3f6f8;
}

.goodsshopsname {
    width: 100%;
    margin: 0 auto;
    margin-top: 15px;
    height: 50px;
    line-height: 50px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #f3f6f8;
}

.goodsbuymessage {
    background-color: #fff;
    width: 95%;
    margin: 0 auto;
    border-radius: 10px;
}

.goodsbuymessage>span>img {
    width: 8%;
    height: 8%;
    margin: 10px;
}

.goodsbuybutton {
    background-color: #fff;
    margin-left: 88%;
    padding-bottom: 15px;
}

.downlogopicture {
    width: 100%;
    margin-top: 20px;
}

.downlogopicture>img {
    width: 100%;
    margin-bottom: -8px;
}
</style>