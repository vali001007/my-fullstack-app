// server.js (这才是后端服务该待的地方)

const express = require('express'); // Node.js 认识 require!
const cors = require('cors');
const fs = require('fs'); 

const app = express();
app.use(cors());
// 👇 【核心新增代码】👇
// 告诉服务器：请把当前文件夹（__dirname）当成静态资源目录
// 只要有人访问主页，就自动把里面的 index.html 发给他！
app.use(express.static(__dirname));
// 👆 【核心新增代码】👆
const dataFile = './database.json';

if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ likes: 0 }));
}

app.get('/api/get-likes', function(req, res) {
    const rawData = fs.readFileSync(dataFile);
    const data = JSON.parse(rawData); 

    data.likes = data.likes + 1;
    fs.writeFileSync(dataFile, JSON.stringify(data));

    res.json({
        message: "点赞成功，已写入硬盘！",
        likes: data.likes
    });
});

// 修改前：app.listen(3000, ...
// 修改后：优先读取环境变量中的 PORT，如果没有（比如在本地），再用 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", function() {
    console.log(`🚀 服务器已在端口 ${PORT} 启动`);
});
