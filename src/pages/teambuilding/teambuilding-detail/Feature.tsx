/**
 *  Created by pw on 2020/11/8 11:45 上午.
 */
import React, { Component } from 'react';
import { TeambuildingSubtitle } from './DetailContent';
import './Feature.less';
import { API } from '@/services/API';

interface Props {
  feature: API.Feature;
  place?: API.Place;
}

export default function(props: Props) {
  const { feature, place } = props;
  const showTheme = feature?.picture || feature?.desc;
  return (
    <div className="teambuilding-feature" id="anchor1">
      <TeambuildingSubtitle title={'团建特色'} />
      {showTheme ? (
        <div className="theme">
          <div className="title">团建主题</div>
          {feature?.picture ? (
            <img alt="desc" className="img" src={feature.picture} alt={'团建特色图片'} />
          ) : null}
          {feature?.description ? (
            <div className="theme-desc">{feature.description}</div>
          ) : null}
        </div>
      ) : null}
      {place ? (
        <div key={'place'} className="place">
          <div className="title">团建场地</div>
          <div className="img-wrapper">
            {place.pictures?.map(picture => {
              return (
                <div className="img-div">
                  <img
                    className="img"
                    src={`${picture}?x-oss-process=style/activity_place`}
                    alt={`场地`}
                  />
                </div>
              );
            })}
          </div>
          <div className="place-dec">
            <div className="dec">{place.description}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
