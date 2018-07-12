
import {RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS
      } from './muation-types'
import {reqAddress,
  reqFoodTypes,
  reqShops,
  reqUser,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings


} from '../api'
export default {
  async getAddress({commit,state}){
  //  发送请求获取数据
    const {latitude, longitude} = state;
    const geohash = `${latitude},${longitude}`;
    // 发送异步请求, 得到响应数据
    const result = await reqAddress(geohash) ; // {code: 0, data: address}
    console.log(result);
    if(result.code===0) {
      // 提交mutation
      const address = result.data;
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  async getCategorys({commit,state}){
    //  发送请求获取数据
    const result=await reqFoodTypes()
    if(result.code===0){
      const categorys=result.data;
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  async getShops({commit,state}){
    //  发送请求获取数据
    const {latitude, longitude} = state;

    const result=await reqShops({latitude, longitude})
    if(result.code===0){
      const shops=result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },
//  同步保存用户信息
  saveUser({commit},user){
    commit(RECEIVE_USER,{user})
  },
  //异步获取当前用户
  async getUser({commit}){
    const result=await reqUser();
    if(result.code===0){
      const user=result.data;
      commit(RECEIVE_USER,{user})
    }
  },
  async logout({commit}){
    const result=await reqLogout()
    if(result.code===0){
      commit(RESET_USER)
    }
  },
  //获取食品列表
  async getShopGoods({commit},cb){
    const result=await reqShopGoods();
    if(result.code===0){
      const goods=result.data;
      commit(RECEIVE_GOODS,{goods});
      //在状态发生改变后调用回调
      cb&&cb()
    }
  },
  //异步获取评价列表
  async getShopRatings({commit}){
    const result=await reqShopRatings();
    if(result.code===0){
      const ratings=result.data;
      commit(RECEIVE_RATINGS,{ratings})
    }
  },
  //异步获取商家信息
  async getShopInfo({commit}){
    const result=await reqShopInfo();
    if(result.code===0){
      const info=result.data;
      commit(RECEIVE_INFO,{info})
    }
  }
}

