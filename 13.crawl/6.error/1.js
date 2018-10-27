function exec() {
    a.log();
}
process.on('uncaughtException', function (error) {
    console.log('监听到未知的错误', error)
});
setTimeout(function () {
    console.log('ending....');
}, 1000);
exec();