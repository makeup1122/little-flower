var qiniu = require("qiniu");

qiniu.conf.ACCESS_KEY = 'kzijgl5jeVqgzkPoCtd_99pgDIpKe4fvOLNFCBDY';
qiniu.conf.SECRET_KEY = '6CXYsy87Q6Su-sAFisf3zRyLFN00fKI5Dfjwwcuk';

var bucket = 'litterflower';

var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+'111.jpg');

var token = putPolicy.token();
module.exports = token;