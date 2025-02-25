import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './DiaryList.scss';
import React, { useEffect, useState } from 'react';
import DiaryItem from './DiaryItem';

const sort0ptionList = [
  {value : "latest", name : "최신순"},
  {value : "oldest", name : "오래된 순"}
];

const DiaryList = ({data}) => {
  const [sortType, setSortType] = useState("latest");
  const [sortedData, setSortData] = useState([]);

    const onChangeSortType = (e) => {
      setSortType(e.target.value);
    };

    const navigate = useNavigate();

    const onClickNew = () => {
      navigate("/new");
    };
  
    useEffect(() => {
      const compare = (a,b) => {
        if(sortType === "latest") {
          return Number(b.date) - Number(a.date);
        } else {
          return Number(a.date) - Number(b.date);
        }
      };
      const copyList = JSON.parse(JSON.stringify(data));
      copyList.sort(compare);
      setSortData(copyList);
    }, [data, sortType]);
    
  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <select value={sortType} onChange={onChangeSortType}>
            {sort0ptionList.map((it, idx) => (
              <option key={idx} value={it.value}>
                {it.name}
              </option>
            ))}
          </select>
        </div>
          <div className='right_col'>
            <Button 
            type={"positive"} 
            text={"새 일기 쓰기"}
            onClick={onClickNew}
            />
          </div>
      </div>
      <div className='list_wrapper'>
        {sortedData.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  )
}

export default DiaryList;