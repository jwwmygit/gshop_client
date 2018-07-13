export default {
 totalCount(state){
   return state.foodCarts.reduce((preTotal,food)=>preTotal+food.count,0)
 },
  totalPrice(state){
    return state.foodCarts.reduce((preTotal,food)=>preTotal+food.count*food.price,0)
  }
}
