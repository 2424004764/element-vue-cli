/**
 * 说明：
 * 如：/scr/api/images.js 中的getImagesDetail有三个参数，以此是url后面的参数、
 * 选项 可以是axios本身的选项  也可以是自定义处理的选项，如我要加一个loading的效果，就由这个参数传递、
 * 行内的参数，有些地址不是在url后面添加，是在url中间添加的如/images/{name}/json
 */
import axios from 'axios'
import ElementUI from 'element-ui';

class Axios {

    // 该类中全局的loading效果载体
    globalLoading = null
    globalLoadingSwitch = false // 是否开启全局加载loading  可在请求参数中覆盖改配置

    defaultTimeout = 5000 // 默认5秒超时  参数可被覆盖
    defaultMethod = 'GET' // 默认请求方式  参数可被覆盖

    // 开启全局加载效果
    openLoading(){
        this.globalLoading = ElementUI.Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
    }

    // 关闭全局加载效果
    closeLoading(){
        if(this.globalLoading){
            this.globalLoading.close()
        }
    }

    // 请求拦截器
    requestInterceptors(config){
        // 请求之前做些什么  可以在请求之前设置请求头信息
        // 如： 
        // config.headers.AuthorizationToken = "SHGDHSGFHGH@GHRGH"
        // 如果断网
        if(!window.navigator.onLine){
            ElementUI.Message.error('没有网络！')
            return Promise.reject()
        }
        // 可以加一些全局loading效果  并在响应拦截器中关闭
        config.loading && this.openLoading()
        return config
    }

    request(params = {}, options){
        const config = {
            timeout: this.defaultTimeout, // 默认超时时间  参数可被覆盖
            method: this.defaultMethod, //   参数可被覆盖
            // baseURL: 'http://8.129.219.65:2376/',
            baseURL: '/api', // 这里设置了代理 在config/index.js dev->proxyTable 设置
            headers: {}, // 如果需要在请求拦截器中增加headers，则需要先声明
            loading: this.globalLoadingSwitch, // 可能会被options中的loading参数覆盖 是否每次请求开启全局loading
            params: params, // 传递的url参数
            ...options, // 传递的选项(用来覆盖原有的参数，如超时时间、下载|上传进度等一切参数)  可以是axios本身的选项  也可以是自定义处理的选项
            // 上传处理进度事件 一般由相应的二级封装后的方法覆盖
            // 调用方式如src\api\remark.js
            // onUploadProgress: function (progressEvent) {
            //     // Do whatever you want with the native progress event
            // },
            // // 下载处理进度事件 一般由相应的二级封装后的方法覆盖
            // onDownloadProgress: function (progressEvent) {
            //     // 对原生进度事件的处理
            //     console.log("下载进度", progressEvent)
            // },
        }
        const instance = axios.create(config)
        // 请求拦截器
        instance.interceptors.request.use(this.requestInterceptors(config), (error) => {
            // 请求错误 将错误信息返回并提示
            ElementUI.Message.error(JSON.stringify(error.response))
            return Promise.reject(error)
        })
        // 响应拦截器
        instance.interceptors.response.use((response) => {
            // 对响应的内容进行修改  请求成功了
            // console.log(response)
            // 关闭全局加载效果
            this.closeLoading()
            // 将响应返回
            return Promise.resolve(response)
        }, (error) => {
            // 关闭全局加载效果
            this.closeLoading()
            // 弹窗提示错误信息
            ElementUI.Message.error(JSON.stringify(error.message))
            // 响应错误 将错误信息返回
            return Promise.reject(error)
        })
        
        // 返回axios 实例
        return instance(config)
    }
}

export default new Axios()