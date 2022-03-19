/**
 *  Created by pw on 2020/11/7 5:58 下午.
 */
import React, { useState } from 'react';
import './TeambuildinngContentList.less';
import { history } from 'umi';
import Rate from '@/components/Rate';
import Pagination from '@/components/pagination';
import { API } from '@/services/API';
import MakePlan from '@/pages/teambuilding/MakePlan';
import SubmitDialog from '@/components/submitDialog';
import { SearchFormActionType } from '@/pages/teambuilding/types';
import qs from 'query-string';

interface Props {
  dispatch: React.Dispatch<SearchFormActionType>;
  data: API.ListResponsePayload<API.Activity>;
  onPageChange: (page: number) => void;
}

export default function(props: Props) {
  const { data, onPageChange } = props;

  const [submitSuccessOpen, setSubmitSuccessOpen] = useState(false);

  const handleSubmitSuccessOpen = () => setSubmitSuccessOpen(true);

  const handleSubmitSuccessClose = () => setSubmitSuccessOpen(false);

  return (
    <div className="teambuilding-content">
      <div className="content-left">
        <Header dispatch={props.dispatch} />
        <div className="card-list">
          {data?.data?.map(activity => {
            return <Card key={activity.id} card={activity} />;
          })}
        </div>
        <Pagination
          count={data.total_page}
          onPageChange={onPageChange}
          total_count={data.total_count}
        />
      </div>
      <div className="content-right">
        <MakePlan onSuccess={handleSubmitSuccessOpen} />
      </div>
      <SubmitDialog
        close={handleSubmitSuccessClose}
        open={submitSuccessOpen}
      ></SubmitDialog>
    </div>
  );
}

interface HeaderProps {
  dispatch: React.Dispatch<SearchFormActionType>;
}

const Header = (props: HeaderProps) => {
  const { dispatch } = props;
  const searchParams = {
    order: 'sort',
    ...qs.parse(location.search, { parseNumbers: true }),
  };

  const [sortType, setSortType] = useState(searchParams.order);

  const handleSortType = (sortType: string) => {
    setSortType(sortType);
    dispatch({
      type: 'UPDATE',
      payload: {
        order: sortType,
      },
    });
    dispatch({
      type: 'FETCH',
      payload: {},
    });
  };
  return (
    <div className="header">
      <div
        className={`label ${sortType === 'sort' ? 'select-label' : ''}`}
        onClick={() => handleSortType('sort')}
      >
        默认排序
      </div>
      <div className="line" />
      <div
        className={`label ${sortType === 'price' ? 'select-label' : ''}`}
        onClick={() => handleSortType('price')}
      >
        价格
      </div>
    </div>
  );
};

interface CardProps {
  card: API.Activity;
}

const Card = (props: CardProps) => {
  const { card } = props;
  const handleClick = () => {
    history.push({
      pathname: '/teambuilding-teambuilding-detail',
      query: { id: card.id },
    });
  };
  const desc = [
    `${card.method} `,
    ` ${card.duration} `,
    ` ${card.people_number}人`,
  ].join('|');
  return (
    <div className="card-warppper" onClick={handleClick}>
      <div className="card">
        <div className="left">
          <img
            className="img"
            alt="封面"
            src={`${card.cover}?x-oss-process=style/activity_list`}
          />
        </div>
        <div className="right">
          <div className="top">
            <div className="title">{card.name}</div>
            <div className="tag-wrapper">
              {card.profits.map(tag => {
                return (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                );
              })}
            </div>
            <div className="desc">{desc}</div>
            <div className="rate">
              <Rate count={5} value={card.stars} precision={0.5} />
            </div>
          </div>
          <div className="footer">
            <div className="money-wrapper">
              <div className="money">{card.price}</div>
              <div className="unit">元起/人</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
