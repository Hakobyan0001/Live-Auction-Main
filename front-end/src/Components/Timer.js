import React from "react";
import Countdown from "react-countdown";
import { Typography } from "antd";
import "./styles/components.css";
const { Title } = Typography;

const Timer = ({ endDate }) => {
  let currentDate = new Date();
  let endDateTime = new Date(endDate);
  return (
    <div className="timer">
      {endDateTime <= currentDate ? (
        <span>Auction is over!</span>
      ) : (
        <>
          <Title style={{ margin: "0px" }} level={5}>
            Time remaining:
          </Title>
          <Countdown
            date={endDate}
            renderer={({ days, hours, minutes, seconds }) => {
              return (
                <span>
                  {days}d {hours}h {minutes}m {seconds}s
                </span>
              );
            }}
          />
        </>
      )}
    </div>
  );
};
export default Timer;
