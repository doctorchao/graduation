import {
  listget,
  listpost
} from '../../axios/list_ajax'

export const urls = {
  //愿望森林
  treeList : "/api/tree/v1/tree/list?pageNo=",

  //单位图钉列表
  socialList : "/api/cms/v1/social/list?pageNo=",

  //获取新闻列表
  newsList : "/api/cms/v1/news/list?pageNo=",
  //获取平台过滤新闻列表
  newsList0 : "/api/cms/v1/news/list/new?pageNo=",

  //获取置顶新闻列表
  // newsTop : "/api/cms/v1/news/top", 旧
  newsTop : "/api/user/v1/article/top",
  //获取小程序单位定制置顶新闻列表
  // dwnewsTop : "/api/cms/v1/news/top/new", 旧
  dwnewsTop : "/api/user/v1/article/top/new",

  //获取上部的链接
  linkList : "/api/organization/v1/link/list",

  //我的图钉列表,给其他人准备的
  mySocialListNoToken : "/api/user/v1/social/list/my?pageNo=",

    //获取单位资讯
  getDwNwsList : "/api/user/v1/article/list?pageNo=",

    //获取小程序单位定制资讯
  dwgetDwNwsList : "/api/user/v1/article/list/new?pageNo=",
}

/**
 * 愿望森林
 */
export const treeList = (num, params, callback) => {
  listpost(urls.treeList + num, params, callback)
}

/**
 * 获取单位图钉列表
 */
export const socialList = (num, params, callback) => {
  listpost(urls.socialList + num, params, callback)
}

/**
 * 获取新闻列表
 */
export const newsList = (pageNo ,params, callback, filte) => {
  listpost((filte?urls.newsList0:urls.newsList) + pageNo, params, callback)
}
/**
 * 获取新闻列表
 */
export const getDwNwsList = (pageNo ,params, callback, lock) => {
  listpost((lock?urls.dwgetDwNwsList:urls.getDwNwsList) + pageNo, params, callback)
}

/**
 * 获取置顶新闻列表
 */
export const newsTop = (params, callback, lock) => {
  listpost(lock?urls.dwnewsTop:urls.newsTop, params, callback)
}

/**
 * 获取上边的资讯
 */
export const linkList = (params, callback) => {
  listpost(urls.linkList, params, callback)
}

/**
 * 我的图钉列表,给其他人准备的
 */
export const mySocialListNoToken = (num, params, callback) => {
  listpost(urls.mySocialListNoToken + num, params, callback)
}
