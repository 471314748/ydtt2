import instance from '../utils/myhttp'
// 获取评论
function getComments (params) {
  return instance({
    url: '/v1_0/comments',
    method: 'get',
    params
  })
}

// 添加评论
function apiAddComment ({art_id, content}) {
  return instance({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: art_id,
      content: content
    }
  })
}

export { getComments, apiAddComment }