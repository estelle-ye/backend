// 品牌属性管理模块请求文件
import request from '@/utils/request'

// 获取一级分类数据接口 GET /admin/product/getCategory1
export const reqCategory1List = () => request({
  url: '/admin/product/getCategory1',
  method: 'get',
  requestBase: 'PRODUCT_API'
})
// 获取二级分类数据接口 GET /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) => request({
  url: `/admin/product/getCategory2/${category1Id}`,
  method: 'get',
  requestBase: 'PRODUCT_API'
})
// 获取三级分类  GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) => request({
  url: `/admin/product/getCategory3/${category2Id}`,
  method: 'get',
  requestBase: 'PRODUCT_API'
})

// 获取获取平台属性接口 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get',
  requestBase: 'PRODUCT_API'
})

// 添加属性与属性值接口 POST /admin/product/saveAttrInfo  参数如下
/*
{
    "attrName": "",      属性名
    "attrValueList": [   属性名中属性值
      {
        "attrId": 0,          属性的id
        "valueName": "string"  属性值
      }
    ],
    "categoryId": 0,    category3Id
    "categoryLevel":3,
  }
  */

export const reqAddorUpdateAttr = (data) => request({
  url: '/admin/product/saveAttrInfo',
  method: 'post',
  data,
  requestBase: 'PRODUCT_API'
})

// 删除属性 DELETE /admin/product/deleteAttr/{attrId}
export const reqDeleteAttr = (attrId) => request({
  url: `/admin/product/deleteAttr/${attrId}`,
  method: 'delete',
  requestBase: 'PRODUCT_API'
})
