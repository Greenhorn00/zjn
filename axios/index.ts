// 相应请求拦截器
import axios,{type AxiosRequestConfig,AxiosResponse}from "axios";
const service = axios.create({
   baseURL: "http://8.140.192.183:8011",
  //  timeout:3000,

})
// 请求拦截器
service.interceptors.request.use(function (config:AxiosRequestConfig|any) {
    // 配置请求头
    // config.headers.token=1
    return config;


  },);

//响应拦截器
service.interceptors.response.use(function (response:AxiosResponse|any) {
    // 响应数据状态码为0则是后端返回错误，如果是1 则是成功
//   if(response.data.code=='0')
//   {
//     // alert(response.data.message)
//        alert('出错')
//   }

    console.log(response)
    return response;
  }, function (error:any) {
  
    console.log(error);
    switch(error.response.status) {

        // case 404:
        //        alert('404');
        default:
            break
        }

    return Promise.reject(error);
  });
  export default service