import instance from '../utils/myhttp'
// import store from '../store/index'
// 获取频道信息
function getArticles (params) {
  return instance({
    url: '/v1_1/articles',
    method: 'get',
    params
  })
}
// 不感兴趣/不喜欢
function apiDislike (data) {
  return instance({
    url: '/v1_0/article/dislikes',
    method: 'post',
    data
  })
}
function apiReport (data) {
  return instance({
    url: '/v1_0/article/reports',
    method: 'post',
    data
  })
}
function blackList (data) {
  return instance({
    url: '/v1_0/user/blacklists',
    method: 'post',
    data
  })
}
// 获取搜索数据
function getSearch (params) {
  return instance({
    url: '/v1_0/search',
    method: 'get',
    params
  })
}
// /app/v1_0/articles/:article_id
// 获取文章详情
function getDatailByid (artid) {
  return instance({
    url: '/v1_0/articles/'+artid,
    method: 'get'
  })
}
export { getArticles, apiDislike, apiReport, blackList, getSearch, getDatailByid }