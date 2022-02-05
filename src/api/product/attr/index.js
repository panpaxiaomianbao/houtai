// 此模块是发送attr组件的所有请求
import request from '@/utils/request'
export default{
    // 三级联动的请求
    // 一级列表请求
    getCategory1(){
        return request.get(`/admin/product/getCategory1`)
    },
    // 二级列表请求
    getCategory2(category1Id){
        return request.get(`/admin/product/getCategory2/${category1Id}`)
    },
    // 二级列表请求
    getCategory3(category2Id){
        return request.get(`/admin/product/getCategory3/${category2Id}`)
    },
    // 获取商品属性列表请求
    getList({category1Id,category2Id,category3Id}){
        return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
    },
    // 保存
    save(attrForm){
        return request.post("/admin/product/saveAttrInfo",attrForm)
    },
    // 删除
    delAttrForm(attrId){
        return request.delete(`/admin/product/deleteAttr/${attrId}`)
    }
}