/**
 *  Created by pw on 2020/11/9 9:28 下午.
 */
import React, { useState, useEffect } from 'react';
import './index.less';
import Tabs, { TabIF } from '@/components/tab';
import { history } from 'umi';
import { getCases } from '@/services';

interface CaseMap {
  [key: string]: API.Case_Data;
}

export default function() {
  const [caseData, setCaseData] = useState<CaseMap>({} as CaseMap);
  const [cases, setCases] = useState<API.Case_Item[]>([]);
  const [tabs, setTabs] = useState<TabIF[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getCases();
    const tabs = data.map(item => {
      return { id: item.city_id, label: item.city_name };
    });
    setTabs(tabs);
    const caseData = data.reduce((result, item) => {
      result[item.city_id] = item;
      return result;
    }, {} as CaseMap);
    setCaseData(caseData);
    const [first] = tabs;
    const caseItem = caseData[first.id];
    setCases(caseItem.cases);
  };

  const handleTabClick = (tab: TabIF) => {
    const selectCase = caseData[tab.id];
    setCases(selectCase.cases);
  };

  return (
    <div className="case-wrapper">
      <div className="case-banner-img"></div>
      <div className="tab-header">
        <div className="tab-header-title">城市案例</div>
        <Tabs tabs={tabs} className="case-tab" onTabClick={handleTabClick} />
      </div>
      <CaseCardWrapper caseData={cases} />
    </div>
  );
}

interface CaseCardProps {
  caseData: API.Case_Item[];
  // cards: CaseCardIF[];
  rowCount?: number;
}

const CaseCardWrapper = (props: CaseCardProps) => {
  const { caseData, rowCount = 3 } = props;
  const groups: API.Case_Item[][] = caseData.reduce((result, card, index) => {
    const remainder = Math.floor(index / rowCount);
    let list: API.Case_Item[] = result[remainder];
    if (!list) {
      list = [];
      result.push(list);
    }
    list.push(card);
    return result;
  }, [] as API.Case_Item[][]);

  return (
    <div className="case-card-wrapper">
      {groups.map((group, index) => {
        return (
          <div key={index} className="group-row">
            {group.map(card => {
              return <CaseCardComponent key={card.id} card={card} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

interface CaseCardComponentProps {
  card: API.Case_Item;
}

const CaseCardComponent = (props: CaseCardComponentProps) => {
  const { card } = props;
  const handleClick = () => {
    history.push({
      pathname: '/case-detail',
      query: { id: card.id },
    });
  };
  return (
    <div className="case-card" onClick={handleClick}>
      <div className="top">
        <img
          className="img"
          alt={`封面`}
          src={`${card.cover}?x-oss-process=style/case_list`}
        />
      </div>
      <div className="bottom">
        <div className="title">{card.title}</div>
        <div className="main-title">
          {card.company} | {card.name}
        </div>
      </div>
    </div>
  );
};
