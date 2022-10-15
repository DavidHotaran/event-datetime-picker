import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserOverview() {
    const naviagte = useNavigate();
    const [userData, setUserData] = useState({
        userName: JSON.parse(localStorage.getItem("userName")),
        password: "",
        email: ""
    });

    const handleDeleteAccount = async () => {
        try {
            const data = await fetch("http://localhost:5000/api/user/", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const tokenOrError = await data.json();

            if (tokenOrError.error !== '') {
                console.log("ERROR", tokenOrError.error);
                return;
            };

            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            naviagte('/', { replace: true });

        } catch (e) {
            console.log(e);
        };
    };

    const handleUpdateAccount = async () => {
        try {
            const data = await fetch("http://localhost:5000/api/user/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const tokenOrError = await data.json();

            if (tokenOrError.error !== '') {
                console.log("ERROR", tokenOrError.error);
                return;
            };

        } catch (e) {
            console.log(e);
        };
    };

    useEffect(() => {
        let ready = true;
        const fetchData = async () => {
            const rawData = await fetch("http://localhost:5000/api/user/", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
            });
            const data = await rawData.json();

            if (ready) {
                setUserData(data);
            };
        };

        // fetchData();
        return () => ready = false;
    }, []);

    return (
        <div className="flex flex-col w-72 mx-auto">
            <h1 className="text-center font-bold text-2xl">Account Overview</h1>
            <label className='mt-2 mb-[-8px]'>Username</label>
            <input className="mt-3 text-black rounded-md border-2 px-3 py-1 border-solid border-gray-300 focus:border-blue-700 focus:outline-none"
                type='text'
                value={userData.userName}
                onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
            />
            <label className='mt-2 mb-[-8px]'>Email</label>
            <input className="mt-3 text-white rounded-md border-2 px-3 py-1 border-solid border-gray-300 focus:border-blue-700 focus:outline-none"
                type='text'
                disabled
                value={userData.email}
            />
            <label className='mt-2 mb-[-8px]'>Password</label>
            <input className="mt-3 text-black rounded-md border-2 px-3 py-1 border-solid border-gray-300 focus:border-blue-700 focus:outline-none"
                type='password'
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <button
                className="text-green-500 border-green-600 border-2 
                font-bold w-fit min-w-[150px] cursor-pointer rounded-md p-1 mt-4
               hover:text-white hover:bg-green-500"
                onClick={handleUpdateAccount}
            >
                Update Account
            </button>
            <button
                className="text-red-500 border-red-600 border-2 
                font-bold w-fit min-w-[150px] cursor-pointer rounded-md p-1 mt-4
               hover:text-white hover:bg-red-500"
                onClick={handleDeleteAccount}
            >
                Delete Account
            </button>
        </div>
    );
};