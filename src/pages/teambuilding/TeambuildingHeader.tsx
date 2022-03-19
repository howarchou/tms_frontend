/**
 *  Created by pw on 2020/11/7 12:20 下午.
 */
import React, { useEffect, useReducer, useState } from 'react';
import './TeambuildingHeader.less';
import SEARCH_ICON from '@/images/teambuilding/search.png';
import * as Storage from '@/lib/storage';
import { getSettings } from '@/services';
import { API } from '@/services/API';
import { FilterPanelItemProps, SearchFormActionType } from './types';
import {
  FilterAreaPanel,
  FilterMutilPanel,
  FilterPanel as FilterBasePanel,
} from './components';
interface Props {
  // onSearch: (params: API.QueryActivityParams) => void;
  dispatch: React.Dispatch<SearchFormActionType>;
  initialValues: API.QueryActivityParams;
}

export default function(props: Props) {
  const { dispatch, initialValues } = props;

  const onSearch = (name: string) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        name,
      },
    });
    dispatch({
      type: 'FETCH',
      payload: {},
    });
  };

  return (
    <div className="teambuilding-header">
      <SearchInput onSearch={onSearch} />
      <FilterPanel dispatch={dispatch} initialValues={initialValues} />
    </div>
  );
}

interface SearchInputProps {
  onSearch: (searchText: string) => void;
  searchBtnLabel?: string;
}

const SearchInput = (props: SearchInputProps) => {
  const { onSearch, searchBtnLabel = '查询' } = props;
  const [searchText, setSearchText] = useState<string>('');

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    // if (searchText.trim().length && onSearch) {
    onSearch(searchText);
    // }
  };

  return (
    <div className="search_input_wrapper">
      <input className="input" onChange={handleChange} />
      <div className="action" onClick={handleSearch}>
        <img className="icon" src={SEARCH_ICON} />
        <div className="label">{searchBtnLabel}</div>
      </div>
    </div>
  );
};

interface FilterPanelProps {
  dispatch: React.Dispatch<SearchFormActionType>;
  initialValues: API.QueryActivityParams;
}

const FilterPanel = (props: FilterPanelProps) => {
  const [settings, setSettings] = useState<API.Activities_Settings>({
    activity_area: [],
    activity_duration: [],
    activity_method: [],
    activity_profit: [],
  });
  const { dispatch, initialValues } = props;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const settings = await getSettings();
    // 过滤一下城市
    // settings.activity_area = settings.activity_area.filter(
    //   a => a.value === Storage.get(Storage.STORAGE_KEY_AREA || 11),
    // );
    setSettings(settings);
  };

  const sort = [
    { title: '团建目的地', searchKey: 'area', key: 'activity_area' },
    { title: '团建玩法', searchKey: 'method', key: 'activity_method' },
    { title: '团建收益', searchKey: 'profits', key: 'activity_profit' },
    { title: '团建天数', searchKey: 'duration', key: 'activity_duration' },
  ];
  const filterItems = sort.map(item => ({
    ...item,
    tags: [{ text: '不限', value: null }].concat(settings[item.key]),
  }));

  return (
    <div className="filter-panel-wrapper">
      <div className="filter-panel">
        {filterItems.map((item, index) => {
          switch (item.key) {
            case 'activity_area':
              return (
                <FilterAreaPanel
                  initialValue={initialValues.area}
                  dispatch={dispatch}
                  key={index}
                  tagKey={item.searchKey}
                  title={item.title}
                  tags={item.tags}
                  hasMore={false}
                />
              );
              break;
            case 'activity_profit':
              return (
                <FilterMutilPanel
                  initialValue={initialValues.profits}
                  dispatch={dispatch}
                  key={index}
                  tagKey={item.searchKey}
                  title={item.title}
                  tags={item.tags}
                  hasMore={false}
                />
              );

            default:
              return (
                <FilterBasePanel
                  initialValue={initialValues[item.searchKey]}
                  dispatch={dispatch}
                  key={index}
                  tagKey={item.searchKey}
                  title={item.title}
                  tags={item.tags}
                  hasMore={false}
                />
              );
              break;
          }
        })}
      </div>
    </div>
  );
};
