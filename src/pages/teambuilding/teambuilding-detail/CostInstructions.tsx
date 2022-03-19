/**
 *  Created by pw on 2020/11/8 6:11 下午.
 */
import React from 'react';
import './CostInstructions.less';
import { TeambuildingSubtitle } from '@/pages/teambuilding/teambuilding-detail/DetailContent';
import { Cost } from '@/pages/teambuilding/types';
import { API } from '@/services/API';

interface Props {
  cost_statement: API.Cost_Statement;
}

export default function(props: Props) {
  const { cost_statement } = props;
  const costs = cost_statement.include;
  const notCost = cost_statement.exclusive;
  return (
    <div className="cost-instructions" id="anchor3">
      <TeambuildingSubtitle title={'费用说明'} />
      <div className="cost-list">
        <CostContent costs={costs} />
        <NotCostContent costs={notCost} />
      </div>
    </div>
  );
}

interface CostContentProps {
  costs: Cost[];
}

interface NotCostContentProps {
  costs: string[];
}

const CostContent = (props: CostContentProps) => {
  const { costs } = props;
  return (
    <div className="content">
      <div className="title">{'费用包含'}</div>
      {costs.map((cost, index) => {
        return (
          <div key={index} className="item">
            <div className="item-title">{`${cost.name}：`}</div>
            <div className="desc">{cost.intro}</div>
          </div>
        );
      })}
    </div>
  );
};

const NotCostContent = (props: NotCostContentProps) => {
  const { costs } = props;
  return (
    <div className="content">
      <div className="title">{'费用不包含'}</div>
      {costs.map((intro, index) => {
        return (
          <div key={index} className="item">
            <div className="item-circle" />
            <div className="desc">{intro}</div>
          </div>
        );
      })}
    </div>
  );
};
