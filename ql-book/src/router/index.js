import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// export default new Router({
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'index',
          name: 'index',
          meta: {
            title: '青兰云书'
          },
          component: () => import('@/views/index')
        },
        {
          path: 'center',
          name: 'center',
          mata: {
            title: '个人中心'
          },
          component: () => import ('@/views/person')
        },
        {
          path: 'study',
          name: 'study',
          mata: {
            title: '我的阅读'
          },
          component: () => import ('@/views/study')
        }
      ]
    },
    {
      path: '', // path: '/ 是重定向到index  这里不用填'
      name: 'layout2',
      component: () => import ('@/views/layout2'),
      children: [
        {
          path: '/details/:id',
          name: 'details',
          mata: {
            title: '书籍详情'
          },
          component: () => import('@/views/details')
        },
        {
          path: '/titles/:id', // 不传这个刷新后不出来东西
          name: 'titles',
          meta: {
            title: '目录'
          },
          component: () => import('@/views/titles')
        },
        {
          path: '/article/:id',
          name: 'article',
          meta: {
            title: '文章内容'
          },
          component: () => import('@/views/article')
        },
        {
          path: '/login',
          name: 'login',
          meta: {
            title: '登录页面'
          },
          component: () => import('@/views/login')
        },
        {
          path: '/register',
          name: 'register',
          meta: {
            title: '注册页面'
          },
          component: () => import('@/views/register')
        },
        {
          path: '/change',
          name: 'change',
          meta: {
            title: '个人信息'
          },
          component: () => import('@/views/onechat')
        },
        {
          path: '/muchbook/:id',
          name: 'muchbook',
          meta: {
            title: '更多书籍'
          },
          component: () => import('@/views/muchbook')
        },
        {
          path: '/collection/:dwId?',
          name: 'collection',
          props: true,
          meta: {
            title: '收藏书单'
          },
          component: () => import('@/views/collection')
        },
        {
          path: '/like/:id?',
          name: 'like',
          redirect: to =>{ // 路由动态重定向
            var {params} = to
            console.log(to,'路由参数')
            if(params.id){
              return `/like/changepsw/${params.id}`
            }
          },
          // path: '/like?',
          // name: 'like',
          // redirect: to =>{ // 路由动态重定向
          //   var {query} = to
          //   console.log(to,'路由参数')
          //   if(query.id){
          //     return `/like/changepsw/${query.id}`
          //   }
          // },
          props: true,
          meta: {
            title: '喜欢的书'
          },
          component: () => import('@/views/zhibo'),
          children: [
            {
              path: 'change',
              name: 'change',
              meta: {
                title: '个人信息'
              },
              component: () => import('@/views/information')
            },
            {
              path: 'changepsw/:id',
              name: 'changepsw',
              meta: {
                title: '修改密码'
              },
              component: () => import('@/views/changepsw')
            },
            {
              path: 'changename',
              name: 'changename',
              meta: {
                title: '修改昵称'
              },
              component: () => import('@/views/changename')
            },
            {
              path: 'changedesc',
              name: 'changedesc',
              meta: {
                title: '修改个性签名'
              },
              component: () => import('@/views/changedesc')
            },
            {
              path: 'login',
              name: 'login',
              meta: {
                title: '登录页面'
              },
              component: () => import('@/views/login')
            },
            {
              path: 'register',
              name: 'register',
              meta: {
                title: '注册页面'
              },
              component: () => import('@/views/register')
            },
          ]
        },
        {
          path: '/changepsw',
          name: 'changepsw',
          meta: {
            title: '修改密码'
          },
          component: () => import('@/views/changepsw')
        },
        {
          path: '/changename',
          name: 'changename',
          meta: {
            title: '修改昵称'
          },
          component: () => import('@/views/changename')
        },
        {
          path: '/changedesc',
          name: 'changedesc',
          meta: {
            title: '修改个性签名'
          },
          component: () => import('@/views/changedesc')
        },
        {
          path: '/search',
          name: 'search',
          meta: {
            title: '查找结果'
          },
          component: () => import('@/views/search')
        },
        {
          path: '/wang/:id',
          name: 'wang',
          meta: {
            title: '评论区'
          },
          component: () => import('@/views/wang')
        },
        {
          path: '/return/:id',
          name: 'return',
          meta: {
            title: '回复'
          },
          component: () => import('@/views/return')
        },
        {
          path: '/note',
          name: 'note',
          meta: {
            title: '测试'
          },
          component: () => import('@/views/z-note')
        },
        
      ],
    },
    {
      path: '/useCell',
      name: 'useCell',
      meta: {
        title: '单元格'
      },
      component: () => import('@/views/aTest/useCell')
    },
    {
      path: '/serviceSetting',
      name: 'serviceSetting',
      meta: {
        title: '服务设置'
      },
      component: () => import('@/views/aTest/serviceSetting')
    },
    {
      path: '/dateAndPrice',
      name: 'dateAndPrice',
      meta: {
        title: '日期价格'
      },
      component: () => import('@/views/aTest/dateAndPrice')
    },
    {
      path: '/seatSetting',
      name: 'seatSetting',
      meta: {
        title: '设置占位'
      },
      component: () => import('@/views/aTest/seatSetting')
    },
    {
      path: '/buyGoods',
      name: 'buyGoods',
      meta: {
        title: '购买商品'
      },
      component: () => import('@/views/aTest/buyGoods')
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      meta: {
        title: '订单详情'
      },
      component: () => import('@/views/aTest/orderDetail')
    },
    {
      path: '/tiketsList',
      name: 'tiketsList',
      meta: {
        title: '票券列表'
      },
      component: () => import('@/views/aTest/tiketsList')
    },
    {
      path: '/shopOrder',
      name: 'shopOrder',
      meta: {
        title: '分享店订单'
      },
      component: () => import('@/views/aTest/shopOrder')
    },
  ],
  scrollBehavior(to,from,saveTop){ // 页面加载后位置置顶
    if(saveTop){
      return saveTop;
    }else{
      return {x:0,y:0}
    }
  }
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title
  document.title = title
  next()
})

export default router
