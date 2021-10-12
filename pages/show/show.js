// pages/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    brand: Object,
    allBrands: Array,
    nextBrand: Object,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
  },

  setBrandInfo() {
    let brandTable = new wx.BaaS.TableObject('brandinfo')
    let that = this
    let queryBrand = new wx.BaaS.Query()
    let brandID = that.options.id

    queryBrand.compare('_id', "=", brandID)

    brandTable.setQuery(queryBrand).find().then(
      (res)=>{
        this.setData({
          brand: res.data.objects[0]
        })
        console.log("brand data", this.data.brand)
      }, err => {
        console.log("brand data error", err)
      }
    )
  },

  setAllBrands() {
    let brandTable = new wx.BaaS.TableObject('brandinfo')
    brandTable.find().then(
      (res)=>{
        this.setData({
          allBrands: res.data.objects,
        })
        console.log("all brands ", this.data.allBrands.findIndex(x => x.id === this.data.brand.id) + 1)
      }, err => {
        console.log("all brand", err)
      }
    )
  },

  setNextBrand() {
    console.log(this.data.allBrands)
  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.setBrandInfo();
    this.setAllBrands();
    this.setNextBrand();
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})