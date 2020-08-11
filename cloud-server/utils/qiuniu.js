const qiniu = require('qiniu')

var accessKey = 'AWRtHgTFC5jFdUf09ZvzEkdAoP2OmfcOVJRtxPNa';
var secretKey = 'cFCoYgHN1_IpmnqPbD_MLuXx3YML8waCseYaOWsc';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

module.exports = function(){
    var options = {
        scope: 'one-cloud-book',
        expires: 7200,
        returnBody: '{"key":"$(key)","hash":"$(etag)","url":"http://q33oebxtx.bkt.clouddn.com/$(key)"}',
        deadline: Math.round(new Date().getTime()/1000)+3600,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    return uploadToken
}// 执行此函数后便能得到一个token