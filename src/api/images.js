import axios from '../utils/http'
const base_url = 'images/'

/**
 * 获取镜像
 * @param {Object} params 可选的url参数
 * @param {Object} options 选项
 * @param {Object} inline url路径内的参数
 */
export function fetchImages(params, options) {
  return axios.request(params, {
    ...options,
    url: `${base_url}json`,
    timeout: 1000
  })
}

/**
 * 获取镜像详情
 * @param {string} imageId 镜像id
 */
export function getImagesDetail(options, inline) {
  return axios.request({}, {
    ...options,
    url: `${base_url}/${inline.imageId}/json`,
  })
}


export function delImage(options, inline) {
  return axios.request({}, {
    ...options,
    method: 'delete',
    url: `${base_url}/${inline.imageId}`
  })
}
