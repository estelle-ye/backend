import request from '@/utils/request'

// 获取SPU列表数据的接口
// GET /admin/product/{page}/{limit}  参数category3Id
export const reqSpuList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  params: { category3Id },
  requestBase: 'PRODUCT_API'
})

// 获取SPU基本信息
// /admin/product/getSpuById/{spuId}   get
export const reqSpu = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'get',
  requestBase: 'PRODUCT_API'
})

// 获取品牌的信息
// /admin/product/baseTrademark/getTrademarkList get
export const reqTrademarkList = () => request({
  url: `/admin/product/baseTrademark/getTrademarkList`,
  method: 'get',
  requestBase: 'PRODUCT_API'
})

// 获取某个spu的销售属性
// /admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId) => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'get',
  requestBase: 'PRODUCT_API'
})

// 获取SPU图片
// /admin/product/spuImageList/{spuId}  get
export const reqSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get',
  requestBase: 'PRODUCT_API'
})

// 修改保存spu表格
// /admin/product/updateSpuInfo  post   参数：spuInfo
// 添加spu表格
// /admin/product/saveSpuInfo    post   参数：spuInfo
// 可以根据是否有spuInfo.id判断执行修改还是添加
export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    // 有id就是修改
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuInfo,
      requestBase: 'PRODUCT_API'
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuInfo,
      requestBase: 'PRODUCT_API'
    })
  }
}

// 删除 ///admin/product/deleteSpu/{spuId} delete

export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete', requestBase: 'PRODUCT_API' })

// 获取平台属性信息
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get', requestBase: 'PRODUCT_API' })

// 提交SKU信息
// /admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo, requestBase: 'PRODUCT_API' })

// 获取SKU列表
// GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get', requestBase: 'PRODUCT_API' })

