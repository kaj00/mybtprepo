// const http = require('http');
// const fs = require('fs');
// const url = require('url');
// const path = require('path');
// const qs = require('querystring');
// const sanitizehtml = require('sanitize-html');
// const myLib = require('./common/lib');
// // import myLib from "./common/lib.js";

// let app = http.createServer(function (request, response) {
//     let _url = request.url;
//     let queryData = url.parse(_url, true).query;
//     let sPath = url.parse(_url, true).pathname;
//     let sFiltedID = '';

//     let oCors = {
//         origin: ['http://localhost:8080','https://kaj00.github.io'],
//         header: "Origin, X-Requested-With, Content-Type, Accept"
//     };

//     if (queryData.id) {
//         sFiltedID = path.parse(queryData.id).base;
//     }

//     if (sPath === '/') {
//         if (!sFiltedID) {
//             sFiltedID = 'welcome'
//         }

//         // /* -- SYNC 함수 
//         let adirContentList = fs.readdirSync('./content');
//         let aContentList = myLib.getFileList(adirContentList, 'content');
//         let adirmyfilesList = fs.readdirSync('./myfiles');
//         let aMyFileList = myLib.getFileList(adirmyfilesList, 'myfiles');

//         let aList = [
//             ...aContentList,
//             ...aMyFileList
//         ];

//         const oFile = aList.find(function (elem) {
//             if (elem.id === sFiltedID) {
//                 return elem;
//             }
//         });

//         let aTemplateContentList = myLib.templateManager.getTemplateList(aContentList);
//         let sDesc = '';

//         if (oFile.id === 'filelist') {
//             sDesc = sanitizehtml(fs.readFileSync(oFile.fileFullName, 'utf-8'))
//             sDesc = sDesc + myLib.templateManager.getTemplateList(aMyFileList);
//         } else if (oFile.rootPath === 'myfiles') {
//             sDesc = sanitizehtml(fs.readFileSync(oFile.fileFullName, 'utf-8'))
//             sDesc = myLib.templateManager.getTemplateFile(sDesc, oFile.id);
//         } else {
//             sDesc = fs.readFileSync(oFile.fileFullName, 'utf-8')
//         }

//         let sTemplate = myLib.templateManager.getTemplateBody(aTemplateContentList, oFile.id, sDesc);

//         response.writeHead(200);
//         response.end(sTemplate);

//     } else if (sPath === '/create_process') {
//         let sBody = '';

//         request.on('data', function (data) {
//             sBody = sBody + data;
//         });
//         request.on('end', function () {
//             let post = qs.parse(sBody);
//             let sFiltedID = path.parse(post.id).base;
//             fs.writeFileSync(`myfiles/${sFiltedID}`, sanitizehtml(post.desc), 'utf-8');

//             response.writeHead(302, {
//                 Location: `/?id=${sFiltedID}`
//             });
//             response.end();
//         });
//     } else if (sPath === '/update_process') {
//         let sBody = '';

//         request.on('data', function (data) {
//             sBody = sBody + data;
//         });
//         request.on('end', function () {
//             let post = qs.parse(sBody);
//             let sFiltedkey = path.parse(post.key).base;
//             let sFiltedID = path.parse(post.id).base;

//             fs.renameSync(`myfiles/${sFiltedkey}`, `myfiles/${sFiltedID}`);
//             fs.writeFileSync(`myfiles/${sFiltedID}`, sanitizehtml(post.desc), 'utf-8');

//             response.writeHead(302, {
//                 Location: `/?id=${sFiltedID}`
//             });
//             response.end();
//         });
//     } else if (sPath === '/delete_process') {
//         let sBody = '';

//         request.on('data', function (data) {
//             sBody = sBody + data;
//         });
//         request.on('end', function () {
//             let post = qs.parse(sBody);
//             let sFiltedID = path.parse(post.id).base;

//             fs.unlinkSync(`myfiles/${sFiltedID}`);

//             response.writeHead(302, {
//                 Location: `/?id=filelist`
//             });
//             response.end();
//         });
//     } else if (sPath === '/update') {
//         let adirContentList = fs.readdirSync('./content');
//         let aContentList = myLib.getFileList(adirContentList, 'content');
//         let adirmyfilesList = fs.readdirSync('./myfiles');
//         let aMyFileList = myLib.getFileList(adirmyfilesList, 'myfiles');

//         let aList = [
//             ...aContentList,
//             ...aMyFileList
//         ];

//         const oFile = aList.find(function (elem) {
//             if (elem.id === sFiltedID) {
//                 return elem;
//             }
//         });

//         let aTemplateContentList = myLib.templateManager.getTemplateList(aContentList);
//         let sDesc = '';

//         sDesc = fs.readFileSync(oFile.fileFullName, 'utf-8')
//         let sTemplateFileEdit = myLib.templateManager.getTemplateFileEdit(oFile.id, sDesc);
//         let sTemplate = myLib.templateManager.getTemplateBody(aTemplateContentList, oFile.id, sTemplateFileEdit);

//         response.writeHead(200);
//         response.end(sTemplate);

//     } else if (sPath === '/files') {
//         let adirmyfilesList = fs.readdirSync('./myfiles');
//         if (adirmyfilesList) {
//             let sFilesList = JSON.stringify(adirmyfilesList);
//             let origin = request.headers.origin;

//             response.setHeader('Content-Type' , 'text/html; charset=utf-8',)
            
//             if(oCors.origin.indexOf(origin) >= 0){
//                 response.setHeader('Access-Control-Allow-Origin', origin);
//                 response.setHeader('Access-Control-Allow-Headers', oCors.header )
//             }
//             response.writeHead(200);
//             response.end(sFilesList);
//         } else {
//             response.writeHead(404);
//             response.end('not found');
//         }
//     } else {
//         response.writeHead(404);
//         response.end('not found');
//     }

// });

// app.listen(8921);

const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const sanitizehtml = require('sanitize-html');
const myLib = require('./common/lib');
const cors = require('cors');
// import myLib from "./common/lib.js";
​
​
let oCors = {
    origin: ['http://localhost:8080', 'https://woongkipark.github.io'],
    credential :true
};
​
app.use(cors(oCors))
​
app.get('/files/:filename?', function (request, response) {
    let sFilename = request.params.filename;
    console.log(sFilename);
​
    let adirmyfilesList = fs.readdirSync('./myfiles');
    let arrfileList = {};
    for (let i = 0; i < adirmyfilesList.length; i++) {
        const element = adirmyfilesList[i];
​
        let sContent = sanitizehtml(fs.readFileSync(`./myfiles/${element}`, 'utf-8'));
​
        arrfileList[element] = { filename : element , content : sContent };
        // arrfileList.
    }
​
    if (adirmyfilesList) {
        let sFilesList = JSON.stringify(arrfileList);
​
        response.writeHead(200);
        response.end(sFilesList);
    } else {
        response.writeHead(404);
        response.end('not found');
    }
})
​
app.post('/files', function (request, response) {
    let sBody = '';
​
    request.on('data', function (data) {
        sBody = sBody + data;
    });
    
    request.on('end', function () {
        let post = qs.parse(sBody);
        let sFiltedID = path.parse(post.filename).base;
​
        fs.writeFileSync( `myfiles/${sFiltedID}` , sanitizehtml(post.fileContent), 'utf-8');
        response.writeHead(200);
        response.end();
    });
})
​
app.get('/create_process', function (request, response) {
    let sBody = '';
​
    request.on('data', function (data) {
        sBody = sBody + data;
    });
    request.on('end', function () {
        let post = qs.parse(sBody);
        let sFiltedID = path.parse(post.id).base;
        fs.writeFileSync(`myfiles/${sFiltedID}`, sanitizehtml(post.desc), 'utf-8');
        
        response.writeHead(302, {
            Location: `/?id=${sFiltedID}`
        });
        response.end();
    });
});
​
app.get('/update_process', function (request, response) {
    let sBody = '';
​
    request.on('data', function (data) {
        sBody = sBody + data;
    });
    request.on('end', function () {
        let post = qs.parse(sBody);
        let sFiltedkey = path.parse(post.key).base;
        let sFiltedID = path.parse(post.id).base;
​
        fs.renameSync(`myfiles/${sFiltedkey}`, `myfiles/${sFiltedID}`);
        fs.writeFileSync(`myfiles/${sFiltedID}`, sanitizehtml(post.desc), 'utf-8');
        
        response.writeHead(302, {
            Location: `/?id=${sFiltedID}`
        });
        response.end();
    });
});
​
app.get('/delete_process', function (request, response) {
    let sBody = '';
​
    request.on('data', function (data) {
        sBody = sBody + data;
    });
    request.on('end', function () {
        let post = qs.parse(sBody);
        let sFiltedID = path.parse(post.id).base;
​
        fs.unlinkSync(`myfiles/${sFiltedID}`);
​
        response.writeHead(302, {
            Location: `/?id=filelist`
        });
        response.end();
    });
});
​
app.get('/update', function (request, response) {
    let adirContentList = fs.readdirSync('./content');
    let aContentList = myLib.getFileList(adirContentList, 'content');
    let adirmyfilesList = fs.readdirSync('./myfiles');
    let aMyFileList = myLib.getFileList(adirmyfilesList, 'myfiles');
​
    let aList = [
        ...aContentList,
        ...aMyFileList
    ];
​
    const oFile = aList.find(function (elem) {
        if (elem.id === sFiltedID) {
            return elem;
        }
    });
​
    let aTemplateContentList = myLib.templateManager.getTemplateList(aContentList);
    let sDesc = '';
​
    sDesc = fs.readFileSync(oFile.fileFullName, 'utf-8')
    let sTemplateFileEdit = myLib.templateManager.getTemplateFileEdit(oFile.id, sDesc);
    let sTemplate = myLib.templateManager.getTemplateBody(aTemplateContentList, oFile.id, sTemplateFileEdit);
​
    response.writeHead(200);
    response.end(sTemplate);
})
​
app.get('/index.html', function (request, response) {
    let _url = request.url;
    let queryData = request.query;
    let sPath = url.parse(_url, true).pathname;
    let sFiltedID = '';
​
    if (queryData.id) {
        sFiltedID = path.parse(queryData.id).base;
    }
​
    if (!sFiltedID) {
        sFiltedID = 'welcome'
    }
​
    // /* -- SYNC 함수 
    let adirContentList = fs.readdirSync('./content');
    let aContentList = myLib.getFileList(adirContentList, 'content');
    let adirmyfilesList = fs.readdirSync('./myfiles');
    let aMyFileList = myLib.getFileList(adirmyfilesList, 'myfiles');
​
    let aList = [
        ...aContentList,
        ...aMyFileList
    ];
​
    const oFile = aList.find(function (elem) {
        if (elem.id === sFiltedID) {
            return elem;
        }
    });
​
    let aTemplateContentList = myLib.templateManager.getTemplateList(aContentList);
    let sDesc = '';
​
    if (oFile.id === 'filelist') {
        sDesc = sanitizehtml(fs.readFileSync(oFile.fileFullName, 'utf-8'))
        sDesc = sDesc + myLib.templateManager.getTemplateList(aMyFileList);
    } else if (oFile.rootPath === 'myfiles') {
        sDesc = sanitizehtml(fs.readFileSync(oFile.fileFullName, 'utf-8'))
        sDesc = myLib.templateManager.getTemplateFile(sDesc, oFile.id);
    } else {
        sDesc = fs.readFileSync(oFile.fileFullName, 'utf-8')
    }
​
    let sTemplate = myLib.templateManager.getTemplateBody(aTemplateContentList, oFile.id, sDesc);
​
    response.writeHead(200);
    response.end(sTemplate);
});
​
app.get('/', function (request, response) {
    let sPath = '/index.html?'
​
    for (const key in request.query) {
        if (Object.hasOwnProperty.call(request.query, key)) {
            sPath = `${sPath}${key}=${request.query[key]}&`
        }
    }
​
    for (let i = 0; i < request.query.length; i++) {
        const elem = request.query[i];
​
        sPath = `${sPath}${elem}`
​
    }
​
    response.redirect(sPath)
});
​
app.listen(8921, function () {
    console.log('hello world')
})