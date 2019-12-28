import api from './index'
import axios from 'axios'
import querystring from 'querystring'
import globleVue from '../main'

let $http = axios
let token = window.localStorage.getItem('token')
// let baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://taiji.test01.qcw100.com'
let baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://aidingdong.taijichn.com'
// 关注

/**
 * @name
 * 关注功能
 * @params
 *  access_token	是	string	令牌
 *  type	是	int	1作品,2话题动态,3话题分类,4用户,5首页分类
 *  correlation_id	是	int	相关id
 *
*/

export const getAttention = async (type, correlation_id) => {
    const { data: ret } = await $http.post(baseURL + api.attentioned, querystring.stringify({
        type,
        correlation_id,
        access_token: window.localStorage.getItem('token')
    }))
    if(!ret.error_code){
        console.log('关注成功')
    }else{
        console.log('关注失败')
    }
    console.log(JSON.stringify(ret));
    return ret
}

/**
*   @name
*   点赞功能
*   @params
*   type type值 3 视频,1 话题,2 评论
*   prise_or_cancle 1点赞 2取消
*   reception_user_id 被赞人id
*   correlation_id 被赞内容的id
*/

export const getPraise = async (type, prise_or_cancle, reception_user_id, correlation_id) => {



    const { data: ret } = await $http.post(baseURL + api.praise, querystring.stringify({
        type,
        prise_or_cancle,
        access_token: token,
        reception_user_id,
        correlation_id
    }))


    // console.log(ret)
    return ret
}


/**
 * @name
 *  投票动作
 * @params
 *  apply_id	是	int	报名id
 *  access_token	是	string	令牌
 *
 */

export const voteSubmit = async (apply_id) => {
    const { data: ret } = await $http.post(baseURL + api.voteEvent, querystring.stringify({
        apply_id,
        access_token: window.localStorage.getItem('token')
    }))
    console.log(ret)
    return ret
}
// export default getAttention;
