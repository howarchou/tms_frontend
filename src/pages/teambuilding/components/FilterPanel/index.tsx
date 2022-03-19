import React, { useState } from 'react';
import { FilterPanelItemProps } from '../../types';

export default (props: FilterPanelItemProps) => {
  const { title, tagKey, tags = [], hasMore, dispatch, initialValue } = props;
  const [defaultTag] = tags;
  const [selectTag, setSelectTag] = useState<number | null>(
    initialValue || defaultTag.value,
  );
  const handleTagClick = (value: number | null) => {
    setSelectTag(value);
    console.log('更新', tagKey, value);
    dispatch({
      type: 'UPDATE',
      payload: {
        [tagKey]: value,
      },
    });
    dispatch({
      type: 'FETCH',
      payload: {},
    });
  };

  return (
    <div className="filter-panel-item">
      <div className="title">{title}</div>
      <div className="filter-panel-item-wrapper">
        {tags.map(tag => {
          const cls = tag.value === selectTag ? 'select-tag' : '';
          return (
            <span
              key={tag.value}
              className={`tag ${cls}`}
              onClick={() => handleTagClick(tag.value)}
            >
              {tag.text}
            </span>
          );
        })}
      </div>
      {hasMore ? <div className="more">展开更多</div> : null}
    </div>
  );
};
