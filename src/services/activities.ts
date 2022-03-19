/**
 *  Created by pw on 2020/11/21 5:27 下午.
 */
import { __PAGE_SIZE } from '@/lib/Conts';
import baseRequest from '@/services/baseRequest';
import { API } from './API';

export async function getActivities(
  params: API.QueryActivityParams = { page_no: 1, page_size: __PAGE_SIZE },
): Promise<API.ListResponsePayload<API.Activity>> {
  const filterParams = Object.keys(params)
    .filter(key => !!params[key])
    .reduce<API.QueryActivityParams>(
      (res, cur) => {
        res[cur] = params[cur];
        return res;
      },
      { page_no: params.page_no, page_size: params.page_size },
    );
  const res = await baseRequest<API.ListResponse<API.Activity>>('/activities', {
    params: { ...filterParams },
    // skipProvince: true,
  });
  return res.payload;
}

export async function getActivitityById(id: string): Promise<API.Activity> {
  const res = await baseRequest<API.BaseResponse<API.Activity>>(
    `/activities/${id}`,
  );
  return res.payload;
}

export async function getSettings(): Promise<API.Activities_Settings> {
  const res = await baseRequest<API.ListResponse<API.Activities_Settings>>(
    '/settings',
  );
  return res.payload;
}

export default {
  getActivities,
  getActivitityById,
  getSettings,
};
