// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    brands: [1,1,1,1],
    audioBrands: [],
    hifiBrands:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.setCardInfo()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  setCardInfo () {
    //define the table
    let brandTable = new wx.BaaS.TableObject('brandinfo')
    //instantiate query objects
    let queryAudio = new wx.BaaS.Query()
    let queryHifi = new wx.BaaS.Query()

    //set conditions to queries
    queryAudio.compare('brand_category', "=", '音响品牌')
    queryHifi.compare('brand_category', "=", '唱盘唱头')

    //run queries and set page data
    brandTable.setQuery(queryAudio).find().then(
      (res)=>{
        this.setData({
          audioBrands: res.data.objects
        })
        console.log("audio brands", this.data.audioBrands)
      }, err => {
        console.log("audio brands error", err)
      }
    )
    brandTable.setQuery(queryHifi).find().then(
      (res)=>{
        this.setData({
          hifiBrands: res.data.objects
        })
        console.log("hifi brands", this.data.hifiBrands)
      }, err => {
        console.log("hifi brands error", err)
      }
    )
    brandTable.find().then((res)=> {
      console.log("all brands",res)
    }, err => {
      console.log("error", err)
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
