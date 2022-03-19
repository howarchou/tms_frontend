/**
 *  Created by pw on 2020/9/26 5:50 下午.
 */
import React from 'react';
import './HomeSectionTitle.less';

interface Props {
  title: string;
  desc?: string;
}

export default function(props: Props) {
  const { title, desc } = props;
  return (
    <div className="home-section-header">
      <div className="home-section-title">{title}</div>
      {desc ? <div className="home-section-desc">{desc}</div> : null}
    </div>
  );
}
