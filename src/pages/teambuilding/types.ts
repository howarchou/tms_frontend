import { API } from '@/services/API';

/**
 *  Created by pw on 2020/11/8 9:55 上午.
 */
export interface CardIF {
  id: number;
  imgUrl: string;
  title: string;
  tags: string[];
  desc: string;
  rate: string;
  money: number;
  average: number;
}

export interface ScheduleIF {
  id: string;
  title: string;
  sub_title: string;
  date: number;
  icon: string;
  items: TeamBuilding_Schedule_Item[];
}

export interface TeamBuilding_Schedule_Item {
  title: string;
  desc: string;
  day: number;
  time: number;
  icon: string;
  supplier: number;
  supplierProject: string;
  imgUrls: string[];
  pictures?: string[];
}

export interface Cost {
  name: string;
  intro: string;
}

export type SearchFormActions = 'UPDATE' | 'FETCH';

export interface SearchFormActionType {
  type: SearchFormActions;
  payload: {
    [key: string]: any;
  };
}

export interface FilterPanelItemProps {
  title: string;
  tagKey: string;
  tags: API.TagItem[];
  hasMore?: boolean;
  dispatch: React.Dispatch<SearchFormActionType>;
  initialValue: string | number | null;
}
