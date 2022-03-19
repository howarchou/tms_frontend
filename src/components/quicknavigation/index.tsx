/**
 *  Created by pw on 2020/11/14 3:37 下午.
 */
import React, { useContext, useState } from 'react';
import './index.less';
import DEMAND_ICON from '@/images/quick/demand.png';
import CALL_ICON from '@/images/quick/call-phone.png';
import BACK_TOP_ICON from '@/images/quick/back-top.png';
import {
  Dialog,
  Fade,
  Tooltip,
  Typography,
  WithStyles,
} from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import SubmitDialog from '@/components/submitDialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Demand from '@/components/demand';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { AppContext } from '@/pages/layout';
import { AppActionType } from '@/reducer/appReducer';

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#E94E38',
    boxShadow: theme.shadows[1],
    fontSize: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    '& ul': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    '& li': {
      lineHeight: 2.5,
      paddingLeft: 10,
      paddingRight: 10,
      '&:first-child': {
        borderBottom: '1px solid #eee',
      },
    },
  },
}))(Tooltip);

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const PhoneComp = () => {
  return (
    <ul>
      <li>北京：18511901760</li>
      <li>上海：021-65667525</li>
    </ul>
  );
};
export default function() {
  // const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const [submitSuccessOpen, setSubmitSuccessOpen] = useState(false);
  const handleClickOpen = () => {
    // setOpen(true);
    dispatch({
      type: AppActionType.OpenSign,
      payload: {
        showSign: true,
      },
    });
  };

  const handleClose = () => {
    // setOpen(false);
    dispatch({
      type: AppActionType.OpenSign,
      payload: {
        showSign: false,
      },
    });
  };

  const handleScrollToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  const handleSubmitSuccessOpen = () => {
    setSubmitSuccessOpen(true);
  };

  const handleSubmitSuccessClose = () => {
    handleClose();
    setSubmitSuccessOpen(false);
  };

  return (
    <div className="quick-navigation">
      <ul>
        <li className="quick-li" onClick={handleClickOpen}>
          <img className="quick-icon" src={DEMAND_ICON} />
          <span className="quick-li-text">提需求</span>
        </li>
        <LightTooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          leaveDelay={500}
          title={<PhoneComp />}
          placement={'left'}
        >
          <li className="quick-li">
            <img className="quick-icon" src={CALL_ICON} />
            <span className="quick-li-text">联系电话</span>
          </li>
        </LightTooltip>
        <li className="quick-li" onClick={handleScrollToTop}>
          <img className="quick-icon" src={BACK_TOP_ICON} />
          <span className="quick-li-text">返回顶部</span>
        </li>
      </ul>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={state.showSign}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          提需求
        </DialogTitle>
        <DialogContent dividers>
          <Demand onSuccess={handleSubmitSuccessOpen} />
        </DialogContent>
      </Dialog>
      <SubmitDialog
        close={handleSubmitSuccessClose}
        open={submitSuccessOpen}
      ></SubmitDialog>
    </div>
  );
}
