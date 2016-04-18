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
const filePath = path.resolve('../myApp/public/uploads',
    generatedName);

fs.writeFileSync(filePath, fileData);
const data = {
    originalName: originalName,
    generatedName: generatedName
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