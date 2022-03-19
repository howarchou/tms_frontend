/**
 *  Created by pw on 2020/11/8 6:42 下午.
 */
import React, { Component } from 'react';
import './WarmTips.less';
import { TeambuildingSubtitle } from '@/pages/teambuilding/teambuilding-detail/DetailContent';

interface Props {
  detail: API.Activity;
}

export default function(props: Props) {
  const { detail } = props;
  return (
    <div className="WarmTips-wrapper">
      <TeambuildingSubtitle title={'温馨提示'} />
      {/*<div*/}
      {/*  className="booking-content"*/}
      {/*  dangerouslySetInnerHTML={{ __html: detail.warm_tips }}*/}
      {/*/>*/}
      {detail?.warm_tips?.map(
        (
          booking: React.ReactNode,
          index: string | number | null | undefined,
        ) => {
          return (
            <div key={index} className="booking-item">
              <div className="item-circle" />
              <div className="desc">{booking}</div>
            </div>
          );
        },
      )}
    </div>
  );
}
