/**
 *  Created by pw on 2020/9/26 8:49 下午.
 */
import React, { useState } from 'react';
import './Footer.less';
import { saveOrders } from '@/services/orders';
import TextField from '@material-ui/core/TextField';
import SubmitDialog from '@/components/submitDialog';
import { genAgl } from '@/lib/fcagl';
import { useCaptcha } from '@/hooks';

export default function() {
  // const baiduTongji = () => {
  //   window._agl = window._agl || [];
  //   (function() {
  //     _agl.push(['production', '_f7L2XwGXjyszb4d1e2oxPybgD']);
  //     (function() {
  //       var agl = document.createElement('script');
  //       agl.type = 'text/javascript';
  //       agl.async = true;
  //       agl.src =
  //         'https://fxgate.baidu.com/angelia/fcagl.js?production=_f7L2XwGXjyszb4d1e2oxPybgD';
  //       var s = document.getElementsByTagName('script')[0];
  //       // @ts-ignore
  //       s.parentNode.insertBefore(agl, s);
  //     })();
  //   })();
  // };
  const defaultVaule = {};
  const [values, setValues] = useState<any>(defaultVaule);
  const [submitSuccessOpen, setSubmitSuccessOpen] = useState(false);
  const handleSubmit = () => {
    console.log(values);
    if (!values?.contact_mobile) {
      alert('请输入手机号');
      return;
    }
    saveOrders({ ...values }).then(res => {
      // alert('提交成功!');

      //TODO 增加埋点
      genAgl();

      setTimeout(function() {
        handleSubmitSuccessOpen();
      }, 100);
    });
  };

  const c = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleInputChange = (key: string, value: any) => {
    setValues({ ...values, [key]: value });
  };

  const handleSubmitSuccessOpen = () => setSubmitSuccessOpen(true);

  const handleSubmitSuccessClose = () => setSubmitSuccessOpen(false);

  const { second, handleGetSmsCode, message } = useCaptcha(values);

  return (
    <div className={`footer-wrapper`} id="footer">
      <div className="footer-content">
        <div className="left">
          <div className="row">
            <input
              name={'people_number'}
              className="input"
              placeholder={'出行人数'}
              type={'number'}
              onChange={e =>
                handleInputChange('people_number', Number(e.target.value))
              }
            />
            <input
              name={'price'}
              className="input"
              placeholder={'人均预算'}
              type={'number'}
              onChange={e => handleInputChange('price', Number(e.target.value))}
            />
          </div>
          <div className="row">
            <input
              name={'days'}
              className="input"
              placeholder={'团建天数'}
              type={'number'}
              onChange={e => handleInputChange('days', Number(e.target.value))}
            />
            <input
              name={'contact'}
              className="input"
              placeholder={'联系人'}
              onChange={e => handleInputChange('contact', e.target.value)}
            />
          </div>
          <div className="row">
            <input
              name={'contact_mobile'}
              className="input2"
              placeholder={'联系手机号'}
              onChange={e =>
                handleInputChange('contact_mobile', e.target.value)
              }
            />{' '}
            <input
              name={'captcha'}
              className="input2"
              style={{ width: '128px' }}
              placeholder={'验证码'}
              onChange={e => handleInputChange('captcha', e.target.value)}
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
          <div className="row">
            <textarea
              className="textarea"
              name={'remark'}
              placeholder="其它备注..."
              onChange={e => handleInputChange('remark', e.target.value)}
            />
          </div>
          <button className="sumbit" onClick={handleSubmit}>
            提交需求
          </button>
        </div>
        <div className="right">
          <div className="top">
            <div className="row">
              <div className="content">商务合作：021-65667525</div>
              <div className="content">加入我们：yy@yuyuetuanjian.cn</div>
            </div>
            <div className="row">
              <div className="content">联系我们：021-65667525</div>
              <div className="content">ICP证：京ICP备2020038271号</div>
            </div>
            <div className="row">
              <div className="content">
                &copy;2019-2020 yuyuetuanjian.cn版权所有
              </div>
            </div>
          </div>
          <div className="bottom">
            <img
              className="img"
              src={'http://img.yuyuetuanjian.cn/asset/about/qrcode.jpg'}
            />
            <img
              className="img"
              src={'http://img.yuyuetuanjian.cn/asset/about/qrcode.jpg'}
            />
          </div>
        </div>
      </div>
      <SubmitDialog
        close={handleSubmitSuccessClose}
        open={submitSuccessOpen}
      ></SubmitDialog>
    </div>
  );
}
