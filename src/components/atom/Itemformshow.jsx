import React from 'react';

const Itemformshow = ({title, show }) => {
    return (
        <div className="form-group" style={{ display: "flex", justifyContent: "space-between" }}>
            <label className="col-form-label col-form-label-sm" htmlFor="monedas">{title}: </label>
            <h6 name='monedas' className="form-control form-control-sm text-md-center" style={{ maxWidth: "75px" }}>
                {show ? show : '0'}
            </h6>
        </div>
    );
};

export default Itemformshow;