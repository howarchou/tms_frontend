/**
 *  Created by pw on 2020/9/20 6:12 下午.
 */
import React, { useState, useEffect } from 'react';
import './index.less';

interface Props {
  tabs: TabIF[];
  onTabClick?: (tab: TabIF) => void;
  className?: string;
}

export interface TabIF {
  id: string;
  label: string;
  icon?: string;
  desc?: string;
  unselect_icon?: string;
}

export default function(props: Props) {
  const { tabs = [], onTabClick, className = '' } = props;
  const [selectTab, setSelectTab] = useState({} as TabIF);

  useEffect(() => {
    if (tabs.length) {
      setSelectTab(tabs[0]);
    }
  }, [tabs.length]);

  const handleClick = (tab: TabIF) => {
    setSelectTab(tab);
    if (onTabClick) {
      onTabClick(tab);
    }
  };

  return (
    <div className={`tab-wrapper ${className}`}>
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            className={`tab-item ${
              selectTab?.id === tab.id ? 'tab-item-select' : ''
            }`}
            onClick={() => handleClick(tab)}
          >
            {tab.icon ? (
              <img
                className="tab-icon" alt="小图标"
                src={selectTab?.id === tab.id ? tab.icon : tab.unselect_icon}
              />
            ) : null}
            <div className="title-wrapper">
              <div className="tab-title">{tab.label}</div>
            </div>
            {selectTab?.id === tab.id ? <div className="tab-line" /> : null}
          </div>
        );
      })}
    </div>
  );
}
