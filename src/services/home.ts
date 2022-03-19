/**
 *  Created by pw on 2020/11/14 2:05 下午.
 */
import baseRequest from '@/services/baseRequest';

export async function getBanners(): Promise<API.Home_Banner[]> {
  const res = await baseRequest<API.BaseResponse<API.Home_Banner[]>>(
    '/banners',
  );
  return res.payload?.map((line: any) => {
    return { ...line, type: 'video' };
  });
}

export async function getHotPots(): Promise<API.Home_HotPots[]> {
  const res = await baseRequest<API.ListResponse<API.Home_HotPots>>(
    '/hotspots',
  );
  return res.payload;
}

export async function getLogos(): Promise<API.Home_Logos[]> {
  const res = await baseRequest<API.ListResponse<API.Home_Logos>>('/logos');
  return res.payload;
}

export async function getRecommends(): Promise<API.Recommend[]> {
  const res = await baseRequest<API.BaseResponse<API.Recommend[]>>(
    '/recommends',
  );
  return res.payload;
}

export async function getTops(): Promise<API.Home_Top[]> {
  const res = await baseRequest<API.BaseResponse<API.Home_Top[]>>('/tops');
  return res.payload;
}

export default {
  getBanners,
  getHotPots,
  getLogos,
  getRecommends,
  getTops,
};
