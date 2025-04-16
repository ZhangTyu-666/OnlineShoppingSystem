import instance from "@/utils/http";

// 获取店铺信息接口
export const getShopsApi = () => {
    return instance({
        url: `/api1/OnlineShopping/Shops/list`
    });
};

// 获取店铺详情接口
export const getShopInfoApi = (shopId) => {
    return instance({
        url: `/api1/OnlineShopping/Shops/${shopId}`
    });
};

// 获取商品信息接口
export const getGoodsApi = () => {
    return instance({
        url: `/api1/OnlineShopping/Goods/list`
    });
};

// 获取商品详情接口
export const getGoodsInfoApi = (goodId) => {
    return instance({
        url: `/api1/OnlineShopping/Goods/${goodId}`
    });
};

// 获取商品直接购买接口
export const getGoodsBuyingApi = () => {
    return instance({
        url: `/api1/OnlineShopping/GoodsBuying/list`
    });
};

// 获取商品直接购买详情接口
export const getGoodsBuyingInfoApi = (goodId) => {
    return instance({
        url: `/api1/OnlineShopping/GoodsBuying/${goodId}`
    });
};

//获取商品评论接口  
export const getGoodsCommentsApi = () => {
    return instance({
        url: `/api1/OnlineShopping/Goods/GoodComments`
    });
};

//获取商品评论详情接口  
export const getGoodsCommentsInfoApi = (goodId) => {
    return instance({
        url: `/api1/OnlineShopping/Goods/goodsCommentsList/${goodId}`
    });
};

// 搜索查询商品接口
export const getSearchInfoApi = (e) => {
    return instance({
        url: `/api1/OnlineShopping/Goods/list?goodName=${e}`
    });
};

// 用户登录信息接口
export const getUserInfoApi = (data) => {
    return instance({
        url: `/api1/OnlineShopping/OnlineShoppingUser/list?userName=${data.userName}&password=${data.password}`
    });
};

// 获取用户信息详情接口
export const getUserMessageApi = (userId) => {
    return instance({
        url: `/api1/OnlineShopping/OnlineShoppingUser/${userId}`
    });
};

//插入数据(注册)
export const insertUserInfoApi = (events) => {
    return instance({
        url: `/api1/OnlineShopping/OnlineShoppingUser`,
        data: events,
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
};

//插入店铺数据
export const insertCollectionShopInfoApi = (userId, shopId) => {
    return instance({
        url: `/api1/OnlineShopping/ShopsCollection/insert`,
        data: {
            userId: userId,
            shopId: shopId,
            managerId: "1"
        },
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
};

//插入商品数据
export const insertCollectionGoodsInfoApi = (userId, goodId) => {
    return instance({
        url: `/api1/OnlineShopping/GoodsCollection/insert`,
        data: {
            userId: userId,
            goodId: goodId,
            managerId: "1"
        },
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
};

//插入购物车数据
export const insertShoppingCartInfoApi = (
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
    return instance({
        url: `/api1/OnlineShopping/ShoppingCart/insertShoppingCart`,
        data: {
            userId: userId,
            shopId: shopId,
            goodId: goodId,
            shopAddress,
            shopName,
            goodName,
            goodPicture,
            goodMessage,
            goodNumber,
            goodPrice
        },
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
};

// 单参数查询(收藏店铺)
export const getCollection1InfoApi = (e) => {
    return instance({
        url: `/api1/OnlineShopping/OnlineShoppingUser/shopsList/${e}`,
    });
};

// 单参数查询(收藏商品)
export const getCollection2InfoApi = (e) => {
    return instance({
        url: `/api1/OnlineShopping/OnlineShoppingUser/goodsList/${e}`,
    });
};

// 单参数查询(购物车)
export const getShoppingCartApi = (e) => {
    return instance({
        url: `/api1/OnlineShopping/OnlineShoppingUser/shoppingCartList/${e}`
    });
};

// 购物车数据单个删除
export const delShoppingCartInfoApi = (e) => {
    return instance({
        url: `/api1/OnlineShopping/ShoppingCart/del/${e}`,
        method: "DELETE"
    });
};

// 购物车数据批量删除
export const delAllShoppingCartInfoApi = (e) => {
    return instance({
        url: `/api1/OnlineShopping/ShoppingCart/${e}`,
        method: "DELETE"
    });
};

// 查询收藏店铺列表
export const shopInfoApi = (userId, shopId) => {
    return instance({
        url: `/api1/OnlineShopping/ShopsCollection/list?userId=${userId}&shopId=${shopId}`,
    });
};

// 查询收藏商品列表
export const goodsInfoApi = (userId, shopId) => {
    return instance({
        url: `/api1/OnlineShopping/GoodsCollection/list?userId=${userId}&shopId=${shopId}`
    });
};

// 单参数查询(商品订单)
export const getUserIndentApi = (e) => {
    return instance({
        url: `/api1/OnlineShopping/OnlineShoppingUser/userIndentList/${e}`
    });
};

// 商品订单数据单个删除
export const delAllUserIndentInfoApi = (e) => {
    return instance({
        url: `/api1/OnlineShopping/ShoppingCart/del/${e}`,
        method: "DELETE"
    });
};

// 商品订单数据批量删除
export const delUserIndentInfoApi = (e) => {
    return instance({
        url: `/api1/OnlineShopping/UserIndent/${e}`,
        method: "DELETE"
    });
};

//插入用户订单数据
export const insertUserIndentInfoApi = (
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
    return instance({
        url: `/api1/OnlineShopping/UserIndent/insertUserIndent2`,
        data: {
            userId: userId,
            shopId: shopId,
            goodId: goodId,
            shopName: shopName,
            goodName: goodName,
            goodPicture: goodPicture,
            goodMessage: goodMessage,
            goodNumber: goodNumber,
            goodPrice: goodPrice,
            userIndentTime: userIndentTime
        },
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
};
