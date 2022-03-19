import { useRef, useState } from 'react';
import { getSmsCode } from '@/services/orders';
import { genAgl } from '@/lib/fcagl';

export function useCaptcha(values: any) {
  const [second, setSecond] = useState<number>();
  const [message, setMessage] = useState<string>();
  const timerRef = useRef<NodeJS.Timeout>();
  const handleGetSmsCode = () => {
    if (!values?.contact_mobile) {
      alert('请输入手机号');
      return;
    }
    getSmsCode({ phone: values?.contact_mobile })
      .then(() => {
        startClock();
        genAgl();
        setMessage('短信下发成功');
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      })
      .catch(({ data }) => {
        setMessage(data.error ?? 'Error');
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      });
  };

  const startClock = () => {
    setSecond(60);
    timerRef.current = setInterval(() => {
      setSecond(s => {
        if (s === undefined) return s;
        if (s - 1 < 0) {
          timerRef.current && clearInterval(timerRef.current);
          return undefined;
        }
        return s - 1;
      });
    }, 1e3);
  };
  const reset = () => {
    timerRef.current && clearInterval(timerRef.current);
    setSecond(undefined);
    setMessage(undefined);
  };
  return {
    second,
    handleGetSmsCode,
    message,
    reset,
  };
}
