module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: "8001", //name of port
    public: "0.0.0.0:8001",
    disableHostCheck: true,
    noInfo: true,
  },
  transpileDependencies: [
    'vuetify'
  ],
  // publicPath : '/leaveofabsence', //FOR DEPLOYMENT - UNCOMMENT / FOR DEVELOPMENT - COMMENT MO TO
}
