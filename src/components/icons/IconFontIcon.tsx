/**
 *  Created by pw on 2020/11/14 4:39 下午.
 */
import React from 'react';
import './IconFontIcon.less';

interface Props {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function(props: Props) {
  let { name, className = '', style = {}, onClick } = props;
  let handleOnClick = () => {
    onClick && onClick();
  };
  return (
    <svg
      name={name}
      className={`icon ${className}`}
      style={style}
      aria-hidden="true"
      onClick={handleOnClick}
    >
      <use name={name} xlinkHref={name} />
    </svg>
  );
}
