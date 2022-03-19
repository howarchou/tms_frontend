/**
 *  Created by pw on 2020/9/20 6:41 下午.
 */
import React from 'react';
import './HomeCard.less';
import { history } from '@@/core/history';
import Cookies from 'js-cookie';
import { __MENU_ } from '@/lib/Conts';
import { API } from '@/services/API';
const GROUPING_COUNT = 4;

interface Props {
  cards: API.Activity[];
}

export default function(props: Props) {
  const { cards = [] } = props;
  const groups = cards.reduce<API.Activity[][]>((result, current, index) => {
    const remainder = Math.floor(index / GROUPING_COUNT);
    const list = result[remainder] || [];
    list.push(current);
    result[remainder] = list;
    return result;
  }, []);

  const handleClick = (card: API.Activity) => {
    history.push({
      pathname: '/teambuilding-teambuilding-detail',
      query: { id: card.id },
    });
  };

  return (
    <div className="home-card-wrapper">
      {groups.map((group, key) => {
        return (
          <div key={key} className="card-group">
            {group.map(card => {
              if (card.type === 'more') {
                return <HomeMoreCard key={card.id} {...(card as any)} />;
              }
              return (
                <div key={card.id} className="card-wrapper">
                  <img
                    className="img"
                    alt={'图片'}
                    src={`${card.cover}?x-oss-process=style/top_activity`}
                    onClick={() => handleClick(card)}
                  />
                  <div className="card-content">
                    <div className="card-title">{card.name}</div>
                    <div className="tag-wrapper">
                      {card.profits.map(tag => {
                        return (
                          <div key={tag} className="tag">
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                    <div className="card-desc">
                      <div className="desc">
                        {card.duration} | {card.people_number}人
                      </div>
                      <div className="price-wrapper">
                        <div className="price">{`￥${card.price}`}</div>
                        <div className="price-desc">元起/人</div>
                      </div>
                    </div>
                    <div
                      className="card-action"
                      onClick={() => handleClick(card)}
                    >
                      去看看
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

interface HomeMoreCardProps {
  more_link: string;
  type_icon: string;
  type_icon_large: string;
  type_icon_select: string;
  type_id: string;
  type_name: string;
}

export const HomeMoreCard = (props: HomeMoreCardProps) => {
  const handleOnClick = () => {
    Cookies.set(__MENU_, {
      id: 'teambuilding',
      label: '团建',
      href: '/teambuilding',
    });
    history.push({
      pathname: '/teambuilding',
      query: { type: props.type_id },
    });
  };
  return (
    <div className="home-more-card-wrapper">
      <div className="top">
        <img className="img" alt={'图标'} src={props?.type_icon_large} />
        <div className="text">{props?.type_name}</div>
      </div>
      <div className="more-button" onClick={handleOnClick}>
        {'查看更多'}
      </div>
    </div>
  );
};
