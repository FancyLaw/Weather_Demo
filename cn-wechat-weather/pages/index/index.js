// const weatherMap = {
//   'sunny': '晴天',
//   'cloudy': '多云',
//   'overcast': '阴',
//   'lightrain': '小雨',
//   'heavyrain': '大雨',
//   'snow': '雪'
// }

const weatherColorMap = {
  'sunny': '#C5EFFE',
  'cloudy': '#DBEFF7',
  'overcast': '#C4CED2',
  'lightrain': '#B7D6E1',
  'heavyrain': '#C3CCD0',
  'snow': '#9CE3FD'
}

Page({
  data:{
    nowTemp:'',
    nowWeather:'',
    nowWeather_bg:'',
    forecast: []
  },
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', //仅为示例，并非真实的接口地址
      data: {
        city: '北京市'
      },
      success: res => {
        console.log(res.data)
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        console.log(temp, weather)
        this.setData({
          nowTemp:temp + '°',
          nowWeather: weather,
          // nowWeather: weatherMap[weather]
          nowWeather_bg: '/images/' + weather + '-bg.png',
          
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather]
        })

      },
      complete:() =>{
        callback && callback()
      }
    })
  },
  onLoad(){
    this.getNow()
  },
  onPullDownRefresh(){
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })

  },
})