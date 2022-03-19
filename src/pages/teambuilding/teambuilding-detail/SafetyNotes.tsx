/**
 *  Created by pw on 2020/11/8 6:42 下午.
 */
import React, { Component } from 'react';
import './SafetyNotes.less';
import { TeambuildingSubtitle } from '@/pages/teambuilding/teambuilding-detail/DetailContent';

interface Props {
  detail: API.Activity;
}

export default function(props: Props) {
  const { detail } = props;
  const SafetyNotes = [
    '1、本人证件：请您参训时成人携带有效身份证件原件,如果因证件过期或不齐造成的损失由您自理',
    '2、参训着装：休闲装或户外运动服(尽量穿宽松、防磨、运动鞋),防寒衣物',
    '3、参训规定：培训时请严格遵守规定时间,接送集合时间等,过时不候,如造成损失自理',
    '4、参训药品：学员中有心脏病或高血压病史请自备药品,经常口服药品请自带,我司不提供所有口服药品,只提供外用药品等',
    '5、参训事件：如果遭遇恶劣天气或交通、国家政策规定等不能正常活动时,培训顾问会根据情况与您协调培训活动时间和培训项目',
    '6、参训入住：入住酒店时贵重物品和现金请到宾馆总台寄存,谨防偷盗;否则,保险公司不予赔偿',
    '7、酒水规定：参训期间请服从培训师和基地工作人员的管理,严禁饮酒',
    '8、基地规定：请勿擅自攀爬培训活动区内各类训练设施,以免发生意外,禁止吸烟,禁止乱扔果皮、纸屑等;请您自觉保护好大自然赐予我们的珍贵遗产',
    '9、金口玉言：培训活动结束后,您在《拓展培训服务质量意见表》所签的,是对我们工作的最终评价;敬请您认真填写并提出宝贵意见',
  ];
  return (
    <div className="SafetyNotes-wrapper">
      <TeambuildingSubtitle title={'安全须知'} />
      {/*<div*/}
      {/*  className="booking-content"*/}
      {/*  dangerouslySetInnerHTML={{ __html: detail.safety_notes }}*/}
      {/*/>*/}
      {SafetyNotes.map((booking, index) => {
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
