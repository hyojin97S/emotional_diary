import React, { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
// import Editor from '../components/Editor';
import { DiaryStateContext } from '../App';
import { getMonthRangeByDate } from '../util';
import DiaryList from '../components/DiaryList';

const Home = () => {
  const data = useContext(DiaryStateContext);

  const [pivotDate, setPivotDate] = useState(new Date());
  const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`

  const [filteredDate, setFilteredData] = useState([]);
  
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  useEffect(() => {
    if(data.length >= 1) {
      const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
      setFilteredData(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [data, pivotDate]);
  
  return (
    <div>
      {/* <Editor 
        initData={{
          date : new Date().getTime(),
          emotionId : 1,
          content : "이전에 작성했던 일기"
        }}
        onSubmit={() => alert("작성 완료")}
      /> */}
      <Header
        title={headerTitle}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
        rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
      />
      <DiaryList data={filteredDate} />
    </div>
  );
};

export default Home;