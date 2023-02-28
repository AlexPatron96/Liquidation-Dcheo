import React from 'react';

const Functionalitiesbtn = ({ aditional, buttons }) => {
    return (
        <div className='functionalities '>
            <div className='fun-btn-cont'>
                {
                    buttons()
                }
            </div>
            <div className="input-group inputFunc" >
                <input type="text" className="form-control" placeholder="Ingresa lo que deseas buscar" aria-describedby="button-addon2">
                </input>
                <button className="btn btn-primary" type="button" id="button-addon2">Search</button>
            </div>
        </div>
    );
};

export default Functionalitiesbtn;