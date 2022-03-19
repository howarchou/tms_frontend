/**
 *  Created by pw on 2020/9/26 5:47 下午.
 */
import React from 'react';
import './HotRecommend.less';
import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import { HotImageCardIF } from '@/types';
import { API } from '@/services/API';
import { useHistory } from 'umi';
// import { history } from '@@/core/history';

const GROUPING_COUNT = 3;

interface Props {
  data: API.Home_HotPots[];
}

export default function(props: Props) {
  const { data } = props;

  return (
    <div className="hot-recommend">
      <HomeSectionTitle title={'当季热门目的地'} />
      <HotImageCard data={data} />
    </div>
  );
}

function HotImageCard(props: Props) {
  const { data = [] } = props;

  const groups = data.reduce<API.Home_HotPots[][]>((result, current, index) => {
    const remainder = Math.floor(index / GROUPING_COUNT);
    const list = result[remainder] || [];
    list.push(current);
    result[remainder] = list;
    return result;
  }, []);

  return (
    <div className="hot-image-wrapper">
      {groups.map((group, key) => {
        return (
          <div key={key} className="hot-image-group">
            {group.map((card, index) => {
              return <ImageCard key={index} imageCard={card} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

interface ImageCardProps {
  imageCard: API.Home_HotPots;
}

function ImageCard(props: ImageCardProps) {
  const { imageCard } = props;
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: '/teambuilding',
      search: `area=${imageCard.area}`,
    });
  };
  return (
    <div className="image-card" onClick={() => handleClick()}>
      <img className="image" src={imageCard.cover} alt={'当季热门'} />
      <div className="tag-wrapper">
        <div className="main-tag">{imageCard.name}</div>
        <div className="vertical">|</div>
        {imageCard.keywords?.length
          ? imageCard.keywords.map((tag, index) => {
              return (
                <div key={index} className="assist-tag-wrapper">
                  <div className="assist-tag">{tag}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
