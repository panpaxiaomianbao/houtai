// 此模块是发送trademark组件的所有请求
import request from '@/utils/request'
// 统一暴露
export default {
    // 分页列表请求
    pagingList(page,limit){
        return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
    },
    // 新增与修改的请求
    addUpData(trademark){
        // 如果有id说明是修改
        if(trademark.id){
            return request.put("/admin/product/baseTrademark/update",trademark)
        }else{
            return request.post("/admin/product/baseTrademark/save",trademark)
        }
    },
    // 删除BaseTrademark
    delete(id){
        return request.delete(`/admin/product/baseTrademark/remove/${id}`)
    },
    // 获取所有的品牌列表
  getList(){
    return request.get('/admin/product/baseTrademark/getTrademarkList')
  }
}