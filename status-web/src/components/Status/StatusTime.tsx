import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface TimeProps {
  time: number;
}

const TimeWrapper = styled.div`
  width: 100%;
  color: #858585;
  font-weight: 500;
`;

const Timer: React.FC<TimeProps> = (props: TimeProps) => {
  const { time } = props;
  const dateNow = new Date();
  const [date, setDate] = useState('');

  const isSameDay = (dateA: Date, dateB: Date) => {
    return dateA.toDateString() === dateB.toDateString();
  }

  const returnDateString = (compareDate: Date) => {
    if(isSameDay(compareDate, dateNow)) {
      return 'Last updated today';
    }

    const dateArray = compareDate.toDateString().split(' ');
    return `Last updated ${dateArray[2]} ${dateArray[1]}`;
  };

  const returnTimeString = (date: Date) => {
    let hours = date.getHours();
    let mins = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // set to 12 hours
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    // add 0 padding to mins
    const minStr = mins < 10 ? '0' + mins : mins;

    // get timezone
    const timezoneOffset = date.getTimezoneOffset() / -60;
    const timezone = timezoneOffset < 0 ? timezoneOffset : '+' + timezoneOffset;

    return `${hours}:${minStr} ${ampm} ${timezone}`;
  }

  useEffect(() => {
    const fetchedDate = new Date(time);
    const dateString = returnDateString(fetchedDate);
    const timeString = returnTimeString(fetchedDate);
    setDate(`${dateString}, ${timeString}.`);
  }, []);
  
  return (
    <TimeWrapper>
      <p>{date}</p>
    </TimeWrapper>
  );
}

export default Timer;
