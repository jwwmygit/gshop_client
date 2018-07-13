import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './muation-types'

export default {
[RECEIVE_ADDRESS](state,{address}){
   state.address=address
}
,
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys=categorys;
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops=shops;
  },
  [RECEIVE_USER](state,{user}){
    state.user=user;
  },
  [RESET_USER](state){
    state.user={};
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods=goods;
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings=ratings;
  },
  [RECEIVE_INFO](state,{info}){
    state.info=info;
  },
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){//第一次点
      Vue.set(food,'count',1)//新添加的属性就有了数据绑定
      state.foodCarts.push(food)
    }else {
      food.count++;
    }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
   if(food.count){//只有有count时，防止连续点击
     food.count--;
     if(food.count===0){
       state.foodCarts.splice(state.foodCarts.indexOf(food), 1)
     }
   }
  },
  [CLEAR_CART](state){
    state.foodCarts.forEach((food)=>food.count=0);
    state.foodCarts=[]
  }
}
