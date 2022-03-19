/**
 *  Created by pw on 2020/11/8 12:25 下午.
 */
import React, { useState } from 'react';
import './Route.less';
import { TeambuildingSubtitle } from './DetailContent';
import BUS_ICON from '@/images/teambuilding/bus.png';
import { ScheduleIF } from '../types';
import moment from 'moment';
import { API } from '@/services/API';

interface Props {
  schedules?: any;
}

export default function(props: Props) {
  const { schedules } = props;
  return (
    <div className="teambuild-route" id="anchor2">
      <TeambuildingSubtitle title={'行程安排'} />
      <div className="content">
        <RouteNavigation days={schedules} />
        <Schedule schedules={schedules} />
      </div>
    </div>
  );
}

interface RouteNavigationProps {
  days: string[];
}

const RouteNavigation = (props: RouteNavigationProps) => {
  const { days = [] } = props;
  const [selectItem, setSelectItem] = useState(0);
  const handleClick = (index: number) => {
    setSelectItem(index);
    if (index) {
      let anchorElement = document.getElementById('D1');
      let anchorElement2 = document.getElementById('D2');
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
      if (anchorElement2) {
        anchorElement2.scrollIntoView();
        anchorElement2.style.paddingTop = '80px';
      }
    }
  };
  if (!days || !days.length) {
    return null;
  }
  return (
    <div className="route-navigation">
      {days.map((_, index) => {
        const cls = selectItem === index ? `navigation-item-select` : '';
        return (
          <span
            key={index}
            className={`navigation-item ${cls}`}
            onClick={() => handleClick(index)}
          >{`D${index + 1}`}</span>
        );
      })}
    </div>
  );
};

interface ScheduleProps {
  schedules: ScheduleIF[];
}

const Schedule = (props: ScheduleProps) => {
  const { schedules = [] } = props;
  if (!schedules || !schedules.length) {
    return null;
  }
  return (
    <div className="schedule-wrapper">
      {schedules.map((schedule, index) => {
        return (
          <div key={schedule.id} className="schedule" id={`D${index + 1}`}>
            <div className="start">
              <div className="left">
                <div className="day-en">{`D${index + 1}`}</div>
                <div className="day-ch">{`第${index + 1}天`}</div>
              </div>
              <div className="middle">
                <div className="start-icon" />
                <div className="line" />
              </div>
              <div className="right">
                <div className="text">指定地点</div>
                <img className="icon" src={schedule.icon} alt="图标" />
                <div className="text">{schedule.title}</div>
              </div>
            </div>
            {schedule.items.map((item, index) => {
              return (
                <div key={index} className="item">
                  <div className="middle">
                    {item.icon ? (
                      <img className="icon" src={item.icon} alt="图标" />
                    ) : null}
                    <div className="line" />
                  </div>
                  <div className="right">
                    <div className="title">{`${item.time} ${item.title}`}</div>
                    <div className="card">
                      <div className="sub-title">{item.desc}</div>
                      <ScheduleImages pictures={item.pictures} />
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
};

interface ScheduleImagesProps {
  pictures?: string[];
}

function ScheduleImages(props: ScheduleImagesProps) {
  const { pictures = [] } = props;
  if (!pictures.length) {
    return null;
  }
  const length = 2;
  const data = [];
  let jIndex = 1;
  for (let index = 0; index < pictures.length; index = jIndex) {
    data.push(pictures.slice(index, index + length));
    jIndex = jIndex * length;
  }
  return (
    <div className="img-wrapper">
      {data.map((items, id) => {
        return (
          <div key={id} className="row">
            {items.map((img, index) => {
              return (
                <div className="row-img">
                  <img
                    key={index}
                    alt={`图片`}
                    className="img"
                    src={`${img}?x-oss-process=style/activity_schedule`}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
