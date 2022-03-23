/**
 *  Created by pw on 2020/11/7 10:22 下午.
 */
import React, { useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import './MakePlan.less';
import Customization from '@/images/teambuilding/customization.png';
import { saveOrders } from '@/services/orders';
import { NOOP } from '@/lib/Conts';
import { genAgl } from '@/lib/fcagl';
import { useCaptcha } from '@/hooks';

interface MakePlanProps {
  onSuccess?: () => void;
}

export default function(props: MakePlanProps) {
  const { onSuccess = NOOP } = props;
  const defaultVaule = {};
  const [values, setValues] = useState<any>(defaultVaule);
  const handleSubmit = () => {
    console.log(values);
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
        //TODO 增加埋点
        genAgl();

        setTimeout(function() {
          onSuccess();
        }, 100);
      })
      .catch(({ data }) => {
        alert(data.error ?? 'Error');
      });
  };

  const c = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleInputChange = (key: string, value: any) => {
    setValues({ ...values, [key]: value });
  };
  const [footerTop, setFooterTop] = useState(0);

  const { second, handleGetSmsCode, message } = useCaptcha(values);
  useEffect(() => {
    const footer = document.getElementById('footer');
    setFooterTop(footer?.offsetTop || 0);
    return () => {};
  }, []);

  return (
    <Sticky top={60} bottomBoundary={footerTop}>
      <div className="make-plan">
        <div className="title-wrapper">
          <div className="title">
            <img alt="团建方案定制" className="img" src={Customization} />
            团建方案定制
          </div>
        </div>
        <div className="content">
          {/*<select className="item" placeholder="出行人数">*/}
          {/*  <option>2人</option>*/}
          {/*  <option>5人</option>*/}
          {/*  <option>10人以上</option>*/}
          {/*</select>*/}
          {/*<select className="item" placeholder="人均预算">*/}
          {/*  <option>100元</option>*/}
          {/*  <option>500元</option>*/}
          {/*  <option>1000元以上</option>*/}
          {/*</select>*/}
          {/*<select className="item" placeholder="团建天数">*/}
          {/*  <option>1天</option>*/}
          {/*  <option>2天</option>*/}
          {/*  <option>3天</option>*/}
          {/*  <option>3天以上</option>*/}
          {/*</select>*/}
          <input
            name={'people_number'}
            className="item"
            placeholder={'出行人数'}
            type={'number'}
            onChange={e =>
              handleInputChange('people_number', Number(e.target.value))
            }
          />
          <input
            name={'price'}
            className="item"
            placeholder={'人均预算'}
            type={'number'}
            onChange={e => handleInputChange('price', Number(e.target.value))}
          />
          <input
            name={'days'}
            className="item"
            placeholder={'团建天数'}
            type={'number'}
            onChange={e => handleInputChange('days', Number(e.target.value))}
          />
          <input
            name={'contact'}
            className="item"
            placeholder={'联系人'}
            onChange={e => handleInputChange('contact', e.target.value)}
          />

          <div className="content-row">
            <input
              name={'contact_mobile'}
              className="item"
              placeholder={'联系手机号'}
              onChange={e =>
                handleInputChange('contact_mobile', e.target.value)
              }
            />
            {second !== undefined && second >= 0 ? (
              <button className="sms_btn">已下发（{second}s）</button>
            ) : (
              <button className="sms_btn" onClick={() => handleGetSmsCode()}>
                获取验证码
              </button>
            )}
          </div>
          {message && (
            <div className="row">
              <p className="error_msg">{message}</p>
            </div>
          )}
          <input
            name={'captcha'}
            className="item"
            placeholder={'验证码'}
            onChange={e => handleInputChange('captcha', e.target.value)}
          />
          <button className="action" onClick={handleSubmit}>
            提交需求
          </button>
        </div>
      </div>
    </Sticky>
  );
}
