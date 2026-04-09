// script.js (这才是前端该有的样子)

// --- 1. 夜间模式逻辑 ---
const toggleBtn = document.getElementById('theme-toggle-btn');
toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = '切换日间模式 ☀️';
    } else {
        toggleBtn.textContent = '切换夜间模式 🌙';
    }
});

// --- 2. 点赞交互逻辑 ---
const likeBtn = document.getElementById('like-btn');
const likeCountDisplay = document.getElementById('like-count');

likeBtn.addEventListener('click', function() {
    // 前端只负责派 fetch 去要数据，不负责写文件
    fetch('api/get-likes')
        .then(function(response) {
            return response.json(); 
        })
        .then(function(data) {
            likeCountDisplay.textContent = data.likes;
        })
        .catch(function(error) {
            alert('请求失败！请检查终端里的 Node.js 服务器是否启动了。');
        });
});
