import request from '@/utils/request'

// 获取sku列表的接口
// /admin/product/list/{page}/{limit} get
export const reqSkuList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'get',
  requestBase: 'PRODUCT_API'
})

// 上架
// /admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get', requestBase: 'PRODUCT_API' })

// 下架
// /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get', requestBase: 'PRODUCT_API' })

// 获取SKU详情的接口
// /admin/product/getSkuById/{skuId}  get
export const reqSkuInfo = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get', requestBase: 'PRODUCT_API' })

// 删除SKU
// /admin/product/deleteSku/{skuId}   delete
export const reqSkuDel = (skuId) => request({
  url: `/admin/product/deleteSku/${skuId}`,
  method: 'delete',
  requestBase: 'PRODUCT_API'

})
