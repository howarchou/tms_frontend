/**
 *  Created by pw on 2020/9/20 6:02 下午.
 */
import React, { useEffect, useState } from 'react';
import './Recommend.less';
import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import Tabs, { TabIF } from '@/components/tab';
import HomeCard, { HomeMoreCard } from '@/pages/home/HomeCard';
import { getTops } from '@/services/home';
import { cloneDeep } from 'lodash';
import { API } from '@/services/API';

export default function() {
  const [data, setData] = useState<API.Home_Top[]>([]);
  const [selectedData, setSelectedData] = useState<API.Home_Top>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getTops();
    if (data.length) {
      setSelectedData(data[0]);
    }
    setData(data);
  };

  const formatActivities = (item: API.Home_Top) => {
    const { activities, ...others } = item;
    const _activities = cloneDeep(activities);
    _activities.push({ ...others, type: 'more' } as any);
    item.activities = _activities;
    return item;
  };

  const handleTabClick = (tab: TabIF) => {
    const selectedData = data.find(item => item.type_id === tab.id);
    setSelectedData(selectedData);
  };

  const tabs: any = data.map(card => {
    const unselect_icon = card.type_icon.replace('-select', '');
    return {
      id: card.type_id,
      label: card.type_name,
      icon: card.type_icon,
      unselect_icon,
    };
  });
  const datasource = (selectedData?.activities || []).concat({
    type: 'more',
    ...(selectedData as any),
  });
  return (
    <div className="recommend-wrapper">
      <HomeSectionTitle title={'优选团建'} />
      <Tabs tabs={tabs} onTabClick={handleTabClick} />
      {datasource.length ? <HomeCard cards={datasource} /> : null}
    </div>
  );
}
