import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function PageWrapper() {
    return (
        <div className="min-h-screen bg-slate-700 text-white">
            <Navbar/>
            <Outlet/>
        </div>
    )
}