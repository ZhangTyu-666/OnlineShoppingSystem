import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore(
  "counter",
  () => {

    //存储搜索记录
    const searchHistory = ref([]);

    //清空搜索记录
    const clearSearchHistory = () => {
      searchHistory.value.splice(0);
    };

    //存储用户登录信息
    const userInfo = ref({});
    //const goodsInfomation = ref({});

    //清除用户登录信息
    const clearUserInfo = () => {
      userInfo.value = {};
      //goodsInfomation.value = {};
    };

    return { searchHistory, clearSearchHistory, clearUserInfo };
  },

  {
    persist: true,
  }
);
