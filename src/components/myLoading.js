/**
 * 加载框（防止重复点击）
 */
let myLoading = {
    /**
     * 显示加载框
     */
    show: function show() {
        let Loading = document.getElementById('el-loading-mask');
        // 判断加载框是否不存在
        if (!Loading) {
            // 不存在的情况下才创建
            Loading = document.createElement('div');
            Loading.id = 'el-loading-mask';
            Loading.classList.add("el-loading-mask");
            Loading.classList.add("is-fullscreen");
            Loading.setAttribute('style', 'z-index: 2000; background: rgba(0, 0, 0, 0.16);');
            Loading.innerHTML = '<div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div>';
            document.body.classList.add('el-loading-parent--relative');
            document.body.appendChild(Loading);
        }
    },

    /**
     * 关闭加载框
     */
    close: function close() {
        let Loading = document.getElementById('el-loading-mask');
        // 判断加载框是否存在
        if (Loading) {
            // 存在的情况下才进行删除
            document.body.classList.remove('el-loading-parent--relative');
            document.body.removeChild(Loading);
        }
    },
}

export default myLoading;
