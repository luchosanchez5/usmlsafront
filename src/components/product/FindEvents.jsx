import React, { useState } from 'react';
import InputField from './InputField';
import SelectTag from './SelectTag';

const FindEvents = () => {
    const ageOptions = [
        { value: 40, label: 40 },
        { value: 50, label: 50 },
        { value: 60, label: 60 }
    ];
    const classOptions = [
        { value: 'class 1', label: 'class 1' },
        { value: 'class 2', label: 'class 2' },
        { value: 'class 3', label: 'class 3' }
    ];
    const DirectorOptions = [
        { value: 'Direct 1', label: 'director 1' },
        { value: 'director 2', label: 'director 2' },
        { value: 'director 3', label: 'director 3' }
    ];
    const cityOptions = [
        { value: 'London', label: ' London' },
        { value: 'Birmingham', label: ' Birmingham' },
        { value: 'Bradford', label: ' Bradford' }
    ];

    const [searchBy, setSearchBy] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    const handleRadioChange = (e) => {
        setSearchBy(e.target.value);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="d-flex">
         

            <div className={`d-flex flex-column bg-dark text-white pb-5 pt-2 px-3 ${isSidebarOpen ? 'd-flex flex-column' : 'd-none d-md-flex'}`} 
                style={{ height: '100vh', width: '250px', transition: 'all 0.3s ease-in-out' }}>
                
                <span className='text-uppercase py-2 px-4' style={{ background: 'silver' }}>Find Events</span>

                <div className="d-flex flex-column gap-1">
                    <InputField type='text' placeholder='Event Name' className='py-2 px-2' />
                    <SelectTag options={ageOptions} deFaultValue='Age' className='py-2 px-2' />
                    <SelectTag options={classOptions} deFaultValue='Class' className='py-2 px-2' />
                    <SelectTag options={DirectorOptions} deFaultValue='Director' className='py-2 px-2' />

                    <span>Search By</span>

                    <div className="d-flex">
                        <InputField
                            type='radio'
                            value="State"
                            checked={searchBy === 'State'}
                            onChange={handleRadioChange}
                        />
                        <span>State</span>
                    </div>

                    <div className="d-flex">
                        <InputField
                            type='radio'
                            value="Zip Code"
                            checked={searchBy === 'Zip Code'}
                            onChange={handleRadioChange}
                        />
                        <span>Zip Code</span>
                    </div>

                    <div className="d-flex">
                        <InputField
                            type='radio'
                            value="Current Location"
                            checked={searchBy === 'Current Location'}
                            onChange={handleRadioChange}
                        />
                        <span>Current Location</span>
                    </div>

                    <InputField type='date' className='py-2' />
                    <InputField type='date' className='py-2' />
                    <SelectTag options={cityOptions} deFaultValue='City' className='py-2 px-2' />
                    
                    <button className='Login-btn text-white mt-3'>Search</button>
                </div>
            </div>
            <div className="d-flex">
            <button
                className="d-md-none bg-dark text-white p-2"
                onClick={toggleSidebar}
                style={{ position: 'absolute', zIndex: 100,  left: '' }}
            >
                {isSidebarOpen ? 'Close' : 'Menu'}
            </button>
            
            </div>
        </div>
    );
}

export default FindEvents;
