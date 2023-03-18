import request from '@/utils/request'

// 获取品牌列表
export const reqTradeMarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get',
  requestBase: 'PRODUCT_API'
})

// //新增品牌: /admin/product/baseTrademark/save   post  携带两个参数：品牌名称、品牌logo
// //修改品牌 /admin/product/baseTrademark/update   put   携带三个参数：id、品牌名称、品牌logo
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: tradeMark,
      requestBase: 'PRODUCT_API'
    })
  } else {
    // 新增品牌
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tradeMark,
      requestBase: 'PRODUCT_API'
    })
  }
}

// //删除品牌：/admin/product/baseTrademark/remove/{id}     DELETE   一个参数：id
export const reqDeleteTradeMark = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: 'delete',
  requestBase: 'PRODUCT_API'
})
