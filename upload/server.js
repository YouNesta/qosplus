const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Md5         = require('md5');
const gm = require('gm');

const app = express();
app.use(cors());

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const dest = path.join(__dirname, "../myApp/public/uploads")
            cb(null, dest)
        },
        filename: function(req, file, cb){
            const ext = path.extname(file.originalname);
            console.log(ext)
            cb(null, Math.random().toString(36).substring(7)+ext);
        }
    })
});

app.post('/upload', upload.any(), function(req, res){
    res.json(
        req.files.map(file => {
            console.log(file)

            var fileInfo = {
                destination: file.destination,
                path: file.path,
                original: file.filename
            };

            var param = {
                small: {
                    size: [134,67],
                    name: Md5(new Date().toString() + file.original) +'-small'+ path.extname(fileInfo.original)
                },
                medium: {
                    size: [400,200],
                    name: Md5(new Date().toString() + file.original) +'-medium'+ path.extname(fileInfo.original)

                },
                big: {
                    size: [800,400],
                    name: Md5(new Date().toString() + file.original) +'-big'+ path.extname(fileInfo.original)
                }
            };

            resize(0, fileInfo, param);
            return {
                generatedName: fileInfo.original,
                generatedNameSmall: param['small'].name,
                generatedNameMedium:param['medium'].name,
                generatedNameBig: param['big'].name
            }


            function resize(i, file, param) {
                var paramName = ["small", "medium","big"]
                if(i < 3){
                    var current =  param[paramName[i]];
                    var size = current.size;
                    var destination = file.destination+'/'+ current.name;

                    gm(file.path)
                        .resize(size[0], size[1])
                        .write(destination, function (err) {
                            if (!err){
                                console.log(' hooray! ')
                                resize(++i,file,param)
                            }else{
                                console.log(err)
                            };
                        });

                }
            }

        })
    );
});

app.listen(2028, () => {
    console.log('ng2-uploader server running on port 2028.');
});