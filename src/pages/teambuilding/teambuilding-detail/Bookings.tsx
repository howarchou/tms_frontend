/**
 *  Created by pw on 2020/11/8 6:42 下午.
 */
import React, { Component } from 'react';
import './Bookings.less';
import { TeambuildingSubtitle } from '@/pages/teambuilding/teambuilding-detail/DetailContent';

interface Props {
  detail: API.Activity;
}

export default function(props: Props) {
  const { detail } = props;
  const bookings = [
    '患有严重的心脏病，高血压，哮喘等易发突发性疾病者，孕妇；患有急性传染病及其他不适于参加公众活动的疾病者；近期做过大手术者；以及医生叮嘱减少大量户外活动者，请您务必声明您的健康状况，如您具备上述情形，请提前告知工作人员',
    '请您预定时务必提供准确、完整的信息（姓名、性别、证件号码、国籍、联系方式），以免个人信息错误不能正常购买旅游意外险',
    '所有学员必须服从老师及教练的安排与指挥，未经许可，不得擅自离队，进行其他与团建无关的活动',
    '本产品行程实际出行中，在不减少活动项目且征得客人同意的前提下，领队、司机可能会根据天气、交通等情况，对您的行程进行适当的调整（如调整景点游览顺序等），以确保行程顺利进行。如因不可抗力等因素确实无法执行原行程计划，对于因此而造成的费用变更，我司实行多退少补，敬请理解',
    '请遵守各景区、基地规定、爱护环境及各类设施，不要乱丢垃圾',
    '活动期间禁止携带宠物，以免同事之间对宠物敏感或者过敏',
  ];

  return (
    <div className="booking-wrapper" id="anchor4">
      <TeambuildingSubtitle title={'预定须知'} />
      {/*<div*/}
      {/*  className="booking-content"*/}
      {/*  dangerouslySetInnerHTML={{ __html: detail.booking_notes }}*/}
      {/*/>*/}
      {bookings.map((booking, index) => {
        return (
          <div key={index} className="booking-item">
            <div className="item-circle" />
            <div className="desc">{booking}</div>
          </div>
        );
      })}
    </div>
  );
}
