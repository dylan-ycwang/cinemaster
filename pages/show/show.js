// pages/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    brand: Object,
    allBrands: Array,
    nextBrand: Object,
    currentIndex: null,
    nextBrandIndex: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setBrandInfo();
    this.setAllBrands();
    // this.setNextBrandIndex()
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
      brandTable.orderBy(['brand_category','created_at']).limit(50).find().then(
        (res)=>{
          this.setData({
            allBrands: res.data.objects,
            currentIndex:res.data.objects.findIndex(x => x.id === this.data.brand.id),
          })
          console.log("all brands", this.data.allBrands)
        }, err => {
          console.log("next brand", err)
        }
      ).then((res) => {
        this.setNextBrandIndex()
      }, err => {
        console.log(err)
      }
      ),
      resolve(this.data.allBrands);
      
    });
  },

  setNextBrandIndex(){
    let currentIndex = this.data.currentIndex    
    if (currentIndex <  this.data.allBrands.length -1 ) {
      console.log('nextBrandIndex', currentIndex + 1)
      this.setData ({
        nextBrandIndex: currentIndex + 1,
      })
      // console.log('next brand', this.data.nextBrand)
      // console.log("next brand index", this.data.nextBrandIndex)
    } else {
      this.setData ({
        nextBrandIndex: 0,
      })
    }
    const i = this.data.nextBrandIndex
    this.setData({
      nextBrand: this.data.allBrands[i]
    })
  },

  toNextBrand() {
    wx.redirectTo({
      url: `/pages/show/show?id=${this.data.nextBrand.id}`
    })
  },
  handleToWebsite(){
    const websiteUrl = this.data.brand.website_url

      wx.navigateTo({
        url: `/pages/webview/webview?url=${websiteUrl}`,
      })
  },

  handleToTmall(){
    const tmallUrl = this.data.brand.tmall_url
    
      wx.navigateTo({
        url: `/pages/webview/webview?url=${tmallUrl}`,
      })
  },
  handleToIndex() {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    // this.setNextBrandIndex();
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

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