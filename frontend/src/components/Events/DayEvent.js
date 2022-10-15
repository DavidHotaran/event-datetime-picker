import { useState } from "react";

export default function DayEvent() {
    const [startTime, setStartTime] = useState('8 am');
    const [endTime, setEndTime] = useState('12 pm');
    const hours = ['8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm'];

    return (
        <>
            <div className="mb-2">
                <label>Choose start time</label>
                <select
                    className="text-black rounded-md p-1 ml-2"
                    onChange={(e) => setStartTime(e.target.value)}
                    value={startTime}
                >
                    {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                </select>
                {hours.indexOf(startTime) > hours.indexOf(endTime) && (
                    <span className="ml-4 text-red-500">Start time cannot be after end time!</span>
                )}
            </div>
            <div className="mb-2">
                <label>Choose end time</label>
                <select
                    className="text-black rounded-md p-1 ml-3"
                    onChange={(e) => setEndTime(e.target.value)}
                    value={endTime}
                >
                    {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                </select>
                {hours.indexOf(endTime) < hours.indexOf(startTime) && (
                    <span className="ml-4 text-red-500">End time cannot be before start time!</span>
                )}
            </div>
            <div className="bg-gray-400 w-96 rounded-md">
                <div className="border-2 border-black rounded-t-md py-2 text-center">Day Event</div>
                {Array.from({ length: (hours.indexOf(endTime) - hours.indexOf(startTime) + 1) }).map((hour, idx) => {
                    return <div key={hour} className="border-2 border-black py-2 bg-gray-700">{hours[hours.indexOf(startTime) + idx]}</div>
                })}
            </div>
        </>
    );
};