import{d as C,r as p,y as M,o as f,c as m,e as s,b as i,z as S,f as g,s as A,x as I,_ as x}from"./index-c3a0b86b.js";import{s as D}from"./index-580b5310.js";const v=r=>(A("data-v-fba869b8"),r=r(),I(),r),T={class:"body-bg"},B={class:"landingpage"},L={key:0,style:{height:"100vh",margin:"auto",background:"#1F1D2B",overflow:"hidden"}},H=v(()=>s("div",{class:"glitch","data-glitch":"Loading..."},"Loading...",-1)),N=[H],j={id:"article-header",class:"o-single-content__header",style:{"margin-top":"1%"}},q=["src"],F={class:"o-single-content__body c-single-normal__header",id:"content-meta-header"},P={class:"o-single-normal-content"},V={class:"c-single-normal__title"},z={class:"o-single-content__body__content"},E={id:"ArticleContentMeta","data-component":"ArticleContentMeta"},J={class:"c-meta-share__left"},O={class:"c-article-header-meta"},R={class:"text-link",href:"https://www.ifanr.com/category/people","ga-bind":"click","ga-action":"ClickCategory","ga-category":"ArticlePage_Category","ga-label":"ArticlePage_CategoryButton",target:"_blank"},Y={class:"c-article-header-meta__category"},G={class:"c-article-header-meta__time"},K=v(()=>s("div",{class:"c-meta-share__right"},null,-1)),Q=["innerHTML"],U=C({__name:"Article_details",setup(r){let h=p(!0);const u=M();function y(a){var o=new Date(a*1e3);let d=o.getFullYear(),t=o.getMonth()+1;t=t<10?"0"+t:t;let e=o.getDate();e=e<10?"0"+e:e;let c=o.getHours();c=c<10?"0"+c:c;let _=o.getMinutes();_=_<10?"0"+_:_;let l=o.getSeconds();return l=l<10?"0"+l:l,d+"-"+t+"-"+e+" "+c+":"+_+":"+l}function b(a){a=y(parseInt(a));let o=Date.parse(a)/1e3,t=new Date().getTime()/1e3-o,e="";if(t<60)return e="刚刚",e;if(t<3600)return e=parseInt((t/60).toString())+"分钟前",e;if(t<86400)return e=parseInt((t/3600).toString())+"小时前",e;if(t<172800)return e="昨天"+a.substring(10,16),e;if(t<259200)return e="前天 "+a.substring(10,16),e;if(t<31536e3)return e=a.substring(5,16),e;if(t>31536e3)return e=a,e}let n=p([]);const w=async(a,o)=>{const d="/news/content/",t=await D.get(d,{params:{post_id:a,post_category:o}});n.value=JSON.parse(t.data.data),console.log(n),n.value[0].fields.created_at=b(n.value[0].fields.created_at),h.value=!1};function k(){let a=u.query.post_id,o=u.query.post_category;w(a,o)}return k(),(a,o)=>(f(),m("div",T,[s("div",B,[i(h)?(f(),m("div",L,N)):S("",!0),s("div",j,[s("img",{src:i(n)[0].fields.post_cover_image,alt:"",width:"100%",height:"100%"},null,8,q)]),s("div",F,[s("div",P,[s("h1",V,g(i(n)[0].fields.post_title),1)])]),s("div",z,[s("div",E,[s("div",J,[s("div",O,[s("a",R,[s("p",Y,g(i(n)[0].fields.original_category),1)]),s("p",G,g(i(n)[0].fields.created_at),1)])]),K])]),s("article",{class:"o-single-content__body__content c-article-content s-single-article js-article s-single-article2",innerHTML:i(n)[0].fields.post_content},null,8,Q)])]))}});const Z=x(U,[["__scopeId","data-v-fba869b8"]]);export{Z as default};
