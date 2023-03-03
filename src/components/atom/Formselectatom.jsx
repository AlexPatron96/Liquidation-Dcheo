import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const Formselectatom = ({ title, iterador, firstdata, secunddata , disabledAction }) => {

    // const [items, setItems] = useState(iterador);
    // console.log(items);
    //Lista de seleccion
    return (
        <Form.Select size="sm" className='w-50' aria-label="Default select example">
            <option>{title}</option>
            {
                iterador?.map((itr, index) => (
                    <option key={index} value={itr.id} disabled={disabledAction}>

                        {`${itr.id} - ${itr[firstdata]}  ${itr[secunddata] ? "- "+itr[secunddata] : " "}`}

                    </option>
                ))
            }
        </Form.Select>
    );
};

export default Formselectatom;