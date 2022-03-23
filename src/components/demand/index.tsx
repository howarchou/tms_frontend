/**
 *  Created by pw on 2020/11/14 10:47 下午.
 */
import React, { useState } from 'react';
import './index.less';
import { saveOrders } from '@/services/orders';
import { NOOP } from '@/lib/Conts';
import { genAgl } from '@/lib/fcagl';
import { useCaptcha } from '@/hooks';

interface DemandProps {
  onSuccess?: () => void;
}

export default function(props: DemandProps) {
  const { onSuccess = NOOP } = props;
  const defaultVaule = {
    /* people_number: 2, price: 100, days: 1  */
  };
  const [values, setValues] = useState<any>(defaultVaule);
  const handleSubmit = () => {
    if (!values?.contact_mobile) {
      alert('请输入手机号');
      return;
    }
    if (!values?.captcha) {
      alert('请输入短信验证码');
      return;
    }
    saveOrders({ ...values })
      .then(res => {
        // alert('提交成功!');

        onSuccess();

        //TODO 增加埋点
        genAgl();
      })
      .catch(({ data }) => {
        alert(data.error ?? 'Error');
      });
  };

  const handleOnSelectChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleInputChange = (key: string, value: any) => {
    setValues({ ...values, [key]: value });
  };

  const { second, handleGetSmsCode, message } = useCaptcha(values);
  return (
    <div className="demand-wrapper">
      <div className="content">
        <div className="row">
          {/*<select*/}
          {/*  className="item"*/}
          {/*  name={'people_number'}*/}
          {/*  placeholder="出行人数"*/}
          {/*  onChange={e => handleOnSelectChange('people_number', e.target.value)}*/}
          {/*>*/}
          {/*  <option value={'2'}>2人</option>*/}
          {/*  <option value={'5'}>5人</option>*/}
          {/*  <option value={'10+'}>10人以上</option>*/}
          {/*</select>*/}
          <input
            className="item"
            name={'people_number'}
            type={'number'}
            placeholder={'出行人数'}
            onChange={e =>
              handleInputChange('people_number', Number(e.target.value))
            }
          />
          {/*<select*/}
          {/*  className="item"*/}
          {/*  name={'price'}*/}
          {/*  placeholder="人均预算"*/}
          {/*  onChange={e => handleOnSelectChange('price', e.target.value)}*/}
          {/*>*/}
          {/*  <option value={'100'}>100元</option>*/}
          {/*  <option value={'500'}>500元</option>*/}
          {/*  <option value={'1000+'}>1000元以上</option>*/}
          {/*</select>*/}
          <input
            name={'price'}
            className="item"
            placeholder={'人均预算'}
            type={'number'}
            onChange={e => handleInputChange('price', Number(e.target.value))}
          />
        </div>
        <div className="row">
          {/*<select*/}
          {/*  className="item"*/}
          {/*  name={'days'}*/}
          {/*  placeholder="团建天数"*/}
          {/*  onChange={e => handleOnSelectChange('days', e.target.value)}*/}
          {/*>*/}
          {/*  <option value={'1'}>1天</option>*/}
          {/*  <option value={'2'}>2天</option>*/}
          {/*  <option value={'3'}>3天</option>*/}
          {/*  <option value={'3+'}>3天以上</option>*/}
          {/*</select>*/}
          <input
            name={'days'}
            className="item"
            placeholder={'团建天数'}
            type={'number'}
            onChange={e => handleInputChange('days', Number(e.target.value))}
          />
          <input
            className="item"
            name={'contact'}
            required={true}
            placeholder={'联系人'}
            onChange={e => handleInputChange('contact', e.target.value)}
          />
        </div>
        <div className="row">
          <input
            className="item"
            name={'contact_mobile'}
            placeholder={'联系手机号'}
            onChange={e => handleInputChange('contact_mobile', e.target.value)}
          />{' '}
          {second !== undefined && second >= 0 ? (
            <button className="sms_btn">已下发（{second}s）</button>
          ) : (
            <button className="sms_btn" onClick={() => handleGetSmsCode()}>
              获取验证码
            </button>
          )}
          {/*<input*/}
          {/*  className="item"*/}
          {/*  name={'wx'}*/}
          {/*  placeholder={'微信号'}*/}
          {/*  onChange={e => handleInputChange('wx', e.target.value)}*/}
          {/*/>*/}
        </div>
        {message && (
          <div className="row">
            <p className="error_msg">{message}</p>
          </div>
        )}
        <div className="row">
          <input
            className="item"
            name={'captcha'}
            placeholder={'验证码'}
            onChange={e => handleInputChange('captcha', e.target.value)}
          />
        </div>
        <div className="row">
          <textarea
            className="item item-textarea"
            name={'remark'}
            placeholder="其它备注"
            onChange={e => handleInputChange('remark', e.target.value)}
          />
        </div>

        <div className="action" onClick={handleSubmit}>
          提交需求
        </div>
      </div>
    </div>
  );
}
