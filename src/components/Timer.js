import React, { useState, useEffect } from "react";

const Timer = ({ cycle, onTimerDone }) => {
  const [time, setTime] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let one_minute_timeout;

    if (time === cycle[index]) {
      setTime(0);

      if (index < cycle.length - 1) {
        return setIndex(index + 1);
      } else {
        //index has reached the last element of array cycle
        onTimerDone();
      }
    } else {
      one_minute_timeout = setTimeout(() => {
        if (time < cycle[index]) {
          setTime(time + 1);
        }
      }, 60000);
    }

    return () => {
      clearTimeout(one_minute_timeout);
    };
  }, [time, index, cycle]);

  return (
    <div className="ticker" data-testid="timer">
      <div className="minutes-done">
        <span className="timer-line-1" id="count-up">
          {time}
        </span>
      </div>
      <div className="timer-line-2 total-minutes">
        of {cycle[index]} minutes
      </div>
      <div className="info">
        <p className="">Rep {Math.floor(index / 2) + 1} : &nbsp;</p>
        <p className="">{index % 2 === 0 ? "Working" : "Break time!"}</p>
      </div>
    </div>
  );
};
export default Timer;
