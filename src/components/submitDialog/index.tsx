import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './index.less';
import { makeStyles } from '@material-ui/core';
import { NOOP } from '@/lib/Conts';

interface SubmitDialogProps {
  open: boolean;
  onClose?: (value: string) => void;
  close: () => void;
}

const useStyles = makeStyles({
  fontSizeLarge: {
    fontSize: 50,
  },
});

export default function SubmitDialog(props: SubmitDialogProps) {
  const { open, onClose = NOOP, close } = props;
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="submit-dialog">
        <CheckCircleIcon
          classes={{
            fontSizeLarge: classes.fontSizeLarge,
          }}
          style={{ color: '#D85743' }}
          fontSize="large"
        />
        <p className="title">提交已成功</p>
        <p className="desc">稍后有团建策划师与您沟通细化需求定制方案</p>
        <Button
          variant="contained"
          size="medium"
          style={{ backgroundColor: '#CA3B48', color: '#fff' }}
          onClick={close}
        >
          返回
        </Button>
      </div>
    </Dialog>
  );
}
