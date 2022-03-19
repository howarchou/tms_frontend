/**
 *  Created by pw on 2020/9/20 6:12 下午.
 */
import React, { useState, useEffect } from 'react';
import Sticky from 'react-stickynode';
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
    onScroll();
    if (tabs.length) {
      setSelectTab(tabs[0]);
    }
  }, [tabs.length]);

  const handleClick = (tab: TabIF) => {
    setSelectTab(tab);
    if (onTabClick) {
      onTabClick(tab);
    }
    if (tab.id) {
      let anchorElement = document.getElementById(tab.id);
      if (tab.id !== 'anchor1') {
        let anchor1 = document.getElementById('anchor1');
        if (anchor1) {
          anchor1.style.marginTop = '20px';
        }
      }
      if (tab.id !== 'anchor2') {
        let anchor2 = document.getElementById('anchor2');
        if (anchor2) {
          anchor2.style.marginTop = '20px';
        }
      }
      if (tab.id !== 'anchor3') {
        let anchor3 = document.getElementById('anchor3');
        if (anchor3) {
          anchor3.style.marginTop = '20px';
        }
      }
      if (tab.id !== 'anchor4') {
        let anchor4 = document.getElementById('anchor4');
        if (anchor4) {
          anchor4.style.marginTop = '20px';
        }
      }
      if (anchorElement) {
        anchorElement.scrollIntoView();
        anchorElement.style.marginTop = '150px';
      }
    }
  };

  const onScroll = () => {
    // console.log('1');
    // alert(1)
    //获取滚动条滚动的距离
    let h = document.body.scrollTop;
    console.log(h);
    if (h > 74) {
      let tabCeiling = document.getElementById('tabCeiling');
      if (tabCeiling) {
        tabCeiling.add('tabCeiling');
      }
    } else {
      let tabCeiling = document.getElementById('tabCeiling');
      if (tabCeiling) {
        tabCeiling.remove = 'tabCeiling';
      }
    }
  };

  return (
    <Sticky top={60}>
      <div
        id="tabCeiling"
        className={`tab-wrappers ${className}`}
        style={{ zIndex: 99 }}
      >
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
                  className="tab-icon"
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
    </Sticky>
  );
}
