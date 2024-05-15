<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import service from '../../axios/index.ts'
// import { AxiosInstance } from 'axios';

// 加载图标旗帜变量
let lodaingflag=ref<boolean>(true)
const route = useRoute()

//将时间戳格式转换成年月日时分秒

function timestampToTime(time: number) {
  // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(time * 1000)
  let y = date.getFullYear()
  let MM: number | string = date.getMonth() + 1
  MM = MM < 10 ? ('0' + MM) : MM
  let d: number | string = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h: number | string = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let m: number | string = date.getMinutes()
  m = m < 10 ? ('0' + m) : m
  let s: number | string = date.getSeconds()
  s = s < 10 ? ('0' + s) : s
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s

}



//时间格式进行处理
function getTime(strtime: string) {
  strtime = timestampToTime(parseInt(strtime))
  // console.log(strtime)
  //新闻对应的时间戳
  let old_time = Date.parse(strtime) / 1000
  //此时此刻时间戳
  let now_time: number = new Date().getTime() / 1000
  let gap_time: number = now_time - old_time
  let obj: String = ''
  if (gap_time < 60) {
    obj = '刚刚'
    return obj
  }


  if (gap_time < 3600) {

    obj = parseInt((gap_time / 60).toString()) + '分钟前'
    return obj
  }
  if (gap_time < 86400) {


    obj = parseInt((gap_time / 3600).toString()) + '小时前'
    return obj
  }
  if (gap_time < 172800) {

    obj = '昨天' + strtime.substring(10, 16)
    return obj
  }
  if (gap_time < 259200) {

    obj = '前天 ' + strtime.substring(10, 16);
    return obj
  }
  if (gap_time < 31536000) {
    obj = strtime.substring(5, 16)
    return obj
  }
  if (gap_time > 31536000) {
    obj = strtime
    return obj
  }
}

  // 定义新闻内容信息列表
  let news_content_data = ref<any>([])

  // 获取后端接口数据函数
  const get_new_news = async (post_id: string, post_category: string) => {

    const url: string = '/news/content/'
    //  console.log(post_id.value)
    const res:any = await service.get(url, {
      params: {
        post_id: post_id,
        post_category: post_category,

      }
    })

    // 赋予信息到列表

    news_content_data.value = JSON.parse(res.data.data)

    // console.log(news_content_data.value[0].fields.post_content)
    console.log(news_content_data)
    news_content_data.value[0].fields.created_at = getTime(news_content_data.value[0].fields.created_at);
    // news_content_data.value[0].fields.post_content=eval(news_content_data.value[0].fields.post_content)
    // console.log(news_content_data.value[0].fields.post_content)
    // console.log(item.fields.created_at_format)
    // console.log('xxxxxxxxxxxxxxxxxxxxxx')


    // console.log(news_content_data.value[0].fields.post_content)
    // news_content_data.value[0].fields.post_content= news_content_data.value[0].fields.post_content.replace('?','xxx')
    // console.log(news_content_data.value[0].fields)
   lodaingflag.value =false;


  }
  // 获取路由传递参数
  function get_router_date() {

    let post_id = route.query.post_id
    let post_category = route.query.post_category

    // console.log(post_id, post_category)

    get_new_news(post_id as string,post_category as string)

  }
  get_router_date()

</script>

<template>

  <div class="body-bg"  >

<div class="landingpage">
  <div style="height:100vh ; margin: 0; background: #1F1D2B; margin: auto; overflow: hidden " v-if="lodaingflag">
    <div class="glitch" data-glitch="Loading...">Loading...</div>
</div>

  <div id="article-header" class="o-single-content__header" style="margin-top: 1%;">
    <img :src="news_content_data[0].fields.post_cover_image" alt="" width="100%" height="100%">
  </div>
  <div class="o-single-content__body c-single-normal__header" id="content-meta-header">
    <div class="o-single-normal-content">
      <h1 class="c-single-normal__title">{{news_content_data[0].fields.post_title}}</h1>
    </div>
  </div>
  <div class="o-single-content__body__content">
    <div id="ArticleContentMeta" data-component="ArticleContentMeta">
      <div class="c-meta-share__left">
        <div class="c-article-header-meta">
          <!-- 跳转到人物分类，后面改 -->
          <a class="text-link" href="https://www.ifanr.com/category/people" ga-bind="click" ga-action="ClickCategory"
            ga-category="ArticlePage_Category" ga-label="ArticlePage_CategoryButton" target="_blank">
            <p class="c-article-header-meta__category">{{news_content_data[0].fields.original_category}}</p>
          </a>
          <p class="c-article-header-meta__time" >{{news_content_data[0].fields.created_at}}</p>
        </div>
      </div>
      <div class="c-meta-share__right">

      </div>
    </div>
  </div>

  <article class="o-single-content__body__content c-article-content s-single-article js-article s-single-article2" v-html="news_content_data[0].fields.post_content">

  </article>
</div>
</div>


  
</template>

<style scoped>
    /* 背景 */
    .landingpage .box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 80px;
}

.body-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #252954;
}

.hidden {
  display: none;
}

.landingpage {
  margin: 0 auto;
  padding: 0 300px;
  position: relative;
  max-width: 1500px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #1F1D2B;

}

.landingpage::before {
  content: "";
  position: absolute;
  width: 123px;
  height: 123px;
  left: 60%;
  top: 138px;
  filter: blur(90px);
  background-color: #FB37FF;
}

.landingpage::after {
  content: "";
  position: absolute;
  width: 123px;
  height: 123px;
  left: 80%;
  top: 550px;
  background-color: #18B2DE;
  filter: blur(80px);
}

    .glitch{

           margin-left: 30%;
           margin-top: 40%;
        position: relative;
        font-size: 75px;
        font-weight:700;/*字体加粗*/
        letter-spacing: 5px;/*字体间距*/
        color: white;
        animation:
        skewX-ani
        1s
        ease-in-out
        infinite
    }
    @keyframes skewX-ani{
        0%,40%,44%,58%,61%,65%,68%,73%,100%{
           transform:skewX(0deg);  
        }
        41%{
            transform:skewX(10deg);  
        }
        41%{
            transform:skewX(-10deg);  
        }
        59%{
            transform:skewX(40deg) skewY(10deg);  
        }
        60%{
            transform:skewX(-40deg) skewY(-10deg);  
        }
        63%{
            transform:skewX(10deg) skewY(-5deg);  
        }
        70%{
            transform:skewX(-50deg) skewY(-20deg);  
        }
        71%{
            transform:skewX(100deg) skewY(-10deg);  
        }
    }
    .glitch::before{
       display: block;
       content: attr(data-glitch);
       position: absolute;
       top :0;
       left: 0;
       z-index: -1;
       color: rgb(241, 180, 248);
       /* font-size: 32px; */
       animation:
       glitch
       0.4s
       cubic-bezier(0.25,0.46,0.45,0.94)
       both
       infinite; 
    }
    @keyframes glitch {
        0%{
            transform: translate(-2.5px,2.5px);
        }
        20%{
            transform: translate(-2.5px,-2.5px);
        }
        40%{
            transform: translate(2.5px,2.5px);
        }
        60%{
            transform: translate(2.5px,2.5px);
        }
        80%{
            transform: translate(2.5px,-2.5px);
        }
        to{
            transform: translate(0);
        }

    }
  .s-single-article2 :deep(iframe) {
  width: 760px;
  height: 620px;
}
.s-single-article2 :deep(img) {
  width: 720px;
  object-fit: contain;
  height:auto;
}

 :deep(.s-single-article2 >div>div>p ) {
   margin: 0;
}
#ArticleContentMeta {
  height: 67px;
  margin-top: 12px;
  margin-bottom: 24px;
  border-bottom: 1px dotted #e7e7e7;
}

.o-single-content__header {
  overflow: hidden;
  width: 720px;
}

img {
  width: 100%;
  height: 100%;
}

img {
  width: 720px;
  overflow-clip-margin: content-box;
  overflow: clip;
}

img {
  border-style: none;
}

* {
  box-sizing: border-box;
}

.s-single-article blockquote {
  background-color: #1F1D2B;
  width: 100%;
  padding: 16px 16px 24px 16px;
  margin: 24px 0;
}

.s-single-article,
.s-single-article p {
  font-size: 16px;
  color: #b4b4b4;
  line-height: 27px;
}

.c-article-content {
  margin: 0 auto;
}

.s-single-article {
  margin-bottom: 23px;
  font-family: PingFangSC-Regular, "Microsoft Yahei-Regular", "Microsoft Yahei";
}

.s-single-article blockquote::before {
  content: "";
  display: block;
  width: 24px;
  height: 16px;
  background-image: url(https://images.ifanr.cn/wp-content/themes/ifanr-5.0-pc/static/images/icon/quote-icon-red.svg);
  margin-bottom: 16px;
}

body {
  display: block;
  margin: 8px;
}

div {
  display: block;
}

img {
  overflow-clip-margin: content-box;
  overflow: clip;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

blockquote {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
  margin-inline-end: 40px;
}

.c-article-header-meta__category {
  font-family: PingFangSC-Semibold, "Microsoft Yahei-Bold", "Microsoft Yahei";
  font-size: 16px;
  line-height: 22px;
  color: #f13b03;
}

.c-article-header-meta__time {
  font-family: PingFangSC-Semibold, "Microsoft Yahei-Bold", "Microsoft Yahei";
  font-size: 12px;
  line-height: 17px;
  color: #a8a8a8;
}

p {
  margin: 0;
  padding: 0;
}

.o-single-content__body__content {
  float: left;
  width: 720px;
}

/* p{
  font-size:18PX;
} */
.c-single-normal__title {
  padding: 0;
  margin: 0;
  font-weight: 400;
  padding-top: 24px;
  color: #dadada;
  font-size: 30px;
  font-family: PingFangSC-Medium, "Microsoft Yahei-Bold", "Microsoft Yahei";
  line-height: 45px;
}

/* 背景 */
.landingpage .box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 80px;
}

.body-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #252954;
}

.hidden {
  display: none;
}

.landingpage {
  margin: 0 auto;
  padding: 0 300px;
  position: relative;
  max-width: 1300px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #1F1D2B;

}

.landingpage::before {
  content: "";
  position: absolute;
  width: 123px;
  height: 123px;
  left: 60%;
  top: 138px;
  filter: blur(90px);
  background-color: #FB37FF;
}

.landingpage::after {
  content: "";
  position: absolute;
  width: 123px;
  height: 123px;
  left: 80%;
  top: 550px;
  background-color: #18B2DE;
  filter: blur(80px);
}

</style>
