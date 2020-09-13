import instance from '../utils/myhttp'
// 关注作者
function apiFollow (data) {
  return instance({
    url: '/v1_0/user/followings',
    method: 'POST',
    data
  })
}
// 取消关注作者 /v1_0/article/likings
function followings (target) {
  return instance({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}
// 文章点赞
function apiLikings (data) {
  return instance({
    url: '/v1_0/article/likings',
    method: 'POST',
    data
  })
}
// 取消点赞
function noLikings (target) {
  return instance({
    url: '/v1_0/article/likings/'+target,
    method: 'DELETE'
  })
}
export { apiFollow, followings, apiLikings, noLikings }