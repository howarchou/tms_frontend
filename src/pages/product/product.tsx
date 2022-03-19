import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'umi';
import './product.less';
import { debounce } from '@material-ui/core';
import { AppContext } from '@/pages/layout';
import { AppActionType } from '@/reducer/appReducer';

const Product: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const params = useParams<{ type: string }>();

  const count = ({
    1: 6,
    2: 20,
    3: 40,
    4: 20,
    5: 15,
    6: 10,
    7: 15,
    8: 15,
    9: 6,
    10: 12,
    11: 8,
  } as any)[params?.type];

  const imgList = useRef<HTMLDivElement[]>();
  const func = useRef<any>();

  const createButtons = (el: HTMLDivElement) => {
    if (!el) return;
    const a = document.createElement('a');
    a.href = '/teambuilding';
    a.className = 'lazy-button';
    el.appendChild(a);
    const b = document.createElement('a');
    b.href = 'javascript:void 0';
    b.className = 'lazy-button';
    b.addEventListener(
      'click',
      () => {
        dispatch({
          type: AppActionType.OpenSign,
          payload: {
            showSign: true,
          },
        });
      },
      false,
    );
    el.appendChild(b);
  };

  const lazyFunc = () => {
    if (!imgList.current) {
      imgList.current = Array.from(document.querySelectorAll('.lazy-loading'));
    }
    const lazyList = imgList.current;
    const len = lazyList.length;
    let n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历

    return function() {
      let seeHeight = document.documentElement.clientHeight;
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      for (let i = n; i < len; i++) {
        const lazy = lazyList[i] as HTMLImageElement;
        if (lazy.offsetTop < seeHeight + scrollTop) {
          if (lazy.hasAttribute('data-lazy')) {
            const inx = lazy.getAttribute('data-lazy');
            lazy.classList.add('lazy-loaded');
            const img = document.createElement('img');
            const no = ('00' + inx).slice(-2);
            const type = parseInt(params.type, 10);
            const origin = type === 5 || type >= 11 ? '.png' : '.jpg';
            img.src = `https://tms-img.oss-cn-zhangjiakou.aliyuncs.com/products/${params.type}/${params.type}_${no}${origin}?r`;
            lazy.appendChild(img);
            setTimeout(() => {
              lazy.removeAttribute('data-lazy');
            }, 20);
          }
          n = n + 1;
        }
      }

      if (n >= len) {
        createButtons(lazyList[len - 1]);
        func.current && window.removeEventListener('scroll', func.current);
      }
    };
  };

  useEffect(() => {
    const scrollHandle = debounce(lazyFunc(), 300);
    func.current = scrollHandle;
    scrollHandle();

    window.addEventListener('scroll', scrollHandle);
    return () => {
      window.removeEventListener('scroll', scrollHandle);
    };
  }, []);

  if (!count) return null;
  return (
    <div className="product-list">
      <div className={`product-imgs product-type${params.type}`}>
        {Array(count)
          .fill(0)
          .map((i, num: number) => {
            return (
              <div key={num} className="lazy-loading" data-lazy={num + 1}></div>
            );
          })}
      </div>
    </div>
  );
};

export default Product;
