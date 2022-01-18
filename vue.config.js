let publicPath = ''
if (process.env.APP_ENV === 'production') {
  publicPath = '/sdg-search-tool/'
}
if (process.env.APP_ENV === 'staging') {
  publicPath = '/'
}
module.exports = {
  publicPath: publicPath
}
