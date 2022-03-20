/**
 *  Created by pw on 2020/11/14 4:28 下午.
 */
import { defineConfig } from 'umi';
import proxyConfig from './proxy';

const { environment } = process.env;

export default defineConfig({
  title: '鱼悦团建',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/layout/index',
      routes: [
        { path: '/', component: '@/pages/home/index' },
        {
          path: '/teambuilding',
          component: '@/pages/teambuilding/index',
          extra: true,
        },
        {
          path: '/teambuilding-teambuilding-detail',
          component: '@/pages/teambuilding/teambuilding-detail/index',
        },
        {
          path: '/partner',
          component: '@/pages/partners/index',
        },
        {
          path: '/about',
          component: '@/pages/about/index',
        },
        {
          path: '/case',
          component: '@/pages/case/index',
        },
        {
          path: '/case-detail',
          component: '@/pages/case/detail/index',
        },
        {
          path: '/product/:type',
          component: '@/pages/product/product',
        },
      ],
    },
  ],
  devServer: {
    port: 80,
    host: 'test.cicisoft.cn',
  },
  proxy: proxyConfig[environment || 'dev'],
  define: {
    'process.env.environment': 'dev',
    'process.env.baseUrl': 'http://api.yuyuetuanjian.cn',
  },
  hash: false,

  ssr: {
    // forceInitial: false,
    // removeWindowInitialProps: false
    // devServerRender: true,
    // mode: 'string',
     mode: 'stream',

    // staticMarkup: false,
  },

});
