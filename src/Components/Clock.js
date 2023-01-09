import React, { useEffect, useState } from "react";

function Clock() {
  const [date, setDate] = useState(new Date());
  const [reminder, setReminder] = useState("Nothing to remind.");
  const [formValues, setFormValues] = useState({
    timer: null,
    note: null,
  });
  const [reminderList, setReminderList] = useState([]);

  const currentTime = date.toLocaleTimeString().split(":");
  const hour = currentTime[0];
  const minutes = currentTime[1];
  const seconds = currentTime[2];

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const remindMePlease = () => {
    if((!formValues.timer )&&(formValues.note!=="" || !formValues.note )){
        alert("Please fill all fields!")
    }else{
        let copyList = [...reminderList];
        let formTimer = formValues.timer.split(":");
        let convertedHour =
          formTimer[0] * 1 > 12 ? formTimer[0] * 1 - 12 : formTimer[0];
        const params = {
          hours: convertedHour?.toString(),
          min: formTimer[1],
          note: formValues.note,
        };
    
        copyList.push(params);
        setReminderList([...copyList]);
        setFormValues({
          timer: "",
          note: "",
        });
        alert("Success!")
    }
  };

  useEffect(() => {
    const filterTime = reminderList.findIndex(
      (data) => data.hours === hour && data.min === minutes
    );

    if (filterTime >= 0) {
      setReminder(reminderList[filterTime].note);
    }
  }, [hour, minutes, reminderList]);

  return (
    <div className="flex flex-col gap-10 justify-center w-full h-full items-center text-center">
      <div className="flex flex-row gap-5">
        <div className="text-8xl bg-white/60 p-5 rounded-md">{hour}</div>
        <div className="text-8xl ">:</div>
        <div className="text-8xl bg-white/70 p-5 rounded-md">{minutes}</div>
        <div className="text-8xl ">:</div>
        <div className="text-8xl bg-white/70 p-5 rounded-md">{seconds}</div>
      </div>
      <div className="text-5xl bg-white/60 p-5 rounded-md">{reminder}</div>
      <div className="flex flex-col gap-2">
        <input
          type="time"
          value={formValues.timer}
          onChange={(e) =>
            setFormValues({ ...formValues, timer: e.target.value })
          }
        />
        <input
          type="text"
          value={formValues.note}
          onChange={(e) =>
            setFormValues({ ...formValues, note: e.target.value })
          }
        />
        <button
          onClick={() => remindMePlease()}
          className="bg-[#3A2315] p-2 text-white rounded-md"
        >
          Remind me!
        </button>
      </div>
    </div>
  );
}

export default Clock;
