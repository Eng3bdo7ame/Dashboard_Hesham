import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ButtonSidebar from './ButtonSidebar'
import ButtonNavbar from './ButtonNavbar'
import ButtonArea from './ButtonArea'
export default function Layout() {
    const [showButtonSidebar, setShowButtonSidebar] = useState(true);


    const toggleButtonSidebar = () => {
        console.log('showButtonSidebar', showButtonSidebar);
        setShowButtonSidebar(!showButtonSidebar)
    }

    useEffect(() => {
        console.log('showButtonSidebar', showButtonSidebar);
    }, [toggleButtonSidebar])



    return (
        <div className="flex h-screen overflow-hidden bg-gray-900">
            <ButtonSidebar
                toggleButtonSidebar={toggleButtonSidebar}
                showButtonSidebar={showButtonSidebar}
                setShowButtonSidebar={setShowButtonSidebar}
            />
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <ButtonNavbar
                    toggleButtonSidebar={toggleButtonSidebar}
                    showButtonSidebar={showButtonSidebar}
                    setShowButtonSidebar={setShowButtonSidebar}
                />
                <div className="flex-1 p-6">
                    <ButtonArea />
                </div>
            </div>
        </div>
    );
}
