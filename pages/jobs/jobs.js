// pages/jobs/jobs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hits: [],
    region: ['上海', '北京', '广州', '深圳', '杭州'],
    customItem: '全部',
    cityIndex: 0
  },

  tapItem: function (e) {
    var item = null;
    this.data.hits.forEach(i => {
      if (i._source.id == e.currentTarget.id) {
        item = i;
      }
    })
    app.globalData.currentItem = item;
    wx.navigateTo({
      url: './jobitem',
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      cityIndex: e.detail.value
    })
    this.fetch(this.data.region[this.data.cityIndex])
  },

  fetch: function (city) {
    wx.request({
      url: 'https://www.sov2ex.com/api/search',
      data: {
        node: 'jobs',
        q: city,
        sort: 'created',
        size: 50
      },
      success: res => {
        var hits = res.data.hits;
        hits.forEach(item => {
          item._source.created = util.formatTime(new Date(item._source.created))
        })
        this.setData({
          hits: hits
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetch('上海');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})