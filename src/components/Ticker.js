import React, { useState, useEffect, useReducer, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Timer from "./Timer";
import ConditionalButton from "./presentation/ConditionalButton";
import DisplaySet from "./presentation/DisplaySet";
import DisplayModal from "./presentation/DisplayModal";
import FavoritesDropdownButton from "./presentation/FavoritesDropdownButton";
import tickerReducer from "../reducers/ticker";
import initialState from "../initialState";

const getCycle = (work, shortBreak, break2) => {
  const arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push(work);
    arr.push(shortBreak);
  }
  let lastIndex = arr.length - 1;
  arr[lastIndex] = arr[lastIndex] + break2;

  return arr;
};

const Ticker = () => {
  const [ticker, dispatchTicker] = useReducer(tickerReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  let location = useLocation();
  let calculatedCycle = useMemo(
    () => getCycle(ticker.work, ticker.shortBreak, ticker.break2),
    [ticker.work, ticker.shortBreak, ticker.break2]
  );
  console.log("computed cycle :", calculatedCycle);

  function checkInputValidity(value, actionType) {
    if (!Number.isNaN(value)) {
      dispatchTicker({
        type: actionType,
        data: parseInt(value),
      });
    }
  }

  useEffect(() => {
    if (location.data) {
      // changed values in Settings tab

      checkInputValidity(location.data.work, "SET_WORK");
      checkInputValidity(location.data.shortBreak, "SET_SHORT_BREAK");
      checkInputValidity(location.data.break2, "SET_BREAK");
      if (location.data.save) {
        dispatchTicker({
          type: "SAVE_TO_FAVORITES",
        });
      }
    }
  }, [location.data]);

  useEffect(() => {
    window.localStorage.setItem("fav", JSON.stringify(ticker.favorites));
  }, [ticker.favorites]);

  const onStartClick = () => {
    dispatchTicker({
      type: "START",
    });
  };

  const onResetClick = () => {
    dispatchTicker({
      type: "RESET",
    });
  };

  const onFavClick = (item) => {
    dispatchTicker({
      type: "CHANGE_TO_SELECTED_FAVORITE",
      data: item,
    });

    dispatchTicker({
      type: "RESET",
    });
  };

  let deleteFav = () => {
    dispatchTicker({
      type: "DELETE_FROM_FAVORITES",
      data: deleteIndex,
    });
    setShowModal(false);
    setDeleteIndex(null);
  };

  const confirmModal = (index) => {
    setShowModal(true);
    setDeleteIndex(index);
  };

  const onTimerDone = () => {
    console.log("Pomodoro done");

    dispatchTicker({ type: "TIMER_END" });
  };

  return (
    <div className="content">
      {showModal && <DisplayModal setShow={setShowModal} onYes={deleteFav} />}

      <div className="text-center">
        <div className="controls">
          <DisplaySet
            work={ticker.work}
            shortBreak={ticker.shortBreak}
            break2={ticker.break2}
          />

          <div className="row center-jc buttons-row">
            <ConditionalButton
              condition={!ticker.startClicked}
              name="Start"
              onClick={onStartClick}
            />

            <ConditionalButton
              condition={ticker.startClicked && !ticker.done}
              name="Cancel"
              onClick={onResetClick}
            />

            <ConditionalButton
              condition={ticker.done}
              name="Reset"
              onClick={onResetClick}
            />

            {!ticker.startClicked && ticker.favorites.length !== 0 && (
              <FavoritesDropdownButton
                favorites={ticker.favorites}
                onFavClick={onFavClick}
                onClose={confirmModal}
              />
            )}
          </div>
        </div>
        <div className="">
          {ticker.done ? (
            <div>Done</div>
          ) : ticker.startClicked ? (
            <Timer cycle={calculatedCycle} onTimerDone={onTimerDone} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Ticker;
