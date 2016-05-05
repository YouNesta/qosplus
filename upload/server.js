/**
 * Created by Younes on 18/04/2016.
 */
'use strict';

const Hapi        = require('hapi');
const Inert       = require('inert');
const Md5         = require('md5');
const Multiparty  = require('multiparty');
const fs          = require('fs');
const path        = require('path');
const server      = new Hapi.Server();
const gm = require('gm');



server.connection({ port: 2028, routes: { cors: true } });
server.register(Inert, (err) => {});

const upload = {
        payload: {
            maxBytes: 209715200,
            output: 'stream',
            parse: false
        },
        handler: (request, reply) => {
        const form = new Multiparty.Form();
form.parse(request.payload, (err, fields, files) => {
    if (err) {
        return reply({status: false, msg: err});
    }

    let responseData = [];

files.file.forEach((file) => {
    let fileData = fs.readFileSync(file.path);
const originalName = file.originalFilename;
const generatedName = Md5(new Date().toString() +
        originalName) + path.extname(originalName);


const generatedNameSmall = Md5(new Date().toString() +
        originalName) +'-small'+ path.extname(originalName);

const generatedNameMedium = Md5(new Date().toString() +
        originalName) +'-medium'+ path.extname(originalName);

const generatedNameBig = Md5(new Date().toString() +
        originalName) +'-big'+ path.extname(originalName);



const filePath = path.resolve('../myApp/public/uploads',
    generatedName);

const filePathSmall = path.resolve('../myApp/public/uploads',
    generatedNameSmall);

const filePathMedium = path.resolve('../myApp/public/uploads',
    generatedNameMedium);

const filePathBig = path.resolve('../myApp/public/uploads',
    generatedNameBig);


fs.writeFileSync(filePath, fileData);


gm(filePath)
    .resize(78, 100)
    .write(filePathSmall, function (err) {
        if (!err){
             console.log(' hooray! ')
        }else{
            console.log(err)
        };
    });


gm(filePath)
    .resize(234, 300)
    .write(filePathMedium, function (err) {
        if (!err){
             console.log(' hooray! ')
        }else{
            console.log(err)
        };
    });


gm(filePath)
    .resize(468, 400)
    .write(filePathBig, function (err) {
        if (!err){
             console.log(' hooray! ')
        }else{
            console.log(err)
        };
    });


const data = {
    originalName: originalName,
    generatedName: generatedName,
    generatedNameSmall: generatedNameSmall,
    generatedNameMedium: generatedNameMedium,
    generatedNameBig: generatedNameBig
};

responseData.push(data);
});

reply({status: true, data: responseData});
});
}
};

const uploads = {
    handler: {
        directory: {
            path: path.resolve('../myApp/public/uploads')
        }
    }
};

server.route([
    { method: 'POST', path: '/upload',          config: upload  },
    { method: 'GET',  path: '/uploads/{path*}', config: uploads }
]);

server.start(() => {
    console.log('Upload server running at', server.info.uri);
});