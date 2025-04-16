<template>
    <div class="demo">

        <!--顶部logo图片 -->
        <div class="logo">
            <img src="../assets/登录页占位图.jpg">
        </div>

        <!--  -->
        <div class="title">
            <div class="content">
                <van-row>
                    <van-col span="14">
                        <!-- 密码登录文字 -->
                        <div class="login-title"
                            style="text-align: center; margin-top: 26px;color: #FA2C19;font-weight: 1000;font-size: 20px;">
                            密码登录
                        </div>
                        <van-form @submit="onSubmit">
                            <!-- 登录页账号密码表单 -->
                            <van-cell-group inset>
                                <van-field v-model="state.userName" name="userName" placeholder="请输入用户名" label="用户名："
                                    style="background-color: #f7f8fc;"
                                    :rules="[{ required: true, message: '用户名不能为空！' }]" />
                                <van-field v-model="state.password" name="password" placeholder="请输入密码" type="password"
                                    style="background-color: #f7f8fc;" label="密码："
                                    :rules="[{ required: true, message: '密码不能为空！' }]" />
                            </van-cell-group>
                            <!-- 登录按钮 -->
                            <div style="margin: 16px;">
                                <van-button round block type="primary" native-type="submit">登录</van-button>
                            </div>
                            <!-- 注册按钮 -->
                            <div style="margin: 16px;">
                                <van-button round block type="danger" @click="goto">注册</van-button>
                            </div>
                        </van-form>
                    </van-col>
                    <van-col span="10">
                        <div class="ewm">
                            <!-- 扫码登录文字 -->
                            <div class="login-title"
                                style="text-align: center; margin-top: 26px;color: #FA2C19;font-weight: 1000;font-size: 20px;">
                                手机扫码登录
                            </div>
                            <div class="ewmpic">
                                <img src="../assets/登录页二维码.jpg" style="width: 45%;margin-left: 27%;">
                            </div>
                            <div style="text-align: center;font-weight: 1000;font-size: 14px;">
                                打开手机扫码二维码
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="bottomtitle">
            <div style="text-align: center;">
                <span>关于我们</span>
                <span>联系我们</span>
                <span>人才招聘</span>
                <span>商家入驻</span>
                <span>广告服务</span>
                <span>友情链接</span>
            </div>
        </div>
        <div style="text-align: center;margin-top: 10px;">
            Copyright © 2004-2024 国俭GJ.com 版权所有
        </div>
    </div>
</template>

<script setup>
import { getUserInfoApi } from '@/apis/home';
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import { showFailToast, showToast } from 'vant';

const store = useCounterStore();
const router = useRouter();

const state = ref({
    userName: "",
    password: ""
});

//表单提交
const onSubmit = (e) => {
    userLogin(e);
};

//用户注册
const goto = () => {
    router.push('/register');
};

//用户登录信息
const userLogin = async (e) => {
    const res = await getUserInfoApi(e);
    if (res.total === 0) {
        showFailToast("请输入正确的用户名和密码!");
    }
    else {
        showToast({
            type: "success",
            message: "登录成功",
            duration: 1000,
            position: "top"
        });
        store.userInfo = res.rows[0];
        router.push('/home');
    }
    console.log(res);
};
</script>

<style scoped>
.demo {
    background-color: #f5f6fa;
    height: 702px;
}

.htmlcontent {
    background-color: #fff;
    width: 70%;
    margin: 0 auto;
}

.logo {
    width: 10%;
    height: 192px;
    margin: 0 auto;
}

.logo>img {
    width: 100%;
    height: 100px;
}

.title {
    width: 100%;
    margin: 0 auto;
}

.content {
    width: 75%;
    margin: 0 auto;
    height: 320px;
    background-color: #fff;
    border-radius: 15px;
    margin-top: 40px;
    margin-bottom: 50px;
}

.van-form {
    width: 80%;
    margin-left: 10%;
}

.ewm {
    margin-right: 10%;
}

.ewmpic>img {
    width: 100%;
    height: 200px;
}

.bottomtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    /* 允许链接换行 */
}

.bottomtitle span {
    position: relative;
    margin: 0 10px;
    /* 链接间的水平间距 */
    padding: 5px 15px;
    /* 链接内的填充 */
    color: inherit;
    /* 继承父元素的颜色 */
    text-decoration: none;
    /* 去除下划线 */
    white-space: nowrap;
    /* 防止链接文本换行 */
}

.bottomtitle span::after {
    content: '|';
    /* 竖线分隔符 */
    position: absolute;
    right: -10px;
    /* 调整分隔符位置 */
    top: 50%;
    transform: translateY(-50%);
    color: #ccc;
    /* 分隔符颜色 */
}

/* 移除最后一个链接后的分隔符 */
.bottomtitle span:last-child::after {
    content: '';
}
</style>