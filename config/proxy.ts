/**
 *  Created by pw on 2020/11/23 6:31 下午.
 */

export default {
  dev: {
    '/h5/': {
      target: 'http://test.cicisoft.cn:8080',
      // changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/pre/': {
      target: 'http://test.cicisoft.cn:8080',
      // changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
} as any;
