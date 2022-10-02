import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (userData.email === '' || userData.password === '') {
            setError(true);
            return;
        };

        try {
            const data = await fetch("http://localhost:5000/api/user/login", {
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

            localStorage.setItem("token", JSON.stringify(tokenOrError.token));
            localStorage.setItem("userName", JSON.stringify(tokenOrError.userName));
            navigate('/account/overview', {replace: true})

        } catch (e) {
            console.log(e);
        };
    };


    return (
        <div>
            <form className="flex flex-col w-72 align-center justify-center h-[80vh] mx-auto" onSubmit={handleSubmit}>
                {error && <div className='text-red-500 font-bold text-lg text-center'>Please fill out ALL fields.</div>}
                <label className='mt-2 mb-[-8px]'>Email</label>
                <input className="mt-3 text-black rounded-md border-2 px-3 py-1 border-solid border-gray-300 focus:border-blue-700 focus:outline-none"
                    type='text'
                    placeholder='Enter email'
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <label className='mt-2 mb-[-8px]'>Password</label>
                <input className="mt-3 text-black rounded-md border-2 px-3 py-1 border-solid border-gray-300 focus:border-blue-700 focus:outline-none"
                    type='password'
                    placeholder='Enter password'
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
                <input className="mt-6 py-1 border rounded-md hover:bg-slate-400 hover:text-black cursor-pointer"
                    type='submit'
                />
                <div className='mt-8 text-center'>
                    <hr />
                    <p className='mt-2'>Don't have an account? <span className='text-slate-400 hover:text-white cursor-pointer' onClick={() => navigate("/signup")}>Sign up!</span></p>
                </div>
            </form>
        </div>
    );
}