/**
 *  Created by pw on 2020/11/8 11:03 上午.
 */
import React, { useState } from 'react';
import './DetailContent.less';
import Tab from '@/pages/teambuilding/teambuilding-detail/tab';
import MakePlan from '@/pages/teambuilding/MakePlan';
import Feature from '@/pages/teambuilding/teambuilding-detail/Feature';
import Route from '@/pages/teambuilding/teambuilding-detail/Route';
import CostInstructions from '@/pages/teambuilding/teambuilding-detail/CostInstructions';
import Bookings from '@/pages/teambuilding/teambuilding-detail/Bookings';
import SafetyNotes from '@/pages/teambuilding/teambuilding-detail/SafetyNotes';
import WarmTips from '@/pages/teambuilding/teambuilding-detail/WarmTips';
import Rate from '@/components/Rate';
import { API } from '@/services/API';
import SubmitDialog from '@/components/submitDialog';

const tabs = [
  { id: 'anchor1', label: '团建特色', type: 'feature' },
  { id: 'anchor2', label: '行程安排', type: 'route' },
  { id: 'anchor3', label: '费用说明', type: 'cost' },
  { id: 'anchor4', label: '预定须知', type: 'notice' },
];

interface Props {
  detail: API.Activity;
}

export default function(props: Props) {
  const { detail } = props;
  const [submitSuccessOpen, setSubmitSuccessOpen] = useState(false);
  const handleSubmitSuccessClose = () => setSubmitSuccessOpen(false);

  const handleSubmitSuccessOpen = () => setSubmitSuccessOpen(true);
  return (
    <div className="detail-content-wrapper">
      <div className="detail-content-wrapper-left">
        <Tab tabs={tabs} />
        <PlannerIntroduce detail={detail} />
        <Feature feature={detail.feature} place={detail.place} />
        <Route schedules={detail.schedule} />
        <CostInstructions cost_statement={detail.cost_statement} />
        <WarmTips detail={detail} />
        <Bookings detail={detail} />
        <div>{detail ? <SafetyNotes detail={detail} /> : null}</div>
      </div>
      <div className="detail-content-wrapper-right">
        <MakePlan onSuccess={handleSubmitSuccessOpen} />
      </div>
      <SubmitDialog
        close={handleSubmitSuccessClose}
        open={submitSuccessOpen}
      ></SubmitDialog>
    </div>
  );
}

const PlannerIntroduce = (props: Props) => {
  const { detail } = props;
  return (
    <div className="planner-introduce">
      <div className="left">
        <img alt="icon" className="img" src={detail?.avatar} />
        <div className="name">{detail?.planner}</div>
        <div className="position">团建策划师</div>
      </div>
      <div className="right">
        <div className="desc">{detail?.description}</div>
        <div className="rateBox">
          {detail?.detail_stars.map(star => {
            return (
              <div className="rateList">
                <div className="title">{star.text}</div>
                <div className="rate">
                  <Rate count={5} value={star.value} precision={0.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface TeambuildingSubtitleProps {
  title: string;
}

export const TeambuildingSubtitle = (props: TeambuildingSubtitleProps) => {
  const { title } = props;
  return (
    <div className="teambuild-sub-title">
      <div className="line" />
      <div className="sub-title">{title}</div>
    </div>
  );
};
