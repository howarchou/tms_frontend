/**
 *  Created by pw on 2020/11/20 10:24 下午.
 */
import baseRequest from '@/services/baseRequest';

export type SmsCodeParamsType = {
  phone: string;
};

export async function getSmsCode(
  params: SmsCodeParamsType,
): Promise<SmsCodeParamsType> {
  const res = await baseRequest<OrdersParamsType>('/sms', {
    method: 'GET',
    params,
  });
  return res.payload;
}

export interface OrdersParamsType {
  people_number: number;
  price: number;
  days: number;
  contact: string;
  contact_mobile: string;
  remark: string;
}

export async function saveOrders(
  params: OrdersParamsType,
): Promise<OrdersParamsType> {
  const {
    people_number,
    price,
    days,
    contact,
    contact_mobile,
    remark,
  } = params;
  // const res = await request('/orders', {
  //   method: 'POST',
  //   data: { area, price, days, contact, contact_mobile, remark },
  // });
  // return res.payload;
  const res = await baseRequest<OrdersParamsType>('/orders', {
    method: 'POST',
    data: params,
  });
  return res.payload;
}

export default {
  saveOrders,
};
