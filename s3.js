var s3 = require('s3');
const fs = require('fs');
const testFolder = './uploadimg/listing';

var client = s3.createClient({
 maxAsyncS3: 20,     // this is the default
 s3RetryCount: 3,    // this is the default
 s3RetryDelay: 1000, // this is the default
 multipartUploadThreshold: 20971520, // this is the default (20 MB)
 multipartUploadSize: 15728640, // this is the default (15 MB)
 s3Options: {
   accessKeyId: "======",
   secretAccessKey: "=============+======",
 },
});

fs.readdir(testFolder, (err, files) => {
    console.log(files);
    for(var file of files){
    
var params = {
    localFile: "/usr/share/nginx/html/"+file,
    s3Params: {
      Bucket: "bucketname",
      Key: 'listing/'+file,
      ACL: "public-read"
    },
  };
  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
    }
});
