/**
 *  Created by pw on 2020/9/20 6:02 下午.
 */
import React, { useEffect, useState } from 'react'
import { useCaptcha } from "@/hooks"
import { saveOrders } from "@/services/orders"
import { genAgl } from "@/lib/fcagl"
import './QuickMade.less'

export default function () {
  const defaultVaule = { remark: '首页banner免费咨询' }
  const [ error, setError ] = useState('')
  const [ values, setValues ] = useState<any>(defaultVaule)
  const {
    second, handleGetSmsCode, message
  }
    = useCaptcha(values)
  const handleSubmit = () => {
    if (!values?.contact) {
      setError('请输入联系人')
      return
    }
    if (!values?.contact_mobile) {
      setError('请输入手机号')
      return
    }
    saveOrders({ ...values }).then(() => {
      //TODO 增加埋点
      genAgl()
    })
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
      <p><span>公司团建活动策划</span>| 今日还剩7个免费团建活动方案名额</p>
      <div className='form-item'>
        <input placeholder='请输入您的称呼'
          type='text'
          name='name'
          className='item-name'
          onChange={ e => handleInputChange('contact', e.target.value) }
          required/>

        <input placeholder='填写手机号码，获取免费公司团建活动策划名额'
          type='text'
          className="item-phone"
          name="contact_mobile"
          onChange={ e => handleInputChange('contact_mobile', e.target.value) }
          required/>
        <input placeholder='验证码'
          type='text'
          className="item-captcha"
          name="captcha"
          onChange={ e => handleInputChange('captcha', e.target.value) }
          required/>
        { second !== undefined && second >= 0 ? (
          <button className="sms-btn disable">已下发{ second }s</button>
        ) : (
          <button className="sms-btn"
            onClick={ () => handleGetSmsCode() }>
            获取验证码 </button>
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
