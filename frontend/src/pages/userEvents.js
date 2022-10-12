import { useState, useEffect } from 'react';
import { Trash } from 'react-bootstrap-icons';

export default function AllUserEvents() {
    const [events, setEvents] = useState(null);

    const handleDelete = async (id) => {
        const data = await fetch(`http://localhost:5000/api/event/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        });

        const { message, error } = await data.json();

        if (error) {
            console.log(error);
            return;
        };

        setEvents(events.filter(event => event._id !== id));
        alert(message);
    };

    useEffect(() => {
        let ready = true;
        const fetchData = async () => {
            const data = await fetch("http://localhost:5000/api/event", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
            });
            const { events, error } = await data.json();

            if (error) {
                console.log(error);
                return;
            };

            if (ready) {
                setEvents(events);
            };
        };

        fetchData();
        return () => ready = false;
    }, []);


    if (events === null) return null;

    return (
        <div className="flex flex-col w-80 mx-auto">
            <div className='mt-12'>
                <h2 className="text-center font-bold text-2xl">Events Created</h2>
                {events && events.map(event => {
                    return (
                        <div className='flex items-center justify-center'>
                            <div
                                key={event.title}
                                className='border-2 p-2 mt-2 rounded hover:bg-slate-400 hover:text-black cursor-pointer text-center'
                            >
                                {event.title}
                            </div>
                            <Trash
                                onClick={() => handleDelete(event._id)}
                                fill='rgb(239, 68, 68)'
                                className='ml-2 mt-2 cursor-pointer w-6 h-6 hover:scale-125'
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};