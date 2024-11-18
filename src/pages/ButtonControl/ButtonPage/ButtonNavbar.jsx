import Button from '../../../components/Forms/Button';
import { GiMove } from 'react-icons/gi';
import { FaPlus } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
const ButtonNavbar = ({ toggleButtonSidebar, showButtonSidebar }) => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleShowMenu = () => {
        console.log('showButtonSidebar', showButtonSidebar);
        setShowMenu(!showMenu);
    };

    const buttons = [
        {
            id: 1,
            name: 'حذف',
            icon: <MdDelete />,
        },
        {
            id: 2,
            name: 'تحريك وتثبيت',
            icon: <GiMove />,
        },
        {
            id: 3,
            name: 'زياده العدد',
            icon: <FaPlus />,
        },
        {
            id: 4,
            name: 'كتابه',
            icon: <FaPenToSquare />,
        },
        {
            id: 5,
            name: 'القياسات',
            icon: <AiOutlineFullscreen />,
        },
    ];

    return (
        <>
            <nav className="bg-gray-800 text-white p-4 flex justify-between w-full items-center">
                <div className="">
                    {!showButtonSidebar && (
                        <button onClick={toggleButtonSidebar} className="text-white">
                            <AiOutlineMenu size={25} />
                        </button>
                    )}
                </div>

                <div className="container mx-auto xl:flex items-center justify-end gap-8 2xsm:hidden ">
                    <ul className="flex gap-4">
                        {buttons.map((button, index) => (
                            <li key={index}>
                                <Button name={button.name} icon={button.icon}
                                />
                            </li>
                        ))}
                    </ul>

                    <h1 className="text-xl font-bold">الرئيسيه للتحكم</h1>
                </div>

                <div className="relative">
                    <div className="xl:hidden lg:flex items-center justify-end">
                        <button
                            onClick={toggleShowMenu}
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            class="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                            type="button"
                        >
                            Dropdown button{' '}
                            <svg
                                class="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                    </div>
                    {showMenu && (
                        <div
                            id="dropdown"
                            className="xl:hidden lg:flex z-10 absolute right-0 mt-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-700"
                        >
                            <ul
                                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownDefaultButton"
                            >
                                {buttons.map((button, index) => (
                                    <li className="p-2" key={index}>
                                        <Button name={button.name} icon={button.icon} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default ButtonNavbar;
