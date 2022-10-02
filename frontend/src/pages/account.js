import { Outlet, NavLink } from "react-router-dom";
import {PersonCircle, CalendarEvent, PlusSquare} from 'react-bootstrap-icons';

export default function Account() {
    return (
        <>
            <div className="flex">
                <div className="fixed top-[65px] left-0 h-full w-40 bg-slate-800">
                    <div className='flex flex-col items-center'>
                        <Link
                            linkText={"Account"}
                            linkTo={'overview'}
                            icon={<PersonCircle className="mr-3"/>}
                        />
                        <Link
                            linkText={"New Event"}
                            linkTo={'new-event'}
                            icon={<PlusSquare className="mr-3"/>}
                        />
                        <Link
                            linkText={"View Events"}
                            linkTo={'user-events'}
                            icon={<CalendarEvent className="mr-3"/>}
                        />
                    </div>
                </div>
                <div className="flex flex-col ml-40 bg-gray-700 h-[90vh] overflow-y-auto w-full items-center">
                    <div className="border-2 rounded w-11/12 my-3 px-3 py-3">
                        <Outlet />
                    </div>
                </div>
            </div></>
    );
};

function Link({ linkTo, linkText, linkStyle = "", icon }) {
    return (
        <div className={`hover:text-slate-400 font-bold ${linkStyle} my-4 flex items-center w-full px-4`}>
            {icon}
            <NavLink
                to={linkTo}
                className={({ isActive }) =>
                    isActive ? "text-slate-400" : ""
                }
            >
                {linkText}
            </NavLink>
        </div>
    );
};