/**
 *  Created by pw on 2020/11/9 10:49 下午.
 */
import React, { useState, useEffect } from 'react';
import './index.less';
import Shuffing from '@/components/shuffling';
import SubTitleCompomment from '@/components/header/SubTitleCompomment';
import { getCaseById } from '@/services';
import moment from 'moment';
import { history } from '@@/core/history';
import Place_ICON from '@/images/case/place.png';
import Mileage_ICON from '@/images/case/mileage.png';
import Day_ICON from '@/images/case/day.png';
import Personnel_ICON from '@/images/case/personnel.png';
import { API } from '@/services/API';

interface Props {
  location?: any;
}

export default function(props: Props) {
  const { location } = props;
  const id = location?.query?.id;
  const [detail, setDetail] = useState<API.Case_Detail>({} as API.Case_Detail);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const caseData = await getCaseById(id);
    setDetail(caseData);
  };

  const banners = detail?.banners?.map(banner => {
    return { cover: banner, link: '', name: '', type: 'image' };
  });

  return (
    <div className="case-detail-wrapper">
      <Shuffing
        banners={banners as API.Home_Banner[]}
        className="shuffing-wrapper"
      />
      <div className="content-wrapper">
        <div className="case-detail-header">
          {detail?.logo ? <img alt="logo" className="logo" src={detail?.logo} /> : null}
          <div className="title-wrapper">
            <div className="title">
              {detail?.company} | {detail?.name}
            </div>
            <div className="desc">{`团建案例${moment(detail?.date).format(
              'YYYY-MM-DD',
            )} 浏览 ${detail?.views || 1}`}</div>
          </div>
        </div>
        <div className="content">
          <div className="left">
            {detail?.photos?.map((img, index) => {
              return (
                <img
                  key={index}
                  alt={`照片`}
                  className="img"
                  src={`${img}?x-oss-process=style/case_detail`}
                />
              );
            })}
          </div>
          <div className="right">
            <div className="row-wrapper">
              <SubTitleCompomment title="活动概述" />
              <div className="row">
                <div className="left">
                  <div className="item">
                    <img alt="icon" className="img" src={Personnel_ICON} />
                    <div className="label">{`人数：${detail?.people}人`}</div>
                  </div>
                  <div className="item">
                    <img alt="icon" className="img" src={Mileage_ICON} />
                    <div className="label">{`车程：${detail?.distance}`}</div>
                  </div>
                </div>
                <div className="left">
                  <div className="item">
                    <img alt="icon" className="img" src={Day_ICON} />
                    <div className="label">{`天数：${detail?.days}`}</div>
                  </div>
                  <div className="item">
                    <img alt="icon" className="img" src={Place_ICON} />
                    <div className="label">{`地点：${detail?.address}`}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-wrapper">
              <SubTitleCompomment title="案例行程" />
              <CaseTrip days={detail?.schedule} />
            </div>
            {detail?.activity?.name ? (
              <div className="row-wrapper">
                <SubTitleCompomment title="相关产品" />
                <RelatedProducts activity={detail.activity} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CaseTripProps {
  days: API.Schedule[];
}

interface CaseTripDayIF {
  day: number;
  items: CaseTripDayItem[];
}

interface CaseTripDayItem {
  time: string;
  content: string;
}

const CaseTrip = (props: CaseTripProps) => {
  const { days = [] } = props;
  if (!days || !days.length) {
    return null;
  }
  return (
    <div className="case-trip-wrapper">
      {days.map((day, index) => {
        return (
          <div key={index} className="day-wrapper">
            <div className="top">{`D${index + 1}`}</div>
            {day.items.map((item, index) => {
              return (
                <div key={index} className="item">
                  <div className="base-label">
                    {moment(item.time).format('HH:mm')}
                  </div>
                  <div className="middle">
                    <div className="top-line" />
                    <div className="circle" />
                    <div className="bottom-line" />
                  </div>
                  <div className="base-label right-label">{item.text}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

interface ProductProps {
  activity: API.Activity;
}

const RelatedProducts = (props: ProductProps) => {
  const { activity = {} as API.Activity } = props;

  const handleClick = () => {
    history.push({
      pathname: '/teambuilding-teambuilding-detail',
      query: { id: activity.id },
    });
  };

  return (
    <div className="related-product">
      <img alt="icon" className="img" src={activity.cover} />
      <div className="title">{activity.name}</div>
      <div className="desc-wrapper">
        <div className="label">{`${activity.duration} | ${activity.people_number}人`}</div>
        <div className="price-wrapper">
          <div className="price">{activity.price}</div>
          <div className="unit">元起/人</div>
        </div>
      </div>
      <div className="action" onClick={handleClick}>
        去看看
      </div>
    </div>
  );
};
