import React, { useState } from 'react';
import { FilterPanelItemProps } from '../../types';

/**
 * 多选组件
 * @param props
 * @returns
 */
export default (props: FilterPanelItemProps) => {
  const { title, initialValue, tags = [], hasMore, dispatch } = props;
  const [defaultTag] = tags;
  let initTags;
  if (typeof initialValue === 'string') {
    initTags = initialValue.split(' ').map(x => Number(x));
  } else if (typeof initialValue === 'number') {
    initTags = [initialValue];
  } else {
    initTags = [defaultTag.value];
  }
  console.log('初始的多选参数是:', initTags);
  const [selectTags, setSelectTags] = useState(new Set(initTags));
  const handleTagClick = (value: number | null) => {
    // 不限
    if (value === null) {
      selectTags.clear();
      selectTags.add(null);
    } else {
      // 全部
      selectTags.delete(null);
    }
    if (selectTags.has(value)) {
      // 取消
      value !== null && selectTags.delete(value);
      setSelectTags(selectTags);
    } else {
      // 添加
      setSelectTags(selectTags.add(value));
    }
    console.log('更新多选', selectTags);
    dispatch({
      type: 'UPDATE',
      payload: {
        profits: Array.from(selectTags).join(' '),
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
          const cls = selectTags.has(tag.value) ? 'select-tag' : '';
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
