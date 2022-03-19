/**
 *  Created by pw on 2020/11/8 11:03 下午.
 */
import React from 'react';
import './index.less';
import ABOUT_MAP_IMG from '@/images/about/about-map.png';
import ABOUT_TEL_IMG from '@/images/about/tel.png';
import ABOUT_EMAIL_IMG from '@/images/about/email.png';
import ABOUT_ADDRESS_IMG from '@/images/about/address.png';
import LOGO_IMG from '@/images/home/logo.png';
import SubTitleComponent from '@/components/header/SubTitleCompomment';

export default function() {
  return (
    <div className="about-wrapper">
      <div className="section-wrapper">
        <div className="about-banner-img"></div>
        <div className="section">
          <SubTitleComponent title={'关于我们'} />
          <div className="content-wrapper">
            <img className="logo" src={LOGO_IMG} />
            <div className="content">
              <div className="content-span">
                鱼悦团建是隶属于北京酷玩文化有限公司，是一站式团建服务提供商，公司业务覆盖北京、上海、苏州、杭州、成都、西安等地，是“互联网+团建”理念的首倡者。目前可提供主题团建、趣味探险、旅行团建、军事拓展、室内培训等多维度、全覆盖的一站式团建服务体系。鱼悦团建以“老板放心
                员工开心”为使命，致力于实现员工感情与企业文化的同步融合、发展。
              </div>
              <div className="content-span">
                自成立以来，鱼悦团建深耕团建服务行业，培养和集聚了一只专业、高效、创新的团建策划团队，能够迅速产出个性化定制团建服务并落地执行，已与腾讯、微软、IBM、快手、CGV等知名企业达成团建服务合作。目前已经形成了四大类、超过100种的创意团建方案，可以满足各种规模的公司团建定制需求。
              </div>
              <div className="content-span">
                为保证客户团建活动能够快速、高效、优质的推进，鱼悦团建采用线上标准化流程服务、线下个性化执行交付的模式，打造全新“互联网+”模式的团建服务理念。目前，鱼悦团建已经完成了北京、上海、苏州、杭州等地上百个团建活动场地的实地考察，与上千家合作供应商签订了框架合作协议，打通了餐饮、住宿、旅行、摄影、拓展训练等团建内容的流程链条。
              </div>
              <div className="content-span">
                依托于“互联网+团建”理念的发展，鱼悦团建打造探索出一套包括娱乐休闲模块、思维拓展模块、沟通协调模块、团队融合模块在内的团建培养体系。通过团建内容的延伸，着力培养团队的开放、协作、创新、突破等多元复合思维，鼓励团队成员进行破冰融合，放松身心的同时完成团队融合。
              </div>
              <div className="content-span">
                未来，鱼悦团建将以一站式互联网+团建服务商身份，通过资源共享、流程互通、定制服务和高效协同，积极拥抱变化，探寻企业用户需求，帮助用户团队在激烈的竞争环境中发挥优势，形成强大的团队凝聚合力，与客户、员工共同成长。
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <SubTitleComponent title={'联系我们'} />
          <div className="content-wrapper">
            <div className="content-item">
              <img className="item-icon" src={ABOUT_TEL_IMG} />
              <div className="right">
                <div className="title">联系电话</div>
                <div className="title">021-65667525</div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="content-wrapper">
            <div className="content-item">
              <img className="item-icon" src={ABOUT_EMAIL_IMG} />
              <div className="right">
                <div className="title">E-Mail</div>
                <div className="title">yuyuewang@163.com</div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="content-wrapper">
            <div className="content-item">
              <img className="item-icon" src={ABOUT_ADDRESS_IMG} />
              <div className="right">
                <div className="title">地址</div>
                <div className="title">
                  北京市经济开发区科创十四街汇龙森科技园33号楼A座5层512
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="about-map"
          alt={`地图`}
          src={`http://img.yuyuetuanjian.cn/asset/about/about-map.png`}
        />
      </div>
    </div>
  );
}
