/**
 *  Created by pw on 2020/9/20 5:15 下午.
 */
import React, { useState, useEffect, useRef } from 'react';
import './index.less';
// @ts-ignore
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

interface Props {
  className?: string;
  banners: API.Home_Banner[];
}

export default function(props: Props) {
  const { className = '', banners = [] } = props;
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  const [sliderTran, setSliderTran] = useState<any>();
  const sliderRef = useRef<any>();
  const currentIndex = useRef<number>(0);

  let sliderWidth = 1920;

  useEffect(() => {
    const hasImage = !!banners.filter(banner => (banner.type = 'image')).length;
    if (hasImage) {
      // play();
      const $wrapper = sliderRef.current;
      const children = $wrapper.children;
      const firstChild = children[0];
      sliderWidth = firstChild.offsetWidth;
      $wrapper.appendChild(firstChild.cloneNode(true));

      [...children].forEach(el => {
        el.style.width = sliderWidth + 'px';
      });
      play();
    }
    return () => {
      clearInterval(timerId as any);
    };
  }, [banners]);

  const handlePrev = () => {
    // if (currentIndex === banners.length - 1) {
    //   currentIndex = 0;
    // } else {
    //   currentIndex++;
    // }

    if (currentIndex.current <= 0) {
      if (currentIndex.current == 0) {
        currentIndex.current = -banners.length;
      }

      setSliderTran({
        transform: `translate3d(${++currentIndex.current *
          sliderWidth}px, 0px, 0px)`,
      });
    }
  };

  const handleNext = () => {
    // if (currentIndex === 0) {
    //   currentIndex = banners.length - 1;
    // } else {
    //   currentIndex--;
    // }

    if (currentIndex.current > -banners.length) {
      setSliderTran({
        transform: `translate3d(${--currentIndex.current *
          sliderWidth}px, 0px, 0px)`,
      });
    }

    if (currentIndex.current === -banners.length) {
      currentIndex.current = 0;
      setSliderTran({
        transform: `translate3d(0px, 0px, 0px)`,
      });
    }
  };

  // 当鼠标停留在图片上时
  const mouseHoverImg = () => {
    clearInterval(timerId as any);
  };
  const mouseLeaveImg = () => {
    play();
  };

  const play = () => {
    if (timerId) {
      clearInterval(timerId);
    }
    const ts: NodeJS.Timeout = setInterval(() => {
      handleNext();
    }, 2000);

    setTimerId(ts);
  };

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className={`wrap ${className}`}>
      <div className="slider">
        <ul className="list" style={sliderTran} ref={sliderRef}>
          {banners.map((item, i) => (
            <li
              key={i}
              className="item"
              onMouseOver={mouseHoverImg}
              onMouseLeave={mouseLeaveImg}
            >
              {/*{item.type === 'video' ? (*/}
              {/*  <VideoBanner banner={item} />*/}
              {/*) : (*/}
              <img src={item.cover} alt="" />
              {/*)}*/}
            </li>
          ))}
        </ul>
      </div>
      {banners.length > 1 ? (
        <button
          className="btn left"
          onClick={handlePrev}
          onMouseOver={mouseHoverImg}
          onMouseLeave={mouseLeaveImg}
        >
          &lt;
        </button>
      ) : null}
      {banners.length > 1 ? (
        <button
          className="btn rigth"
          onClick={handleNext}
          onMouseOver={mouseHoverImg}
          onMouseLeave={mouseLeaveImg}
        >
          &gt;
        </button>
      ) : null}
    </div>
  );
}

interface HomeBannerVideoProps {
  banner: API.Home_Banner;
}

export function VideoBanner(props: HomeBannerVideoProps) {
  const { banner } = props;
  return (
    <div className="home-banner-video">
      <Video
        fluid={false}
        autoPlay
        loop
        muted
        controls={['PlayPause', 'Volume']}
        poster={banner.cover}
      >
        <source src={banner.link} />
      </Video>
    </div>
  );
}
