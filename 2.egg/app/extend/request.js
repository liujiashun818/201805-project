module.exports = {
    get isChrome(){
        let userAgent = this.headers['user-agent'];
        return userAgent.toLowerCase().includes('chrome');
    }
 }