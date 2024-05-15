<script setup lang="ts">
import { ref } from 'vue'
function onBeforeEnter(){
    
    console.log('被调用 onBeforeEnter')
}
let lodaingflag=ref<boolean>(true)
</script>

<template>
<!-- 路由跳转加载动画 -->
<div class="body-bg"  >

<div class="landingpage">
  <div style="height:100vh ; margin: 0; background: #1F1D2B; margin: auto; overflow: hidden " v-if="lodaingflag">
    <div class="glitch" data-glitch="Loading...">Loading...</div>
</div>
</div>
</div>

<Transition name="slide-fade" @before-enter="onBeforeEnter">
<router-view />
</Transition>
</template>

<style scoped>

/* #nprogress .bar {
    background: rgb(43, 255, 0) !important;
}
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(600px);
  opacity: 0;
} */
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
</style>
