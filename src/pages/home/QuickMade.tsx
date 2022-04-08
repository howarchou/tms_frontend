/**
 *  Created by pw on 2020/9/20 6:02 下午.
 */
import React, { useEffect, useState } from 'react'
import { useCaptcha } from "@/hooks"
import { saveOrders } from "@/services/orders"
import { genAgl } from "@/lib/fcagl"
import './QuickMade.less'

export default function () {
  const defaultValue = {
    remark: '首页banner免费咨询',
    contact: '',
    contact_mobile: '',
    captcha: ''
  }
  const [ error, setError ] = useState('')
  const [ values, setValues ] = useState<any>(defaultValue)
  const {
    second, handleGetSmsCode, message, reset
  }
    = useCaptcha(values)
  const handleSubmit = () => {
    if (!values?.contact) {
      setError('请输入联系人您的称呼')
      return
    }
    if (!values?.contact_mobile) {
      setError('请输入手机号')
      return
    }
    if (!values?.captcha) {
      setError('请输入验证码')
      return
    }
    saveOrders({ ...values }).then(() => {
      setValues(defaultValue)
      //TODO 增加埋点
      genAgl()
      alert('提交成功')
    }).finally(() => reset())
  }
  useEffect(() => {
    setError(message ?? '')

  }, [ message ])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (error) {
      timeout = setTimeout(() => {
        setError('')
      }, 3000)
    }
    return () => timeout && clearTimeout(timeout)
  }, [ error ])

  const handleInputChange = ( key: string, value: any ) => {
    setValues({ ...values, [ key ]: value })
  }
  return (
    <div className='quick-wrapper'>
      <p><span>免费提供公司团建策划方案</span></p>
      <div className='form-item'>
        <input placeholder='请输入您的称呼'
          type='text'
          name='contact'
          value={ values.contact }
          className='item-name'
          onChange={ e => handleInputChange('contact', e.target.value) }
          required/>

        <input placeholder='填写手机号码，免费提供公司团建策划方案'
          type='text'
          className="item-phone"
          name="contact_mobile"
          value={ values.contact_mobile }
          onChange={ e => handleInputChange('contact_mobile', e.target.value) }
          required/>
        <input placeholder='验证码'
          type='text'
          className="item-captcha"
          name="captcha"
          value={ values.captcha }
          onChange={ e => handleInputChange('captcha', e.target.value) }
          required/>
        { second !== undefined && second >= 0 ? (
          <button className="sms-btn disable">已下发{ second }s</button>
        ) : (
          <button className="sms-btn"
            onClick={ () => handleGetSmsCode() }>获取验证码 </button>
        ) }

        {
          error && <div className="form-msg">
            { error }
          </div>
        }


        <button className='submit'
          onClick={ handleSubmit }
          type='button'>获取公司团建方案
        </button>
      </div>
    </div>
  )
}
