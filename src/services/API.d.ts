/**
 *  Created by pw on 2020/11/14 2:08 下午.
 */
import { Cost } from '@/pages/teambuilding/types';
declare global {
  namespace API {
    export interface BaseResponse<T> {
      message: string;
      payload: T;
    }

    export interface ListResponse<T> {
      message: string;
      payload: ListResponsePayload<T>;
    }

    export interface ListResponsePayload<T> {
      data: T[];
      page_no: number;
      page_size: number;
      total_count: number;
      total_page: number;
    }

    export interface ListParam {
      page_no: number;
      page_size: number;
    }

    export interface Home_Banner {
      cover: string;
      link: string;
      name: string;
      // type: 'video' | 'image';
      type: 'image';
    }

    export interface Home_HotPots {
      cover: string;
      link: string;
      name: string;
      area?: string;
      keywords?: string[];
    }

    export interface Home_Logos {
      cover: string;
      link: string;
      name: string;
    }

    export interface TagItem {
      value: number | null;
      text: string;
      items?: TagItem[];
    }
    export interface Activities_Settings {
      activity_duration: TagItem[];
      activity_area: TagItem[];
      activity_profit: TagItem[];
      activity_method: TagItem[];
      [key: string]: any;
    }

    export interface SearchFormParams {
      activity_area?: number;
      activity_duration?: number;
      activity_method?: number;
      activity_profit?: number;
      name?: string;
      [key: string]: any;
    }

    export interface Recommend {}

    export interface Activities {}

    export interface Activities_ID {}

    export interface Home_Top {
      type_icon: string;
      type_name: string;
      type_id: string;
      activities: Activity[];
      more_link: string;
      type_icon_large: string;
      type_icon_select: string;
    }

    export interface Case_Data {
      city_id: string;
      city_name: string;
      cases: Case_Item[];
    }

    export interface Case_Item {
      id: string;
      cover: string;
      name: string;
      title: string;
      city: string;
    }

    export interface Case_Detail {
      id: string;
      city: number;
      company: string;
      name: string;
      title: string;
      date: number;
      views: number;
      people: string;
      days: string;
      distance: string;
      address: string;
      schedule: Schedule[];
      logo: string;
      banners: string[];
      cover: string;
      photos: string[];
      activity: Activity;
      sort: number;
      status: number;
    }

    export interface Item {
      time: number;
      text: string;
    }

    export interface Schedule {
      day: number;
      items: Item[];
    }

    // export interface Schedules {
    //   activity_id: number;
    //   sections?: any;
    // }

    export interface Feature {
      title: string;
      picture: string;
      description: string;
    }

    export interface Place {
      pictures: string[];
      description: string;
    }

    export interface Star {
      key: string;
      text: string;
      value: number;
    }

    export interface Cost_Statement {
      include: Cost[];
      exclusive: string[];
    }

    export interface QueryActivityParams extends ListParam {
      area?: number;

      duration?: number;

      method?: number;

      name?: string;

      profits?: string;

      province?: number;

      // 用来兼容的
      [key: string]: any;
    }

    export interface Activity {
      id: string;
      name: string;
      area: number;
      address: string;
      method: string;
      profits: string[];
      duration: number;
      people_number: number;
      hold_min: number;
      hold_max: number;
      price: number;
      planner: string;
      avatar?: string;
      mobile: string;
      description: string;
      cover: string;
      banners: string[];
      tags: string;
      cost_statement: Cost_Statement;
      safety_notes: string;
      booking_notes: string;
      warm_tips: string[];
      stars: number;
      detail_stars: Star[];
      sort?: any;
      status?: any;
      fees?: any;
      schedule?: any;
      place?: Place;
      themes?: any;
      feature: Feature;
      type?: string;
    }
  }
}
