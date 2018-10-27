// ctx.isChrome 可以这个属性来判断客户端是不是用的Chrome浏览器
// ctx.isChrome()
module.exports = {
   get isChrome(){
       let userAgent = this.get('user-agent');
       return userAgent.toLowerCase().includes('chrome');
   }
}