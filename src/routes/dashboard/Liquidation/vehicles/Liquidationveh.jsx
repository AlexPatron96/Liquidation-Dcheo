import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Tabledinamik from '../../../../components/molecules/Tabledinamik';
import Tabledinamik2 from '../../../../components/molecules/Tabledinamik2';


const Liquidationveh = () => {
    const { id: userId } = useParams();
    const vehicles = useSelector(state => state.vehicles);
    const invoice = useSelector(state => state.billReceivable);
    const vehSelect = vehicles.find(element => (element.id === parseInt(userId)));
    return (
        <div className='LiquidationVeh'>
            <div>
                <h6>{`${vehSelect?.placa} - ${vehSelect?.chofer} `}</h6>
            </div>
            <div>
                <div>
                    <h6>Lista de Facturas Asignadas</h6>
                </div>
                <div className='' style={{maxWidth:"95%", maxHeight:"500px"}}>
                    <Tabledinamik  invoice={invoice}/>
                </div>
            </div>
        </div>
    );
};

export default Liquidationveh;