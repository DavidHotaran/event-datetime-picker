import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';

export default function Navbar() {
    const token = localStorage.getItem("token");
    const userName = JSON.parse(localStorage.getItem("userName"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate('/', { replace: true });
    };

    return (
        <div className="bg-slate-400 flex justify-between px-9 py-4 items-center">
            <Link
                linkTo={'/'}
                linkText={"EventMe"}
                linkStyle={'text-2xl'}
            />
            <div className='flex'>
                {token
                    ? (
                        <>
                            <Link
                                linkTo={'account/overview'}
                                linkText={userName}
                                linkStyle={'pr-2'}
                                icon={<PersonCircle className="mr-1 w-6 h-6" />}
                            />
                            <div className="cursor-pointer hover:text-slate-800 font-bold" onClick={handleLogout}>logout</div>
                        </>
                    )
                    : (
                        <>
                            <Link
                                linkTo={'login'}
                                linkText={"Login"}
                                linkStyle={'pr-2'}
                            />
                            <Link
                                linkTo={'signup'}
                                linkText={"Signup"}
                                linkStyle={'pr-2'}
                            />
                        </>
                    )
                }
            </div>
        </div>
    );
};

function Link({ linkTo, linkText, linkStyle = "", icon }) {
    return (
        <div className={`hover:text-slate-800 font-bold ${linkStyle} flex`}>
            {icon}
            <NavLink
                to={linkTo}
                className={({ isActive }) =>
                    isActive ? "text-slate-800" : ""
                }
            >
                {linkText}
            </NavLink>
        </div>
    );
};