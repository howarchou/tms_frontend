/**
 *  Created by pw on 2020/11/8 11:10 下午.
 */
import React from 'react';
import './SubTitleCompomment.less';

interface Props {
  title: string;
}

export default function(props: Props) {
  const { title } = props;
  return (
    <div className="sub-title-wrapper">
      <div className="line" />
      <div className="sub-title">{title}</div>
    </div>
  );
}
