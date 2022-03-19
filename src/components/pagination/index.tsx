/**
 *  Created by pw on 2020/12/5 12:49 下午.
 */
import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import './index.less';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export interface Props {
  count: number;
  total_count?: number;
  onPageChange: (page: number) => void;
}

export default function PaginationRounded(props: Props) {
  const { count, onPageChange, total_count } = props;
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (onPageChange) {
      onPageChange(value);
    }
  };
  return (
    <div className={`${classes.root} pagination-wrapper`}>
      {total_count ? (
        <span className="total_count">{`共${total_count}条`}</span>
      ) : null}
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
