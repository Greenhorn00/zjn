<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'
import new_news from './new_news.vue'
import others_news from './others_news.vue'
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
const router = useRouter()
// import { Search } from '@element-plus/icons-vue'
// const input3 = ref('')
// const select = ref('')
// import plane from './plane.vue'
// import {onMounted} from 'vue'
import service from '../../axios/index.ts'
// import { nextTick } from 'process';
// import { type } from 'os';
// import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
// 先给组件标签传递每日早报的url ，后面切换时再改变
let father_page_Message = ref<string>("DailyMorning")
// 组件组的控制变量
const activeName = ref('DailyMorning')

// 点击新闻类别组件标签
const handleClick = (tab: TabsPaneContext) => {
  // console.log(tab.props.name, event)
  
  father_page_Message.value=tab.props.name as string

  console.log(father_page_Message.value)

}



//将时间戳格式转换成年月日时分秒


//时间格式进行处理
function getTime(strtime: string) {
  //最新头条对应的时间戳
  let old_time = Date.parse(strtime) / 1000
  //此时此刻时间戳
  let now_time: number = new Date().getTime() / 1000

  let gap_time: number = now_time - old_time
  // console.log(now_time)
  // console.log(old_time)
  // console.log(gap_time)


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


// 定义头条信息列表
let Headline_data = reactive<any>([])
// 头条标题
let headline = ref<string>('')
// 头条解释
let headline_expansion = ref<string>('')
// 头条的内容跳转链接
let headlin_content_url = ref<string>('')
// 头条的图片地址
let headlin_img_url = ref<string>('')
// 函数获取头条列表信息，并解构数据，对变量赋值
const get_Headline_data = async () => {

  const res = await service.get('/Headline/')

  // 赋予信息到列表
  Headline_data.values = JSON.parse(res.data.data)
  //给头条标题变量赋值

  headline.value = Headline_data.values[0].fields.headline_headlines
  //给头条解释赋予变量
  headline_expansion.value = Headline_data.values[0].fields.headline_expansion
  //给头条跳转链接
  headlin_content_url.value = Headline_data.values[0].fields.headlin_content_url
  //给图片地址url赋值
  headlin_img_url.value = Headline_data.values[0].fields.headlin_img_url


}
// 定义最新信息列表
let new_news_data = ref<any>([])

const get_new_news = async () => {

  const res = await service.get('/news/new/')

  // 赋予信息到列表

  new_news_data.value = JSON.parse(res.data.data)


  new_news_data.value.forEach((item: any) => {
    item.fields.created_at_format = getTime(item.fields.created_at_format);

  })

}

get_new_news()

get_Headline_data()

// 搜索
let Search=ref<string>('')


// 用户按下回车键进行搜索

function handleenter(search:string){
  if(search.length>40){
    ElMessage({
    showClose: true,
    message: '您要搜索的内容太长了，请删减到四十个字以内',
    type: 'error',
  })
  }
  // console.log('此时搜索的值是'+search)
  get_search_data(search)
}

// 向后端发送搜素请求的函数
const get_search_data = async (search: string) => {
  console.log(search)

//  await service.get('/news/search/',{params:{
//     search:search
// }})
Enter_content(search)

}
get_new_news()
// 进入搜索页内容
const Enter_content = (search:string) => {

    router.push({
        path: '/search_page',
        query: {
            search:search,
        },
    })
  }
  // 头条了解更多
  const headlin_more=(headlin_url:string)=>{
    window.location.href=headlin_url
    
  }
</script>

<template>
  <div class="body-bg">
    <!-- partial:index.partial.html -->
    <div class="landingpage">
      <div class="navbar">
        <a class="navlogo">
          <el-tooltip content="让一部分人先看到未来" placement="bottom">
            LSTN
          </el-tooltip>
        </a>
        <!-- <button class="hamburger">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button> -->
        <div class="navlinkwrap">
          <span class="navlink selectedlink">首页</span>
          <span class="navlink ">个人详情</span>
          <span class="navlink">其他领域</span>
          <!-- <span class="navlink">搜索</span> -->


        </div>

        <!-- 搜索框 -->
        <div class="search" style="margin-left: 20%;">
          <div>
            <!-- <span class="navlink" style="font-size: 18px;">搜索</span> -->
            <input type="text" v-model="Search" @keydown.enter="handleenter(Search)" placeholder="Search . . ." required>
          </div>
        </div>


        <div class="buttonwrap">
          <span class="navlink">注册</span>
          <span class="navlink">登录</span>
        </div>
      </div>
      <div class="box">
        <div class="infobox">

          <p class="infobox-boldtext">
            {{ headline }}
          </p>
          <div class="infobox2">

            <p class="infobox-slimtext span-line">
              <a :href="headlin_content_url">
                {{ headline_expansion }}
              </a>
            </p>


          </div>

          <div class="infobox-btnwrapper">

            <button class="infobox-explorebtn selected" @click="headlin_more(headlin_content_url)">了解更多</button>
            <button class="infobox-createbtn">参与讨论</button>
          </div>
        </div>
        <div class="display">
          <img class="display-nft" :src="headlin_img_url" referrerpolicy="no-referrer" alt="unsplash-OG44d93i-NJk"
            border="0">
          <div class="infowrapper">
            <div class="info">
              <img class="info-img"
                src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80"
                alt="unsplash-OG44d93i-NJk" border="0">
              <div>
                <p>Laura</p>
                <p>0.21 Weth</p>
              </div>
            </div>
            <div class="info2">
              <p>WE ARE HERE</p>
              <div class="iconwrapper">
                <svg width="22" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.7365 2C3.6575 2 1.5 3.8804 1.5 6.5135c0 3.1074 2.3236 5.9603 4.8612 8.1207 1.2458 1.0606 2.4954 1.9137 3.4352 2.5022.4692.2937.8593.5203 1.1305.6727L11 17.85l.0731-.0409a27.984 27.984 0 0 0 1.1304-.6727c.9399-.5885 2.1895-1.4416 3.4353-2.5022C18.1764 12.4738 20.5 9.6209 20.5 6.5135 20.5 3.8805 18.3425 2 16.2635 2c-2.1054 0-3.8008 1.389-4.552 3.6426a.75.75 0 0 1-1.423 0C9.5373 3.389 7.8418 2 5.7365 2ZM11 18.7027l.3426.6672a.7502.7502 0 0 1-.6852 0L11 18.7027ZM0 6.5135C0 3.052 2.829.5 5.7365.5 8.0298.5 9.8808 1.7262 11 3.6048 12.1192 1.7262 13.9702.5 16.2635.5 19.171.5 22 3.052 22 6.5135c0 3.8183-2.8014 7.06-5.3888 9.2628-1.3167 1.121-2.6296 2.0166-3.6116 2.6314-.4918.308-.9025.5467-1.1918.7092a19.142 19.142 0 0 1-.4301.2347l-.0248.013-.007.0036-.0021.0011c-.0003.0001-.0012.0006-.3438-.6666-.3426.6672-.3424.6673-.3426.6672l-.0033-.0017-.007-.0036-.0248-.013a19.142 19.142 0 0 1-.4301-.2347 29.324 29.324 0 0 1-1.1918-.7092c-.982-.6148-2.295-1.5104-3.6116-2.6314C2.8014 13.5735 0 10.3318 0 6.5135Z"
                    fill="#E0E0E0" />
                </svg>
                25
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="auction">
        <div class="title">
          <p class="titlebold ">最新推送</p>
         
            <p class="titleslim">情感分析</p>
       

        </div>
        <!-- 最新新闻组件引入 -->
        <new_news></new_news>

      </div>
      <div class="started">
        <p class="started-boldtext">LSTN</p>
        <p class="started-slimtext"> light spry technology news  一款集轻快为一体的科技推送网站</p>
        <div class="started-items">
          <div class="itemwrapper">
            <div class="started-items-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <path style="stroke:none;fill-rule:nonzero;fill:#e0e0e0;fill-opacity:1"
                  d="M24.7969 14.6719c.4375-.4414.4375-1.1524 0-1.5938-.4414-.4375-1.1524-.4375-1.5938 0L16.5 19.7851l-2.9531-2.957c-.4414-.4375-1.1524-.4375-1.5938 0-.4375.4414-.4375 1.1524 0 1.5938l3.75 3.75a1.1246 1.1246 0 0 0 1.5938 0Zm0 0" />
                <path style="stroke:none;fill-rule:evenodd;fill:#e0e0e0;fill-opacity:1"
                  d="M18.8086.957a2.6005 2.6005 0 0 0-1.6172 0L4.8164 4.9688C3.7344 5.3202 3 6.3241 3 7.4648V15c0 9.2852 5.6563 16.0586 14.1016 19.246a2.5853 2.5853 0 0 0 1.7968 0C27.3438 31.0587 33 24.2853 33 15V7.4648a2.6182 2.6182 0 0 0-1.8164-2.496Zm-.9219 2.1368a.3738.3738 0 0 1 .2266 0l12.375 4.0117c.1601.0547.2617.1992.2617.3593V15c0 8.1914-4.9219 14.2227-12.6445 17.1367a.2815.2815 0 0 1-.211 0C10.172 29.2227 5.25 23.1914 5.25 15V7.4648c0-.1601.1016-.3046.2617-.3593Zm0 0" />
              </svg>
            </div>
            <p>绿色健康</p>
          </div>
          <div class="itemwrapper">
            <div class="started-items-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <path style="stroke:none;fill-rule:evenodd;fill:#bdbdbd;fill-opacity:1"
                  d="M4.125 3C2.6758 3 1.5 4.1758 1.5 5.625v5.25c0 1.4492 1.1758 2.625 2.625 2.625h27.75c1.4492 0 2.625-1.1758 2.625-2.625v-5.25C34.5 4.1758 33.3242 3 31.875 3Zm27.75 2.25H4.125c-.207 0-.375.168-.375.375v5.25c0 .207.168.375.375.375h27.75c.207 0 .375-.168.375-.375v-5.25c0-.207-.168-.375-.375-.375Zm0 0" />
                <path style="stroke:none;fill-rule:nonzero;fill:#bdbdbd;fill-opacity:1"
                  d="M4.125 15c.621 0 1.125.504 1.125 1.125v14.25c0 .207.168.375.375.375h24.75c.207 0 .375-.168.375-.375v-14.25c0-.621.504-1.125 1.125-1.125S33 15.504 33 16.125v14.25C33 31.8242 31.8242 33 30.375 33H5.625C4.1758 33 3 31.8242 3 30.375v-14.25C3 15.504 3.504 15 4.125 15Zm0 0" />
                <path style="stroke:none;fill-rule:nonzero;fill:#bdbdbd;fill-opacity:1"
                  d="M14.625 17.25c-.621 0-1.125.504-1.125 1.125s.504 1.125 1.125 1.125h6.75c.621 0 1.125-.504 1.125-1.125s-.504-1.125-1.125-1.125Zm0 0" />
              </svg>
            </div>
            <p>所有新闻 尽皆免费</p>
          </div>
          <div class="itemwrapper">
            <div class="started-items-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="px" viewBox="0 0 36 31">
                <path style="stroke:none;fill-rule:evenodd;fill:#bdbdbd;fill-opacity:1"
                  d="M2.832 2.9219c-.2148 0-.3867.1758-.3867.3906v24.375c0 .2148.1719.3906.3867.3906h4.9453l13.332-14.1875c1.0548-1.121 2.8165-1.1445 3.8985-.0508l8.5469 8.6407V3.3125c0-.2148-.1719-.3906-.3867-.3906Zm30.336 27.5156H2.832c-1.5039 0-2.7226-1.2305-2.7226-2.75V3.3125c0-1.5195 1.2187-2.75 2.7226-2.75h30.336c1.5039 0 2.7226 1.2305 2.7226 2.75v24.375c0 1.5195-1.2187 2.75-2.7226 2.75ZM22.8008 15.5156 10.996 28.0781H33.168c.2148 0 .3867-.1758.3867-.3906v-1.871L23.3594 15.5077a.388.388 0 0 0-.5586.0078Zm-9.4688-4.3398c0 1.5195-1.2187 2.75-2.7226 2.75-1.5 0-2.7188-1.2305-2.7188-2.75 0-1.5196 1.2188-2.75 2.7188-2.75 1.5039 0 2.7226 1.2304 2.7226 2.75Zm2.336 0c0 2.8242-2.2657 5.1094-5.0586 5.1094-2.789 0-5.0547-2.2852-5.0547-5.1094s2.2656-5.1094 5.0547-5.1094c2.793 0 5.0586 2.2852 5.0586 5.1094Zm0 0" />
              </svg>
            </div>
            <p>视频图片一键浏览</p>
          </div>
          <div class="itemwrapper">
            <div class="started-items-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <path style="stroke:none;fill-rule:evenodd;fill:#bdbdbd;fill-opacity:1"
                  d="M30.9453.5a16.7245 16.7245 0 0 0-11.4687 4.5508l-2.0274 1.914a35.9135 35.9135 0 0 0-2.3984 2.4805h-7.836c-.957 0-1.8437.5-2.3359 1.3203L.668 17.7891c-.1952.3242-.2226.7226-.0702 1.0664.1523.3476.4609.5976.828.6758l7.1134 1.496c.0586.0782.125.1485.1992.2188l3.1054 2.914 2.9102 3.1016c.0703.0742.1406.1406.2188.1992l1.496 7.1133c.0782.3672.3282.6758.6758.8281a1.158 1.158 0 0 0 1.0664-.0703l7.0235-4.211a2.7222 2.7222 0 0 0 1.3203-2.3358v-7.836a36.8748 36.8748 0 0 0 2.4844-2.3984l1.9101-2.0274A16.7411 16.7411 0 0 0 35.5 5.0508l-.004-1.8281C35.496 1.7187 34.2774.5 32.7774.5Zm-6.7226 22.3398a39.89 39.89 0 0 1-1.582 1.1172l-5.2813 3.5196 1.0547 5.0156 5.621-3.3711c.1172-.0703.1876-.1992.1876-.336ZM8.5234 18.6406l3.5196-5.2812a34.8776 34.8776 0 0 1 1.1172-1.582H7.2148a.3952.3952 0 0 0-.3359.1913L3.508 17.586ZM21.0781 6.75a14.3862 14.3862 0 0 1 9.8672-3.918h1.832c.211 0 .3868.1758.3868.3907v1.828c0 3.672-1.3985 7.2032-3.9141 9.8712l-1.9102 2.0273a34.7388 34.7388 0 0 1-5.996 5.0664l-5.1133 3.4102-2.711-2.8906c-.0195-.0157-.0351-.0352-.0547-.0508l-2.8906-2.7149 3.4102-5.1172c1.457-2.1796 3.1523-4.1914 5.0625-5.9921Zm5.4766 5.0273c0 1.2891-1.043 2.332-2.332 2.332-1.2891 0-2.332-1.0429-2.332-2.332 0-1.289 1.0429-2.332 2.332-2.332 1.289 0 2.332 1.043 2.332 2.332ZM9.4453 32c1.3985-1.3984 1.3985-4.043 0-5.4453-1.4023-1.3985-4.0469-1.3985-5.4453 0-1.879 1.8828-2.246 6.0703-2.3164 7.3789a.3609.3609 0 0 0 .3828.3828C3.375 34.2461 7.5625 33.879 9.4454 32Zm0 0" />
              </svg>
            </div>
            <p>速度快捷</p>
          </div>
        </div>
      </div>

      <div class="discover">
        <div class="discover-title">
          <p class="navlogo">看你想看</p>
          <div class="filters">
            <div class="filter">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 14 12">
                <path
                  style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#f2f2f2;stroke-opacity:1;stroke-miterlimit:4"
                  d="M1.731 1.002h13.1976M1.731 4.998h9.134M1.731 9h6.0893m4.0636 0 4.0575-4.002m0 0L20.005 9m-4.0636-4.002v12"
                  transform="scale(.63636 .66667)" />
              </svg>
            </div>
            <div class="filter">
              关键词
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 11 6">
                <path
                  style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#f2f2f2;stroke-opacity:1;stroke-miterlimit:4"
                  d="M15.4787 1.002 8.3732 7.998 1.2678 1.002" transform="scale(.64706 .66667)" />
              </svg>
            </div>
            <div class="filter">
              排序方式
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 11 6">
                <path
                  style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#f2f2f2;stroke-opacity:1;stroke-miterlimit:4"
                  d="M15.4787 1.002 8.3732 7.998 1.2678 1.002" transform="scale(.64706 .66667)" />
              </svg>
            </div>
            <button class="filterbtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 14 14">
                <path
                  style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#fff;stroke-opacity:1;stroke-miterlimit:4"
                  d="M1.1546 1.9978c0-.5525.4553-.999 1.0028-.999h16.273c.5537 0 1.0028.4465 1.0028.999v2.578c0 .2735-.1046.5358-.3014.72l-6.5092 6.4062c-.1846.1897-.2953.4464-.2953.7199V15l-4.0606 4.0011V12.422c0-.2735-.1046-.5302-.3015-.7199l-6.503-6.4062c-.1907-.1842-.3076-.4465-.3076-.72Zm0 0"
                  transform="matrix(.63492 0 0 .7 .3333 0)" />
              </svg>
              进行过滤
            </button>
          </div>
        </div>
        <!-- 页签选择，切换组件 -->
        <div style="margin: 10px,10px,10px,10px;">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="每日早报" name="DailyMorning">每日早报</el-tab-pane>
            <el-tab-pane label="产品" name="products">产品</el-tab-pane>
            <el-tab-pane label="玩物志" name="playthings">玩物志</el-tab-pane>
            <el-tab-pane label="科技讯闻" name="technology">科技讯闻</el-tab-pane>
            <el-tab-pane label="生活" name="life">生活</el-tab-pane>
            <el-tab-pane label="董车会" name="car">董车会</el-tab-pane>
            <el-tab-pane label="人物采访" name="person">人物采访</el-tab-pane>
          </el-tabs>
        </div>

        <others_news :father_page_Message="father_page_Message"></others_news>

        <!-- <button class="discover-loadbtn">LOAD MORE</button> -->
      </div>
      <div class="footer">
        <div class="footer-main">
          快讯，让一部分人先看到未来
        </div>
        <div class="footer-navigate">
          <div class="nav">
            <h5>Marketplace</h5>
            <p>Home</p>
            <p>Activity</p>
            <p>Discover</p>
            <p>Learn more</p>
          </div>
          <div class="nav">
            <h5>Company</h5>
            <p>About Us</p>
            <p>Services</p>
            <p>Portfolio</p>
          </div>
          <div class="nav">
            <h5>Contact</h5>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Email</p>
          </div>
        </div>
      </div>
      <div class="footer2">
        <div></div>
        <p>Copyright 2023 LSTN</p>
      </div>
    </div>
    <!-- partial -->
  </div>>
</template>

<style scoped>
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
  padding: 0 80px;
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

.landingpage .navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;
}

.landingpage .box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 80px;
}

.landingpage .auction {
  margin-top: 100px;
}

.landingpage .discover {
  display: flex;
  flex-direction: column;
}

.landingpage .footer {
  border-top: 1px solid #F2F2F2;
    padding: 50px 0 0 0;
    margin: 50px 0 50px 0;
    display: flex;
    align-items: center;
    justify-content: space-between
}

.landingpage .footer2 {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-top: 1px solid #F2F2F2;
}

/* .navbar .hamburgerlogowrap {
  display: flex;
  align-items: center;
} */


.navbar .createbtn.selectedbtn {
  border: 1px solid #D7D7D7;
  border-radius: 10px;
}

/* 登录和注册鼠标悬浮时 */

.navbar .navlogo {
  height: 100%;
  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
}

.navlogo {
  height: 100%;
  background: linear-gradient(93.51deg, #b788e3 2.84%, #ced5df 99.18%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
}

.navbar .navlink {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #BCBCBC;

}

.navlink:hover {
  cursor: pointer;
  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-bottom: 1.5px solid #9B51E0;
}

.navbar .navlink.selectedlink {
  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-bottom: 1.5px solid #9B51E0;
}

.navbar .navlink:not(:last-child) {
  margin-right: 32px;
}

.box .infobox {
  animation-name: leftslide;
  animation-duration: 0.8s;
  max-height: 500px;
  max-width: 58%;
  overflow: hidden;
}

/* 控制头条下方p标签的行宽 */
.box .infobox2 {
  animation-name: leftslide;
  animation-duration: 0.8s;
  max-height: 500px;
  max-width: 75%;
  overflow: hidden;
}

.box .infobox-boldtext {
  margin: 0;
  font-family: Poppins;
  color: #FFFFFF;
  font-size: 40px;
  font-weight: 600;
  line-height: 60px;
  letter-spacing: -2px;
  text-align: left;
}

.box .infobox-slimtext {
  margin: 24px 0;
  font-family: Poppins;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 300;
  line-height: 28px;
  letter-spacing: 0.5px;
  text-align: left;
}

.box .infobox-btnwrapper {
  display: flex;
}

.box .infobox-explorebtn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1F1D2B;
  padding: 8px 38px;
  border-radius: 16px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -1px;
  color: #FFFFFF;
}

.box .infobox-createbtn {
  cursor: pointer;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 8px 38px;
  border: 1px solid #D7D7D7;
  border-radius: 16px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -1px;
  color: #FFFFFF;
}

.box .infobox .selected {
  border: none;
  background: linear-gradient(103.91deg, #9B51E0 21.01%, rgba(48, 129, 237, 0.8) 100%);
}

.box .display {
  animation-name: rightslide;
  animation-duration: 0.8s;
  padding: 10px;
  border: 1px solid;
  background: linear-gradient(169.44deg, rgba(58, 129, 191, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%);
  border-radius: 35px;
  max-height: 450px;
  max-width: 60%;
  overflow: hidden;
}

.box .display-nft {
  object-fit: cover;
  /* flex-shrink: 0; */
  width: 358px;
  height: 230px;
  border-radius: 20px;
}

.box .display .infowrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.box .display .info {
  display: flex;
  align-items: center;
  font-family: "Poppins";
  font-style: normal;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 12px;
}

.box .display .info p {
  margin: 0;
}

.box .display .info-img {
  object-fit: cover;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.titlebold {
  height: 100%;
  background: linear-gradient(93.51deg, #c497f5 2.84%, #e4e8ef 99.18%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 38px;

}

.box .display .info2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: "Poppins";
  color: #FFFFFF;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
}

.box .display .info2 p {
  margin: 0;
}

.box .display .info2 .iconwrapper {
  display: flex;
  align-items: center;
}

.box .display .info2 .iconwrapper svg {
  margin-right: 5px;
}

.auction .title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 50px;
}

.auction .title .titlebold {
  margin: 0;
  font-family: "Poppins";
  font-style: normal;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 32px;
  line-height: 72px;
}

.auction .title .titleslim {
  margin: 0;
  font-family: "Poppins";
  font-style: normal;
  color: #D7D7D7;
  font-weight: 600;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: -1px;
}

.auction .nft {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-content: space-between;
}

.started {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}

.started-boldtext {
  margin: 0;
  align-self: center;
  font-family: "Poppins";
  font-style: normal;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 40px;
  line-height: 72px;
}

.started-slimtext {
  margin: 0;
  align-self: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 36px;
  letter-spacing: 0.5px;
  color: #E2E2E2;
}

.started-items {
  padding: 60px 80px;
  position: relative;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: space-between;
}

.started-items:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100px;
  top: 80px;
  filter: blur(80px);
  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
}

.started-items .itemwrapper p {
  width: 100px;
  margin: 0;
  margin-top: 10px;
  text-align: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
}

.started-items-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 18px;
  background-color: red;
  background: rgba(255, 255, 255, 0.095);
  box-shadow: inset 2.01px -2.01px 20px rgba(214, 214, 214, 0.17), inset -3.01333px 3.01333px 3.01333px rgba(255, 255, 255, 0.39);
  backdrop-filter: blur(74.4293px);
}

.discover-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.discover-title p {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  letter-spacing: -1px;
  color: #FFFFFF;
}

.discover-items {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-content: space-between;
}

/* .discover-loadbtn {
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
} */

.footer-main {
  max-width: 40%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 40px;
  color: #FFFFFF;
}

.footer-navigate {
  display: flex;
}

.footer-navigate .nav {
  margin-left: 60px;
}

.footer-navigate .nav h5 {
  margin: 0;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #FFFFFF;
}

.footer-navigate .nav p {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.03em;
  color: #D7D7D7;
}

.footer2 p {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 36px;
  color: #828282;
}

.item {
  display: flex;
  flex-direction: column;
  justify-self: center;
}

.item-img {
  object-fit: cover;
  flex-shrink: 0;
  width: 340px;
  height: 235px;
  border-radius: 10px;
  transition: 0.3s;
  cursor: pointer;
}

.item-img:hover {
  transform: scale(1.05);
}

.item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid white;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  color: #FFFFFF;
}

.item-date {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #BCBCBC;
}

.filters {
  display: flex;
  align-items: center;
}

.filters .filter {
  display: flex;
  align-items: center;
  margin-right: 30px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #FFFFFF;
}

.filters .filter svg {
  margin-right: 5px;
  margin-left: 5px;
}

.filters .filterbtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
  border: none;
  border-radius: 10px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #FFFFFF;
}

.filters .filterbtn svg {
  margin-right: 5px;
}

@media screen and (max-width: 1500px) {
  .landingpage {
    max-width: 1200px;
  }
}

@media screen and (max-width: 1040px) {
  .box {
    flex-direction: column;
  }

  .box .infobox {
    max-height: 450px;
    max-width: none;
    margin-bottom: 50px;
  }

  .box .display {
    display: none;
    max-height: none;
    max-width: none;
  }

  .auction .nft {
    grid-template-columns: auto auto;
    justify-content: space-around;
  }

  .discover-items {
    grid-template-columns: auto auto auto;
    justify-content: space-around;
  }

  .footer {
    flex-direction: column;
  }

  .footer-main {
    max-width: 80%;
    margin-bottom: 50px;
    text-align: center;
  }

  .footer-navigate .nav:first-child {
    margin: 0;
  }
}

@media screen and (max-width: 925px) {
  .navlinkwrap {
    display: none;
  }

  .buttonwrap {
    display: none;
  }

  .hamburger {
    display: flex !important;
    align-items: center;
  }

  .started-slimtext {
    text-align: center;
  }
}

@media screen and (max-width: 825px) {
  .started-items {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
    padding: 50px 0;
  }

  .started-items:before {
    height: 200px;
    top: 90px;
    filter: blur(120px);
  }

  .discover-items {
    grid-template-columns: auto auto;
    justify-content: space-around;
  }
}

@media screen and (max-width: 700px) {
  .box {
    flex-direction: column;
  }

  .box .infobox {
    max-height: none;
    max-width: none;
    margin-bottom: 50px;
  }

  .box .display {
    display: block;
    max-height: none;
    max-width: none;
  }

  .discover-title {
    justify-content: center;
  }

  .discover-title .filters {
    display: none;
  }

  .auction .title {
    justify-content: center;
  }

  .auction .title .titleslim {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .landingpage {
    padding: 0 20px;
  }

  .box .infobox-boldtext {
    font-size: 45px;
    line-height: 50px;
  }

  .box .infobox-slimtext {
    font-size: 12px;
    line-height: 16px;
  }

  .discover-items {
    grid-template-columns: auto;
    justify-content: space-around;
  }

  .auction .nft {
    grid-template-columns: auto;
    justify-content: space-around;
  }

  .footer-main {
    font-size: 20px;
    line-height: 30px;
    max-width: 100%;
    margin-bottom: 50px;
    text-align: center;
  }

  .footer-navigate {
    justify-content: space-between;
    width: 100%;
  }

  .footer-navigate .nav {
    margin-left: 20px;
  }

  .footer-navigate .nav h5 {
    font-size: 15px;
    line-height: 30px;
  }

  .footer-navigate .nav p {
    font-size: 10px;
    line-height: 18px;
  }
}

@media screen and (max-width: 480px) {
  .landingpage .box .infobox-boldtext {
    font-size: 32px;
    line-height: 1.4em;
    text-align: center;
  }

  .landingpage .box .infobox-slimtext {
    text-align: center;
  }

  .landingpage .box .infobox-btnwrapper {
    justify-content: center;
  }
}

@keyframes leftslide {
  from {
    transform: translateX(-700px);
  }

  to {
    transform: translateX(0px);
  }
}

@keyframes rightslide {
  from {
    transform: translateX(550px);
  }

  to {
    transform: translateX(0px);
  }
}

/* element puls */









.search {
  margin: 0px;

}

.search>div>input:hover {
  cursor: pointer;

}



.search>div {
  display: inline-block;
  position: relative;
  filter: drop-shadow(0 1px rgb(88, 7, 195));
}

.search>div:after {
  content: "";
  background: rgb(88, 7, 195);
  width: 2px;
  height: 14px;
  position: absolute;
  top: 22px;
  right: 0px;
  transform: rotate(140deg);
}

.search>div>input {
  color: rgb(251, 250, 251);
  font-size: 16px;
  background: transparent;
  width: 3px;
  height: 3px;
  padding: 10px;
  border: solid 3px rgb(88, 7, 195);
  outline: none;
  border-radius: 20px;
  transition: width 0.5s;
}

.search>div>input::placeholder {
  color: #efefef;
  opacity: 0;
  transition: opacity 150ms ease-out;
}

.search>div>input:focus::placeholder {
  opacity: 1;
}

.search>div>input:focus,
.search>div>input:not(:placeholder-shown) {
  width: 250px;
}

/* 多行文本溢出部分隐藏 */

p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

/* 鼠标放上个有下划线 */

.span-line:hover {
  /* text-decoration:underline 1px; */
  cursor: pointer;
}

/* 以下是最新 */
* {
  box-sizing: border-box;
}

div {
  display: block;
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


li {
  display: list-item;
  text-align: -webkit-match-parent;
}

li,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

a:-webkit-any-link {
  /* color: -webkit-link; */
  cursor: pointer;
  text-decoration: none;
}




h3 {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

}

html body div h1,
html body div h2,
html body div h3,
html body div h4,
html body div h5,
html body div h6 {
  font-family: Helvetica, Arial, PingFangSC-Regular, 'Hiragino Sans GB', 'Source Han Sans CN', Roboto, 'Microsoft Yahei', sans-serif;
}

a {

  background-color: transparent;
  -webkit-text-decoration-skip: objects;
  text-decoration: none;
  text-decoration: underline;
}


i {
  font-style: italic;
}

img {
  overflow-clip-margin: content-box;
  overflow: clip;
}

img {
  border-style: none;
}

section {
  display: block;
}

.demo-tabs {
  padding: 32px;
}

.demo-tabs {
  padding: 32px 0 32px 0;

}
.el-tabs__content {
  font-size: 32px;
  height: 100%;
  background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
}

</style>
