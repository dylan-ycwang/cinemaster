// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    brands: [1,1,1,1],
    audioBrands: [],
    hifiBrands:[],
    accessoryBrands: [],
    acousticBrands: [],
    cableBrands: [],
    ampBrands: [],
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

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

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
    let queryAccessory = new wx.BaaS.Query()
    let queryAcoustics = new wx.BaaS.Query()
    let queryCable = new wx.BaaS.Query()
    let queryAmp = new wx.BaaS.Query()

    //set conditions to queries
    queryAudio.compare('brand_category', "=", '1音箱品牌')
    queryHifi.compare('brand_category', "=", '2唱盘唱头')
    queryAccessory.compare('brand_category', "=", '6配件品牌')
    queryAcoustics.compare('brand_category', "=", '5吸音减震')
    queryCable.compare('brand_category', "=", '4线材品牌')
    queryAmp.compare('brand_category', "=", '3功放品牌')

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
    brandTable.setQuery(queryAccessory).find().then(
      (res)=>{
        this.setData({
          accessoryBrands: res.data.objects
        })
        console.log("accessory brands", this.data.accessoryBrands)
      }, err => {
        console.log("accessory brands error", err)
      }
    )
    brandTable.setQuery(queryAcoustics).find().then(
      (res)=>{
        this.setData({
          acousticBrands: res.data.objects
        })
        console.log("acoustic brands", this.data.acousticBrands)
      }, err => {
        console.log("acoustic brands error", err)
      }
    )
    brandTable.setQuery(queryCable).find().then(
      (res)=>{
        this.setData({
          cableBrands: res.data.objects
        })
        console.log("cable brands", this.data.cableBrands)
      }, err => {
        console.log("cable brands error", err)
      }
    )
    brandTable.setQuery(queryAmp).find().then(
      (res)=>{
        this.setData({
          ampBrands: res.data.objects
        })
        console.log("amp brands", this.data.ampBrands)
      }, err => {
        console.log("audio brands error", err)
      }
    )
    brandTable.find().then((res)=> {
      console.log("all brands",res)
    }, err => {
      console.log("error", err)
    })
  },

  makePhoneCall(){
    wx.makePhoneCall({
      phoneNumber: '4008205607',
    })
  },

  naviagteTM(){
    
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
