<script setup lang="ts">
import { ref } from 'vue'
//  import {reactive} from 'vue'

// import { Search } from '@element-plus/icons-vue'
// const input3 = ref('')
// const select = ref('')
// import plane from './plane.vue'
// import {onMounted} from 'vue'
import service from '../../axios/index.ts'
import { useRouter } from "vue-router";
const router = useRouter()
import { toRefs, defineProps,watch} from 'vue'
// import { da } from 'element-plus/es/locale/index.mjs';
// import { watch } from 'fs';
// import { nextTick } from 'process';
// import { type } from 'os';
//将时间戳格式转换成年月日时分秒
function timestampToTime (time:number) {
// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var date = new Date(time * 1000) 
      let y = date.getFullYear()
      let MM:number|string= date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d:number|string = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h:number|string = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m:number|string = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s:number|string = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' '+h+':'+m+':'+s
      
}



//时间格式进行处理
function getTime(strtime:string) {

strtime=timestampToTime(parseInt(strtime))
// console.log(strtime)

  //新闻对应的时间戳
  let old_time = Date.parse(strtime)/1000
  //此时此刻时间戳
  let now_time:number = new Date().getTime()/1000

  let gap_time:number=now_time-old_time
//   console.log(now_time)
//   console.log(old_time)
//   console.log(gap_time)
  
  let obj:String=''
  if(gap_time<60)
  {
      obj='刚刚'
     return  obj
  }
   

  if(gap_time<3600 )
  {
    
      obj=parseInt((gap_time/60).toString())+'分钟前'
     return  obj  
  }
  if(gap_time<86400 )
  {

    
      obj=parseInt((gap_time/3600).toString())+'小时前'
     return  obj  
  }
  if(gap_time<172800 )
  {

      obj='昨天'+ strtime.substring(10,16)
     return  obj  
  }
  if(gap_time<259200)
  {

      obj='前天 '+ strtime.substring(10,16);
     return  obj  
  }
  if(gap_time<31536000)
  {
    obj=strtime.substring(5,16)
    return  obj 
  }
  if(gap_time>31536000)
  {
    obj=strtime
    return  obj 
  }

   
 

}

const props = defineProps({
  //子组件接收父组件传递过来的值
  father_page_Message: String,
})
//使用父组件传递过来的值
const {father_page_Message} =toRefs(props)

//监听father_page_Message 值
watch(father_page_Message as any, (newName) => {
  console.log("newName", newName);
//   因为切换页签和增加 load more 调用同一个函数，所以监听到father_page_Message变化时，让请求page=1
  page.value=1
  get_new_news()
});

// 定义新闻信息列表
let new_news_data=ref<any>([])


// 调用接口返回信息
// 页数和一页数据量

const page=ref(1)
const size=ref(8)

const get_new_news=async() => {

    // console.log(page,size)

 const url:string='/news/'+father_page_Message?.value+'/'
//  console.log(father_page_Message.value)
   const res= await service.get(url,{params:{
    page:page.value,
    size:size.value

}})

  // 赋予信息到列表

  new_news_data.value=JSON.parse(res.data.data)
  
  
  new_news_data.value.forEach((item:any) => {
    item.fields.created_at= getTime(item.fields.created_at);
    // console.log(item.fields.created_at_format)
    // console.log('xxxxxxxxxxxxxxxxxxxxxx')
  })

  console.log(new_news_data.value[0].fields)

  // console.log()
//   如果再次访问就增加页数
  page.value++
//   size.value++
  
}
// console.log(new_news_data)

get_new_news()
// 进入新闻内容
const Enter_content = (post_id:string,post_category:string) => {
    console.log(post_category)
    router.push({
        path: '/Article_details',
        query: {
            post_category:post_category,
            post_id:post_id
        },
    })

}
// 进入所选类别的函数
const Enter_category = (post_category:string) => {
    if(post_category==='早报')
    {post_category='DailyMorning'}
    else if(post_category==='公司')
    {post_category='technology'}
    else if(post_category==='董车会')
    {post_category='car'}
    else if(post_category==='玩物志')
    {post_category='playthings'}
    else if(post_category==='人物')
    {post_category='person'}
    else if(post_category==='产品')
    {post_category='products'}
    else if(post_category==='生活')
    {post_category='life'}
    else
    {
    post_category='DailyMorning'
    }
    console.log(post_category)
    router.push({
        path: '/post_category',
        query: {
            post_category:post_category,
        },
    })

}
</script>

<template>
    <!-- <h1>{{ father_page_Message }}</h1> -->
    <div class="nft" v-for="(item,index) in new_news_data" :key="index"  >
      
      <div class='article-container'   >
      <div class="article-item article-item--list " data-post-id="1568802" style="border-radius: 10px; background-color:#1F1D2B">
                        <div class="article-image cover-image">
                <a  class="article-label" target="_blank" ga-bind="click" ga-category="MainPage_List" ga-action="ToItemArticle" ga-label="Article" @click="Enter_category(item.fields.original_category)">{{ item.fields.original_category }}</a>
                <a  ga-bind="click" ga-category="MainPage_List" ga-action="ToItemArticle" ga-label="Article" class="article-link cover-block" target="_blank" @click="Enter_content(item.fields.post_id,item.fields.original_category)" :style="{'background-image':'url('+item.fields.post_cover_image+')'}"></a>
            </div>
        
        <div class="article-info js-transform">
            <h3>
                <a class="js-title-transform"  ga-bind="click" ga-category="MainPage_List" ga-action="ToItemArticle" ga-label="Article"  @click="Enter_content(item.fields.post_id,item.fields.original_category)" target="_blank">{{item.fields.post_title}}</a>
            </h3>
            <div class="article-summary">{{ item.fields.post_excerpt }}</div>
            <div class="article-meta" data-post-id="1568802">

      
      
        

        
                 
                        <span  style="color: #bdbdbd; font-size: 13px;">{{ item.fields.created_at}}</span>
                 
            </div>
        </div>
    </div>
    </div>
</div>
<button class="discover-loadbtn" @click="get_new_news()">查看更多</button>

</template>

<style scoped>
.discover-loadbtn {
  cursor: pointer;
  margin-top: 20px;
  align-self: center;
  width: 161px;
  height: 40px;
  border: 1px solid #D7D7D7;
  border-radius: 10px;
  background-color: transparent;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 1.5px;
  color: #BCBCBC;
}
* {
    box-sizing: border-box;
}
.article-collection--list .collection-container {
    position: relative;
    display: inline-block;
    vertical-align: top;
    background: #fff;
    width: 795px;
    margin-left: 4px;
    z-index: 10;
}
div {
    display: block;
}
.cover-image {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
}
.article-collection--list {
    font-size: 0;
}

.sub-nav {
    min-height: 100%;
    position: relative;
    /* font-size: 1.6rem; */
    font-family: PingFangSC-Regular,"Microsoft Yahei-Regular","Microsoft Yahei";
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    min-width: 1140px;
    font-size: 10px;
    height: 100%;
    line-height: normal;

    font-family: sans-serif;
    line-height: 1.15;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    position: relative;
    display: inline-block;
    color: #333;
    margin: 16px 0;
}
.sub-nav .navbar-container {
    width: 1120px;
    margin: 0 auto;
}

.sub-nav .navbar-box {
    width: 720px;
    font-family: PingFangSC-Medium,"Microsoft Yahei-Bold","Microsoft Yahei";
    position: relative;
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
.sub-nav .sub-nav-item.sub-nav-item--active {
    color: #ef2f11;
}
.sub-nav .sub-nav-item {
    position: relative;
    display: inline-block;
    font-size: 1.8rem;
    line-height: 2.6rem;
    margin-right: 28px;
    cursor: pointer;
    color: #3a3a3a;
}
.sub-nav .sub-nav-item {
    position: relative;
    display: inline-block;
    font-size: 1.8rem;
    line-height: 2.6rem;
    margin-right: 28px;
    cursor: pointer;
    color: #3a3a3a;
}
.sub-nav .inner-holder {
    position: relative;
    display: inline-block;
    width: 696px;
    margin: 14px 0;
    max-height: 30px;
    overflow: hidden;
}
.sub-nav .left-arrow i, .sub-nav .right-arrow i {
    font-size: 2.4rem;
}
.sub-nav .left-arrow .left-white-cover, .sub-nav .right-arrow .left-white-cover {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 24px;
    top: 0;
    z-index: 10;
    background: -webkit-linear-gradient(left,#fff,rgba(255,255,255,.4));
    background: linear-gradient(to right,#fff,rgba(255,255,255,.4));
}
.sub-nav .left-arrow, .sub-nav .right-arrow {
    position: relative;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    width: 24px;
    height: 24px;
    vertical-align: top;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    margin: 18px 0 0;
}
.sub-nav .left-arrow .right-white-cover, .sub-nav .right-arrow .right-white-cover {
    position: absolute;
    width: 44px;
    height: 24px;
    left: -44px;
    top: 0;
    font-size: 0;
}
.sub-nav .left-arrow .right-white-cover .linear-gradient, .sub-nav .right-arrow .right-white-cover .linear-gradient {
    display: inline-block;
    width: 24px;
    height: 100%;
    background: -webkit-linear-gradient(right,rgba(255,255,255,.9),rgba(255,255,255,.4));
    background: linear-gradient(to left,rgba(255,255,255,.9),rgba(255,255,255,.4));
}
.sub-nav .left-arrow .right-white-cover .white-block, .sub-nav .right-arrow .right-white-cover .white-block {
    display: inline-block;
    width: 20px;
    height: 100%;
    background: #fff;
}
.ifanrx-right:before {
    content: "\e65a";
}
.sub-nav .left-arrow i, .sub-nav .right-arrow i {
    font-size: 2.4rem;
}
li {
    display: list-item;
    text-align: -webkit-match-parent;
}
.sub-nav .sub-nav-item__container {
    display: inline-block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
}

li, ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.article-item--list h3 a {
  font-size: 18px;
    color: #F2F2F2;
}

a:-webkit-any-link {
    /* color: -webkit-link; */
    cursor: pointer;
    text-decoration: none;
}

element.style {
    background-image: url(https://s3.ifanr.com/wp-content/uploads/2023/11/ppp.png!260);
}

.article-item--list h3 {
    max-width: 530px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 25px;
    max-height: 50px;
    margin: 12px 0 16px 0;
    font-family: PingFangSC-Medium,"Microsoft Yahei-Bold","Microsoft Yahei";
    font-size: 18px;
    font-weight: 400;
    white-space: normal;
}

.article-item h3 {
 
    color: #333;
}
h3 {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
 
}

html body div h1, html body div h2, html body div h3, html body div h4, html body div h5, html body div h6 {
    font-family: Helvetica,Arial,PingFangSC-Regular,'Hiragino Sans GB','Source Han Sans CN',Roboto,'Microsoft Yahei',sans-serif;
}
a  {
    
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
    text-decoration: none;
    
}
a:hover{
    cursor: pointer;
}

.article-item .article-meta {
    color: #999;
}
.article-item--list .article-meta {
    position: absolute;
    right: 0;
    bottom: 8px;
    left: 0;
    height: 20px;
    font-size: 1.2rem;
    line-height: 20px;
    color: #a8a8a8;
}
.article-item--list .article-meta time {
    display: inline-block;
    font-size: 1.2rem;
}
.article-item .article-meta .float-right {
    float: right;
}
.article-item .ifanrx-like, .article-item .ifanrx-reply {
    cursor: pointer;
}
.article-item .article-meta .like-count:before {
    font-size: 1.25rem;
    vertical-align: 1px;
}
.article-item .article-meta span:before {
    margin-right: 6px;
    color: #a8a8a8;
}
.article-item .article-label {
    position: absolute;
    z-index: 20;
    top: 8px;
    left: 8px;
    padding: 0 8px;
    font-size: 1.2rem;
    line-height: 20px;
    color: #fff;
    border-radius: 2px;
    background-color: rgba(0,0,0,.72);
}
element.style {
    background-image: url(https://s3.ifanr.com/wp-content/uploads/2023/09/ddd.png!260);
}

.article-item--list .article-image {
    position: relative;
    float: left;
    overflow: hidden;
    width: 240px;
    height: 135px;
}
.c-card-author__contact--reply::before, .c-card-meta__info--reply::before, .c-social-bar__icon--reply::before, .ifanrx-reply:before {
    content: "\e63a";
}
.article-item .ifanrx-like::after, .article-item .ifanrx-like::before, .article-item .ifanrx-reply::after, .article-item .ifanrx-reply::before {
    font-family: ifanrx!important;
}
.article-item--list h3 a:hover {

    color:#747bff
}
.c-card-meta__info--like::before, .ifanrx-like:before {
    content: "\e622";
}
.article-item .article-meta .text-link {
    position: relative;
    margin-left: 6px;

}
.article-item .article-meta span {
    font-size: 1.2rem;
}

.article-item .ifanrx-like, .article-item .ifanrx-reply {
    cursor: pointer;
}
.c-article-comments-item-voting--down, .c-article-comments-item-voting--up, .c-article-comments__submit-shortcut, .c-article-likes__button.is-active, .c-article-likes__button::before, .c-article-nav__header__icon, .c-article-share__button::before, .c-card-author__contact, .c-card-meta__info--comments::before, .c-card-meta__info--like::before, .c-card-meta__info--reply::before, .c-contacts__icon--email::before, .c-contacts__icon--rss::before, .c-contacts__icon--twitter::before, .c-contacts__icon--wechat::before, .c-contacts__icon--weibo::before, .c-contacts__icon--zhihu::before, .c-dasheng-sliders__control, .c-featured-slider .slick-next, .c-featured-slider .slick-prev, .c-goto-top-item--app, .c-goto-top-item--contribute, .c-goto-top-item--contribute:hover, .c-goto-top-item--go, .c-goto-top-item--qrcodes, .c-mindstore-widget-vote__icon, .c-player-progress__state, .c-player-screen__content__play, .c-social-bar__icon--comment, .c-social-bar__icon--commentflashnews, .c-social-bar__icon--comments, .c-social-bar__icon--douban, .c-social-bar__icon--email, .c-social-bar__icon--linkedin, .c-social-bar__icon--linkedinFlashnews, .c-social-bar__icon--more, .c-social-bar__icon--qzone, .c-social-bar__icon--reply, .c-social-bar__icon--rss, .c-social-bar__icon--twitter, .c-social-bar__icon--twitterFlashnews, .c-social-bar__icon--wechat, .c-social-bar__icon--wechatFlashnews, .c-social-bar__icon--weibo, .c-social-bar__icon--weiboFlashnews, .c-social-bar__icon--zhihu, .c-video-list__more__link, .c-video-player__chooser__control, .ifanrx {
    font-family: ifanrx!important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

i {
    font-style: italic;
}
.text-link {
    color: inherit;
    text-decoration: none;
    outline: 0;
}
.article-item--list .article-meta {
    position: absolute;
    right: 0;
    bottom: 8px;
    left: 0;
    height: 20px;
    font-size: 1.2rem;
    line-height: 20px;
    color: #a8a8a8;
}
.article-item--list .article-meta .author-info {
    position: relative;
    float: left;
    margin-right: 16px;
    padding-left: 28px;
}
.cover-block {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
img {
    overflow-clip-margin: content-box;
    overflow: clip;
}
.article-item--list .article-meta .author-info img {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
img {
    border-style: none;
}
.article-item--list .article-meta .author-info span {
    display: inline-block;
    margin-left: 0;
}
.article-item--list .article-info {
    position: relative;
    overflow: hidden;
    height: 135px;
    margin-right: 8px;
    margin-left: 256px;
    /* border-bottom: 2px dotted #252954; */
    border-top: 2px dotted #252954;
}
.article-item .article-link {
    z-index: 10;
}
.article-item--list .article-image .article-link {
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-transition: .6s;
    transition: .6s;
    -webkit-transform: scale(1);
    transform: scale(1);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
article, aside, footer, header, nav, section {
    display: block;
}
.article-item--list .article-summary {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 20px;
    font-size: 1rem;
    line-height: 20px;
    color: #a8a8a8;
}

.article-item--list {
    position: relative;
    overflow: hidden;
    height: 135px;
    margin-bottom: 24px;
    background-color: #FFFFFF;
}

section {
    display: block;
}
</style>