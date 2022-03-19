/**
 *  Created by pw on 2020/9/26 6:39 下午.
 */
import React from 'react';
import './Advantage.less';
import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import TEAM_IMAGE from '../../images/home/team.svg';
import PLAN_IMAGE from '../../images/home/plan.svg';
import SERVICE_IMAGE from '../../images/home/service.svg';

export default function() {
  const cards = [
    {
      id: '1',
      title: '专业团队',
      imageUrl: TEAM_IMAGE,
      desc: '互联网+团建策划团队，连接人才与发展，激发团队活力，助力成长 ',
    },
    {
      id: '2',
      title: '定制方案',
      imageUrl: PLAN_IMAGE,
      desc: '个性化团建定制服务， 量身定制，满足多元化团建需求，做您的活动管家',
    },
    {
      id: '3',
      title: '贴心服务',
      imageUrl: SERVICE_IMAGE,
      desc: '线上标准化流程+线下个性化执行，深度整合及时沟通，扫除后顾之忧',
    },
  ];
  return (
    <div className="advantage-wrapper">
      <HomeSectionTitle title={'我们的优势'} />
      <div className="advantage-card-wrapper">
        {cards.map(card => {
          return (
            <div key={card.id} className="advantage-card">
              <img className="image" alt={'图片'} src={card.imageUrl} />
              <div className="title">{card.title}</div>
              <div className="desc">{card.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
