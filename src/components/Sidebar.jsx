import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [activeSidebar, setActiveSidebar] = useState(true);
    const [displayAccordion, setDisplayAccordion] = useState(true);

    const active = () => {
        if (activeSidebar) {
            setActiveSidebar(false);
        } else {
            setDisplayAccordion(true);
            setActiveSidebar(true);
        }
    }

    const activeAcordeon = () => {
        if (displayAccordion) {
            setDisplayAccordion(false);
        } else {
            setDisplayAccordion(true);
        }
    }

    return (
        <div id='sidebar' className={activeSidebar ? null : 'activeSidebar'}>
            <div className='toggle-btn' onClick={active}>
                <i className={`fa-solid ${activeSidebar ? "fa-toggle-on" : "fa-toggle-off"} bx-sm  btn-arrow bx-rotate-90`}></i>
            </div>

            <ul className={activeSidebar ? "active" : null}>
                {/* <p className='txt3'>Alex Patron Garcia </p>
                <p className='txt4'>Alex Patron Garcia </p>
                <p className='txt5'>Alex Patron Garcia </p> */}
                <li className={`${activeSidebar ? "active" : null}`} >

                    <div className={`accordion-item  linkStyleSid ${displayAccordion ? null : "activeAcord"}`} >
                        <i className="fa-solid fa-file-invoice bx-fw" ></i>

                        <span className={`accordion-header ${activeSidebar ? "activeText" : null}`} onClick={activeAcordeon}>
                            Closeouts {" "}
                            <i className={`fa-solid fa-angle-${displayAccordion ? "down" : "up"} bx-xs bx-fw`}></i>
                        </span>

                        <div className={`accordion-content ${activeSidebar ? "activeText" : null}`}>
                            <Link className='linkStyleSid' to={"/closeoutsVeh"} onClick={active}>
                                <i className="fa-solid fa-route bx-fw"></i>
                                Closeouts of vehicles
                            </Link>
                            <Link className='linkStyleSid' to={"/closeoutsVen"} onClick={active}>
                                <i className="fa-solid fa-worm bx-fw"></i>
                                Closeouts of Sellers
                            </Link>
                        </div>
                    </div>
                </li>

                <li className={activeSidebar ? "active" : null}>
                    <Link className='linkStyleSid' to={"/billreceivable"} >
                        <i className="fa-solid fa-file-invoice-dollar bx-fw"></i>
                        <span className={activeSidebar ? "activeText" : null}> Bills receivable</span>
                    </Link>
                </li>

                <li className={activeSidebar ? "active" : null}>
                    <Link className='linkStyleSid' to={"/vehicles"} >
                        <i className="fa-solid fa-truck bx-fw"></i>
                        <span className={activeSidebar ? "activeText" : null}>
                            Vehicles
                        </span>
                    </Link>
                </li>

                <li className={activeSidebar ? "active" : null}>
                    <Link className='linkStyleSid' to={"/sellers"} >
                        <i className="fa-solid fa-universal-access bx-fw"></i>
                        <span className={activeSidebar ? "activeText" : null}> Sellers</span>
                    </Link>
                </li>

                <li className={activeSidebar ? "active" : null}>
                    <Link className='linkStyleSid' to={"/customers"} >
                        <i className="fa-solid fa-person bx-fw"></i>
                        <span className={activeSidebar ? "activeText" : null}> Customer</span>
                    </Link>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;