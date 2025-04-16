<template>

    <div class="demo">

        <div class="content">

            <div class="register-box">
                <h2>国俭购物网站注册</h2>
                <van-form @submit="onSubmit">

                    <!-- 表单内容 -->
                    <van-cell-group inset>
                        <van-field v-model="state.userName" name="userName" placeholder="请输入用户名" label="用户名:"
                            :rules="[{ required: true, message: '用户名不能为空' }]" />
                        <van-field v-model="state.password" name="password" placeholder="请输入密码" type="password"
                            label="密码:" :rules="[{ required: true, message: '密码不能为空' }]" />
                        <!-- <van-field v-model="state.pic" name="pic" placeholder="请输入图片地址" label="头像:" /> -->
                        <van-field v-model="state.address" name="address" placeholder="请输入地址" label="用户地址:"
                            :rules="[{ required: true, message: '地址不能为空' }]" />
                    </van-cell-group>

                    <!-- 注册按钮 -->
                    <div class="register-buttons">
                        <van-button round block type="primary" native-type="submit">
                            注册
                        </van-button>
                        <van-button round block type="success" native-type="submit" style="margin-top: 10px;"
                            @click="gotoLogin">
                            如已有帐号可直接登录
                        </van-button>
                    </div>

                </van-form>
            </div>

        </div>

    </div>


</template>

<script setup>
import { insertUserInfoApi } from '@/apis/home';
import { showSuccessToast, showFailToast } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = ref({
    userName: "",
    userpass: "",
    userpass2: "",
    mobilenum: "",
    address: "",
    comment: ""
});

//返回登录页
const gotoLogin = () => {
    router.push('/');
};

//表单提交
const onSubmit = (e) => {
    insertUser(e);
};

//注册成功提醒
const insertUser = async (data) => {
    const res = await insertUserInfoApi(data);
    console.log(res);
    if (res.code !== 200) {
        showFailToast("注册成功!");
    }
    if (res.code === 200) {
        showSuccessToast("注册成功!");
        router.push('/');
    }
};

//注册密码提醒
const validatorMessage = (value) => {
    if (value === "") {
        return "密码不能为空!";
    }
    if (value !== state.value.userpass) {
        return "两次密码要相同!";
    }
    return;
};

</script>

<style scoped>
.demo {
    background-color: #f5f5f5;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.content {
    width: 100%;
    max-width: 400px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.register-box {
    text-align: center;
}
 
.register-box h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}
 
.van-cell-group {
    margin-bottom: 20px;
}
 
.register-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
}
 
.register-buttons .van-button {
    width: 100%;
    margin-bottom: 10px;
}
 
.register-buttons .van-button:last-child {
    margin-bottom: 0;
    background-color: #1989fa;
    color: #fff;
}
</style>