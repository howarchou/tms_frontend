/**
 *  Created by pw on 2020/11/23 7:29 下午.
 */
// @ts-ignore
import { request, RequestResponse } from 'umi';
import * as Storage from '@/lib/storage';

function setProvince(options: any) {
  const province = Storage.get(Storage.STORAGE_KEY_AREA) || 11;
  if (!options) {
    options = {
      params: {
        province,
      },
    };
  }
  if (options.skipProvince) {
    return options;
  }
  if (!options.params) {
    options.params = { province };
  }
  if (!options.params.province) {
    options.params['province'] = province;
  }
  return options;
}

const { environment } = process.env;
export default function<T = any>(
  path: string,
  options?: any,
): Promise<RequestResponse<T>> {
  const basePath = environment === 'pre' ? '/pre' : '/h5';
  return request(`${basePath}${path}`, setProvince(options));
}
