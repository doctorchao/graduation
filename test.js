// var arr = [
//     {
//         name:'zopp',
//         old:{age:0},
//     },
//     {name:'gpp',old:{age:18}},
//     {name:'yjj',old:{age:8}}
// ];
//  function compare(old,age){
//     return (a,b) =>b[old][age] - a[old][age];
// }
// var abc = arr.sort(compare('old','age'))
// console.log(arr, '原数组')
// console.log(abc, '新数组')
// console.log(messageList,'这里是messageList')

// var arr = [
//     {sex: 1, age: 10},
//     {sex: 2, age: 20},
//     {sex: 3, age: 10},
//     {sex: 4, age: 20},
// ]
// console.log(arr.filter((e)=>{
//     return e.sex == 1 || e.age == 20
// }))

// var str = '我非常爱中国'
// console.log(str.slice(2)) 
// var a = 1
// var b = 0
// console.log(!a || !b)
// console.log(!(a&&b))

// var a =1
// var b =2
// if(a){
//     console.log('周青蓉')
// }else if(b){
//     console.log('史瑞雪')
// }else{
//     console.log('好妹子')
// }
// var now = new Date()
// var hour = now.getHours()
// var min = now.getMinutes()
// var xztime = hour+':'+min
// console.log(hour,min)
// console.log(xztime)

// var a = 'http://wx.zhijiashare.com/#/openResContent/2c92e53e72a3f9b80172bbf8a8684433http'
// console.log(a.replace(/http/g,'https'))
// var a = false
// var b = 1
// if(a){
//     console.log(123)
// }else if(b=1){
//     console.log(456)
// }
// var d = new Date(2017,9,0);
// console.log(d.getDate());

function abc(index){
    const now = new Date();
    const day = new Date(now.getFullYear(), now.getMonth()+1+index,0)
    // console.log(now.toLocaleString())
    // console.log(day.toLocaleString())
    // console.log(now.getFullYear())
    console.log(now.getMonth())
    // console.log(now.getDate())
    // console.log(now.getDay())
    console.log(day.getDate())
    const date = new Date(now.getFullYear(), now.getMonth()+index,1)
    console.log(date.toLocaleString())
    console.log(date.getDay())
}
// console.log(abc(0))
// for(let i = 0;i<=1;i++){
//     // doc[i].appendChild(div)
//     console.log(123)
// }

// var arr = [0,1,2,3,4]
// arr.forEach(item =>{
//     item*2
// })
// var aaa= arr.map(item=>{
//     return item*2
// })
// console.log(arr)
// console.log(aaa)

// var data = ticketsArr.map(item =>{
//     if(item.tDate == this.tDate){
//         item.tMoney = this.dayPrice
//         item.remainNum = this.limitNum
//         console.log('找到对应时间')
//         return 1
//     }
// })
// console.log(data,'查找结果')
// if(!data[0]){
//     console.log('没有找到')
//     var obj = new Object()
//     obj.tDate = this.tDate
//     obj.tMoney = this.dayPrice
//     obj.remainNum = this.limitNum
//     ticketsArr.push(obj)
// }

// var ab = [
//     {
//         name:'dog',
//         age:10
//     },
//     {
//         name:'dog',
//         age:8
//     },
//     {
//         name:'cat',
//         age:10
//     },
// ]
// // console.log(ab.map((item)=>{
// //     return item = 0
// // }))
// console.log(ab.filter((item)=>{
//     return !((item.name == 'dog')&&(item.age == 10))
// }))

// var str  = '1-4-6'
// var ab = str.split('-')
// console.log(ab)
// var str = 'asdjadan-ada=adad'
// console.log(str.split(','))
// 特殊字符转义
// let encodeSearchKey = function(key) {
//     const encodeArr = [{
//       code: '%',
//       encode: '%25'
//     }, {
//       code: '?',
//       encode: '%3F'
//     }, {
//       code: '#',
//       encode: '%23'
//     }, {
//       code: '&',
//       encode: '%26'
//     }, {
//       code: '=',
//       encode: '%3D'
//     }];
//     return key.replace(/[%?#&=]/g, ($, index, str) => {
//       for (const k of encodeArr) {
//         if (k.code === $) {
//           return k.encode;
//         }
//       }
//     });
//   }
//   console.log(encodeSearchKey('%1234我们一起走$ss=你'))

// var day1 = new Date('2020-7-10').getTime()
// var day2 = new Date('2020-8-2').getTime()
// var reduce = (day2-day1)/(1000*60*60*24)
// console.log(reduce)

// const valuedate = new Date ('2020-7-30')
// console.log(valuedate,'第一次')
// function handlecomputed (value) {
//     let olddate = new Date (value)
//     let currentdate = new Date()
//     const oldtime = olddate.getTime() // 获取服务器所给Unix时间戳
//     const currenttime = currentdate.getTime() // 获取本地实时Unix时间戳
//     const reducetime = currenttime - oldtime // 两者之差
//     const time = new Date()
//     time.setHours(0)
//     time.setMinutes(0)
//     time.setSeconds(0)
//     time.setMilliseconds(0)
//     const zerotime = time.getTime()
//     // 小于一小时 显示多少分钟前
//     // 小于一天 显示多少小时前
//     // 小于一个月 显示多少天前
//     // 小于一年 显示多少个月前
//     let min = 1000*60
//     let hour = 1000*60*60
//     let day = 1000*60*60*24
//     let mouth = 1000*60*60*24*30
//     let year = 1000*60*60*24*365
//     let stepDay = zerotime-oldtime
//     if((reducetime/min <1) && (stepDay <= 0)){
//       value = `刚刚`
//     } else if ((reducetime/hour <1) && (stepDay <= 0)) {
//       value = `${Math.floor(reducetime/min)}分钟前`
//     } else if ((reducetime/day < 1)&&(stepDay <= 0)){
//       value = `${Math.floor(reducetime/hour)}小时前`
//     } else if((stepDay > 0)&&(reducetime/day < 1)){
//       value = `昨天`
//     } else if ((stepDay > 0)&&(reducetime/mouth) < 1) {
//       value = `${Math.floor(reducetime/day)}天前`
//     } else if ((reducetime/year < 1) && (stepDay > 0)) {
//       value = `${Math.floor(reducetime/mouth)}月前`
//     } else if(reducetime/year > 1){
//       value = `${Math.floor(reducetime/year)}年前`
//     }
//     return value
// }
// console.log(handlecomputed(1596165648000),'哦豁')

// function noPassByMobile(str){
//   if(str != null && str != undefined){
//       var pat=/(\d{3})\d*(\d{4})/;
//       return str.replace(pat,'$1****$2');
//   } else {
//       return "";
//   }
// }
// console.log(noPassByMobile('18373280127'))
// const now = new Date();
// const day = new Date(now.getFullYear(), now.getMonth()+1,0)
// const date = new Date(now.getFullYear()+5, 12,1)
// console.log(day)
// console.log(date)
// console.log(typeof(Math.round('14.4')))
// if('00'== '0'){
//     console.log(123)
// }

let time = new Date (1597129328000)
console.log(time.toLocaleString())
