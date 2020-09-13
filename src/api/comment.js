import instance from '../utils/myhttp'
// 获取评论
function getComments (params) {
  return instance({
    url: '/v1_0/comments',
    method: 'get',
    params
  })
}

export { getComments }