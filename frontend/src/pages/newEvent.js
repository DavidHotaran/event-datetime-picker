import DayEvent from "../components/Events/DayEvent";
import WeekEvent from "../components/Events/WeekEvent";
import MonthEvent from "../components/Events/MonthEvent";
import { useState } from 'react';

export default function NewEvent() {
    const [eventType, setEventType] = useState('Day');
    const [participants, setParticipants] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const names = e.target.value.split(',').map(val => val.trim());
        setParticipants([...names]);
    };

    const handleClick = () => {
        if (participants.length === 0) {
            setErrorMessage("You need to list participants, cannot be blank!");
            return;
        } else {
            setErrorMessage(null);
        };
    };

    return (
        <>
            <h1 className="text-4xl text-center font-semibold underline underline-offset-4 mb-6">New Event</h1>
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div>
                        <label>Choose event type</label>
                        <select className="text-black rounded-md p-1 ml-2 mb-2" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                            <option value={'Day'}>Day Event</option>
                            <option value={'Week'}>Week Event</option>
                            <option value={'Month'}>Month Event</option>
                        </select>
                    </div>
                    {eventType === 'Day' ? <DayEvent /> : eventType === 'Week' ? <WeekEvent /> : <MonthEvent />}
                </div>
                <div className="flex flex-col ml-20 items-center w-min">
                    <h3 className="text-center mb-1">Enter participants email, comma separated</h3>
                    <textarea
                        className={`text-black rounded-md p-1 ${errorMessage && 'border-red-500 border-4'}`}
                        rows={4}
                        cols={40}
                        onChange={handleChange}
                        >
                    </textarea>
                        {errorMessage && <span className="text-red-500 ">{errorMessage}</span>}
                    <button
                        className="text-green-500 border-green-600 border-2 
                        font-bold w-fit min-w-[150px] cursor-pointer rounded-md p-1 mt-2 ml-auto
                      hover:text-white hover:bg-green-500"
                      onClick={handleClick}
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};