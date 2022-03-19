import React, { useEffect, useState } from 'react';
import { FilterPanelItemProps } from '../../types';

/**
 * 城市组件
 * @param props
 * @returns
 */
export default (props: FilterPanelItemProps) => {
  const { title, tagKey, tags = [], hasMore, dispatch, initialValue } = props;
  const [defaultTag] = tags;
  const [hasInit, setHasInit] = useState(false);
  const [area, setArea] = useState<number | null>(initialValue);
  useEffect(() => {
    // 有area, 要通过area找city
    if (!hasInit && initialValue && tags.length > 1) {
      const initialCity = tags.find(city =>
        city.items?.find(area => area.value === initialValue),
      );
      setSelectTag(initialCity ? initialCity.value : defaultTag.value);
      setHasInit(true);
    }
  }, [tags]);

  const [selectTag, setSelectTag] = useState(defaultTag.value);
  // 城市
  const currentTag = tags.find(t => t.value === selectTag);
  console.log(currentTag);
  const handleTagClick = (value: number | null) => {
    setSelectTag(value);
    // 选不限要把area的参数清空
    if (value === null) {
      dispatch({
        type: 'UPDATE',
        payload: {
          area: null,
        },
      });
    } else {
      dispatch({
        type: 'UPDATE',
        payload: {
          province: value,
          area: null,
        },
      });
    }
    dispatch({
      type: 'FETCH',
      payload: {},
    });
  };
  const handleAreaClick = (value: number | null) => {
    setArea(value);
    dispatch({
      type: 'UPDATE',
      payload: {
        area: value,
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
          const cls = selectTag === tag.value ? 'select-tag' : '';
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
        {currentTag?.items ? (
          <div>
            {currentTag.items.map(tag => (
              <span
                key={tag.value}
                className={`tag ${area === tag.value ? 'select-tag' : ''}`}
                onClick={() => handleAreaClick(tag.value)}
              >
                {tag.text}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {hasMore ? <div className="more">展开更多</div> : null}
    </div>
  );
};
