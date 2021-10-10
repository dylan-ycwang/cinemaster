// components/segment.js
Component({
  /**
   * Component properties
   */
  properties: {
    brands: Array
  },

  /**
   * Component initial data
   */
  data: {
  },

  // onLoad: function (options){
  //   this.setCardInfo()
  // },


  /**
   * Component methods
   */
  methods: {
    goToBrand(e) {
      const brand_id = e.currentTarget.dataset.id
      console.log(brand_id)
      // wx.navigate to function and pass brand_id into it
    }
  }
})
