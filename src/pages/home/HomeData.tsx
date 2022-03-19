/**
 *  Created by pw on 2020/9/26 7:12 下午.
 */
import React from 'react';
import './HomeData.less';
import STATISTICAL_PNG from '../../images/home/statistical.svg';
import VIEW_PNG from '../../images/home/view.svg';
import GRAND_PNG from '../../images/home/grand.svg';
import NUMBER_PNG from '../../images/home/number.svg';

export default function() {
  const data = [
    {
      id: '1',
      imageUrl: STATISTICAL_PNG,
      title: '200+',
      explain: '累计线上团建产品',
    },
    { id: '2', imageUrl: VIEW_PNG, title: '200+', explain: '累计团建玩法' },
    { id: '3', imageUrl: GRAND_PNG, title: '200+', explain: '累计服务企业' },
    { id: '4', imageUrl: NUMBER_PNG, title: '65000+', explain: '累计服务人次' },
  ];

  return (
    <div className="home-data-wrapper">
      {data.map(item => {
        return (
          <div key={item.id} className="home-data-card">
            <div className="top">
              <img className="img" src={item.imageUrl} />
              <div className="title">{item.title}</div>
            </div>
            <div className="explain">{item.explain}</div>
          </div>
        );
      })}
    </div>
  );
}
