/**
 *  Created by pw on 2020/9/26 8:09 下午.
 */
import React from 'react';
import './Partners.less';
import { PartnersIF } from '@/types';

const GROUPING_COUNT = 6;

interface Props {
  logos?: API.Home_Logos[];
}

export default function(props: Props) {
  const { logos = [] } = props;

  const groups = logos.reduce<PartnersIF[][]>((result, current, index) => {
    const remainder = Math.floor(index / GROUPING_COUNT);
    const list = result[remainder] || [];
    list.push(current);
    result[remainder] = list;
    return result;
  }, []);

  const handleClick = (logo: PartnersIF) => {
    // const w: any = window.open('about:blank');
    // w.location.href = logo.link;
  };

  return (
    <div className="partners-wrapper">
      <div className="title">合作伙伴</div>
      {groups.map((group, index) => {
        return (
          <div key={index} className="partner-group">
            {group.map((logo, index) => {
              return (
                <div
                  key={index}
                  className="partners-logo"
                  onClick={() => handleClick(logo)}
                >
                  <img className="logo-img" src={logo.cover} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
