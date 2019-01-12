import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../components/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    /**
     * 监控预警
     */
    {
        path: '/monitor',
        component: Layout,
        alias: [ '/' ],
        redirect: '/monitor/carts',
        name: 'monitor',
        hidden: false,
        // roles: [ 'repaier' ],
        meta: { title: '监控预警', icon: 'monitor' },
        children: [{
            path: 'carts',
            alias: [ '/' ],
            component: () => import('@/views/monitor/carts'),
            name: 'monitor-carts',
            meta: { title: '车行监控', icon: 'carts', noCache: true, /** noCache 如果设置为true，则不会被 <keep-alive> 缓存(默认 false) */ }
        }, {
            path: 'subcompany',
            name: 'monitor-subsidiary-company',
            component: () => import('@/views/monitor/sub-company'),
            meta: { title: '支公司监控', icon: 'subcompany', noCache: true }
        }, {
            path: 'team',
            name: 'monitor-team',
            component: () => import('@/views/monitor/team'),
            meta: { title: '团队监控', icon: 'team', noCache: true }
        }],
    },

    /**
     * 统计分析
     */
    {
        path: '/analyze',
        redirect: '/analyze/index',
        component: Layout,
        name: 'analyze',
        hidden: false,
        meta: { title: '统计分析', icon: 'order' },
        children: [{
            path: 'index',
            component: () => import('@/views/analyze/index'),
            meta: { title: '统计分析', icon: 'analyze', noCache: true, hidden: true, }
        }],
    },

    /**
     * 清单明细
     */
    {
        path: '/detailedlist',
        redirect: '/detailedlist/comparison',
        component: Layout,
        name: 'detailedlist',
        hidden: false,
        meta: { title: '清单明细', icon: 'detailedlist' },
        children: [{
            path: 'comparison',
            name: 'comparison',
            component: () => import('@/views/price-list/comparison'),
            meta: { title: '产保比明细', icon: 'comparison', noCache: true }
        }, {
            path: 'premium',
            name: 'premium',
            component: () => import('@/views/price-list/premium'),
            meta: { title: '保费明细', icon: 'premium', noCache: true }
        }, {
            path: 'loss',
            name: 'loss',
            component: () => import('@/views/price-list/loss'),
            meta: { title: '定损明细', icon: 'loss', noCache: true }
        }],
    },

    /**
     * 车商管理
     */
    {
        path: '/shops',
        redirect: '/shops/carts',
        component: Layout,
        name: 'shops',
        hidden: false,
        meta: { title: '车商管理', icon: 'shops' },
        children: [{
            path: 'carts',
            name: 'carts',
            component: () => import('@/views/shops/carts'),
            meta: { title: '车行管理', icon: 'regionsite', noCache: false }
        }, {
            path: 'subcompany',
            name: 'subsidiary-company-manage',
            component: () => import('@/views/shops/sub-company'),
            meta: { title: '支公司管理', icon: 'subcompany', noCache: false }
        }, {
            path: 'team',
            name: 'team-manage',
            component: () => import('@/views/shops/team'),
            meta: { title: '团队管理', icon: 'team', noCache: false }
        }],
    }, {
        path: '/shops/carts',
        component: Layout,
        name: 'shops-carts',
        hidden: true,
        meta: { title: '车商管理', icon: 'shops' },
        children: [{
            path: 'details',
            name: 'carts-edit',
            component: () => import('@/views/shops/carts-edit'),
            meta: { title: '新增/编辑车行', icon: 'regionsite', noCache: false }
        }],
    }, {
        path: '/shops/subcompany',
        component: Layout,
        name: 'shops-subsidiary-company',
        hidden: true,
        meta: { title: '车商管理', icon: 'shops' },
        children: [{
            path: 'details',
            name: 'subsidiary-company-edit',
            component: () => import('@/views/shops/sub-company-edit'),
            meta: { title: '新增/编辑支公司', icon: 'subcompany', noCache: false }
        }],
    }, {
        path: '/shops/team',
        component: Layout,
        name: 'shops-team',
        hidden: true,
        meta: { title: '车商管理', icon: 'shops' },
        children: [{
            path: 'details',
            name: 'team-edit',
            component: () => import('@/views/shops/team-edit'),
            meta: { title: '新增/编辑团队', icon: 'team', noCache: false }
        }],
    },

    /**
     * 预测设置
     */
    {
        path: '/predict',
        redirect: '/predict/subcompany',
        component: Layout,
        name: 'predict',
        hidden: false,
        meta: { title: '预测设置', icon: 'predict' },
        children: [{
            path: 'subcompany',
            name: 'predict-sub-company',
            component: () => import('@/views/predict/sub-company'),
            meta: { title: '支公司数据设置', icon: 'subcompany', noCache: true }
        }, {
            path: 'team',
            name: 'predict-team',
            component: () => import('@/views/predict/team'),
            meta: { title: '团队数据设置', icon: 'team', noCache: true }
        }],
    },

    /**
     * 预警日志
     */
    {
        path: '/consolelog',
        redirect: '/consolelog/index',
        component: Layout,
        name: 'consolelog',
        hidden: false,
        meta: { title: '预警日志', icon: 'consolelog' },
        children: [{
            path: 'index',
            component: () => import('@/views/consolelog/index'),
            meta: { title: '预警日志', icon: 'consolelog', noCache: true, hidden: true, }
        }],
    },

    /**
     * 系统设置
     */
    {
        path: '/system',
        redirect: '/system/user',
        component: Layout,
        name: 'system',
        hidden: false,
        meta: { title: '系统设置', icon: 'system' },
        children: [{
            path: 'user',
            name: 'user',
            component: () => import('@/views/system/user'),
            meta: { title: '用户设置', icon: 'systemuser', noCache: true, hidden: true, }
        }, {
            path: 'roles',
            name: 'roles',
            component: () => import('@/views/system/roles'),
            meta: { title: '角色设置', icon: 'roles', noCache: true }
        }, {
            path: 'rule',
            name: 'rule',
            component: () => import('@/views/system/rule'),
            meta: { title: ' 预警规则设置', icon: 'rule', noCache: true }
        }],
    },

    // 当过滤失败的情况下, 直接跳转到 404 页面
    { path: '*', redirect: '/404', hidden: true },
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }), // 每次加载的时候, 页面跳转到顶部
    routes: constantRouterMap
});
