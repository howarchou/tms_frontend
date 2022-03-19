/**
 *  Created by pw on 2020/11/29 2:58 下午.
 */
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import './index.less';

import { RateProps } from 'rc-rate/es/Rate';

interface Props extends RateProps {
  label?: string;
  precision?: number;
}

export function Rate(props: Props) {
  const { value, className = '', precision } = props;
  const cls = 'rate-wrapper ' + className || '';
  return (
    <Rating
      name="size-small"
      readOnly
      className={cls}
      value={value}
      precision={precision}
      style={{ color: '#fda399' }}
    />
  );
}

export default function RateContainer(props: Props) {
  const { label, ...others } = props;
  return (
    <div className="rate-container">
      {label ? <div className="rate-container-label">{label}</div> : null}
      <Rate {...others} />
    </div>
  );
}
