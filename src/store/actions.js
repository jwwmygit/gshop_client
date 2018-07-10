
import {RECEIVE_ADDRESS,RECEIVE_SHOPS,RECEIVE_CATEGORYS} from './muation-types'
import {reqAddress,reqFoodTypes,reqShops} from '../api'

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
  }
}

