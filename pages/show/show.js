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
    return new Promise((resolve, reject) => {
      let brandTable = new wx.BaaS.TableObject('brandinfo')
     
      brandTable.orderBy(['-brand_category','created_at']).limit(50).find().then(
        (res)=>{
          this.setData({
            allBrands: res.data.objects,
            nextBrand: res.data.objects[res.data.objects.findIndex(x => x.id === this.data.brand.id) + 1]
          })
          console.log("all brands", this.data.allBrands)
          console.log("next brand ", this.data.nextBrand)
        }, err => {
          console.log("next brand", err)
        }
      ),
      resolve(this.data.allBrands)
    });
  },

  toNextBrand() {
    wx.redirectTo({
      url: `/pages/show/show?id=${this.data.nextBrand.id}`
    })
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