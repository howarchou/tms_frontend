/**
 *  Created by pw on 2020/10/8 9:06 下午.
 */
import React, { useState, useEffect, useReducer } from 'react';
import { useHistory, useLocation } from 'umi';
import qs from 'query-string';
import TeambuildinngContentList from './TeambuildinngContentList';
import TeambuildingHeader from './TeambuildingHeader';
import './index.less';
import { getActivities, getSettings } from '@/services';
import { __PAGE_SIZE } from '@/lib/Conts';
import { SearchFormActionType } from './types';
import * as Storage from '@/lib/storage';

export default function() {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState<API.ListResponsePayload<API.Activity>>();
  const [page, setPage] = useState(1);
  const fetchData = async (param?: API.ListParam & API.QueryActivityParams) => {
    if (param?.order) {
      param.order_by = ['sort', 'price'].indexOf(param.order);
      delete param.order;
    }

    const data = await getActivities(param);
    console.log(data);
    setData(data);
  };
  const handleSearchChange = (params: API.QueryActivityParams) => {
    console.log('请求', params);
    fetchData({ ...params, page_no: page, page_size: __PAGE_SIZE });
    document.documentElement.scrollTop = 0;
  };

  function reducer(
    state: API.QueryActivityParams,
    action: SearchFormActionType,
  ) {
    console.log('触发了reducer', action);
    switch (action.type) {
      case 'UPDATE':
        const newState = {
          ...state,
          ...action.payload,
        };
        const stringified = qs.stringify(newState, {
          skipNull: true,
          skipEmptyString: true,
        });
        console.log('格式化的参数', stringified);
        history.replace(`${window.location.pathname}?${stringified}`);
        return newState;
        break;
      case 'FETCH':
        handleSearchChange({
          ...state,
        });
        return { ...state };
        break;
      default:
        throw new Error('action不对');

        break;
    }
  }
  const searchParams = {
    order: 'sort',
    ...qs.parse(location.search, { parseNumbers: true }),
  };
  console.log('初始化的参数', location.search, searchParams);
  const [searchForm, dispatch] = useReducer(reducer, {
    area: null,
    duration: null,
    method: null,
    profits: null,
    province: Storage.get(Storage.STORAGE_KEY_AREA),
    ...searchParams,
  });

  useEffect(() => {
    fetchData({
      ...searchParams,
      page_no: 1,
      page_size: __PAGE_SIZE,
    });
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchData({ page_no: page, page_size: __PAGE_SIZE, ...searchForm });
    document.documentElement.scrollTop = 0;
  };

  if (!data) {
    return null;
  }

  return (
    <div className="teambuild-wrapper">
      <TeambuildingHeader initialValues={searchParams} dispatch={dispatch} />
      <TeambuildinngContentList
        data={data}
        dispatch={dispatch}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
