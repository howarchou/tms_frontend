/**
 *  Created by pw on 2020/11/20 10:24 下午.
 */
import baseRequest from '@/services/baseRequest';

export interface PartnerParamsType {
  partner_type: string;
  service_type: string;
  contact_name: string;
  contact_mobile: string;
  captcha: string;
  remark: string;
}

export async function createPartner(
  params: PartnerParamsType,
): Promise<PartnerParamsType> {
  const res = await baseRequest<PartnerParamsType>('/partner', {
    method: 'POST',
    data: params,
  });
  return res.payload;
}

export default {
  createPartner,
};
