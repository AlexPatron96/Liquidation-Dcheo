import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CardBtn from "../../../../components/CardBtn";
import imgSeller from "../../../../img/imgSeller.png";
import date from "../../../../utils/date";
import Swal from "sweetalert2";
import { getInvoiceThunk } from "../../../../store/slices/invoice.slice";
import currentdate from "../../../../utils/date";
import { getSellerThunk } from "../../../../store/slices/seller.slice";

const Selectsellerliq = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		seller[0] ? null : dispatch(getSellerThunk());
		invoice[0] ? null : dispatch(getInvoiceThunk());
	}, []);

	const seller = useSelector((state) => state.seller);
	console.log(seller);
	const sellerActive = seller.filter((sell) => sell?.isActive === true);
	const invoice = useSelector((state) => state.invoice);
	const identificarDia = date.CurrendateDay();

	const loadData = (dataRecepter) => {
		localStorage.setItem(
			`checkLiq${dataRecepter?.code}-${dataRecepter?.id}`,
			JSON.stringify(dataRecepter.data_liquidation[0])
		);
		localStorage.setItem(
			`discountLiq${dataRecepter?.code}-${dataRecepter?.id}`,
			JSON.stringify(dataRecepter.data_liquidation[1])
		);
		localStorage.setItem(
			`expensesLiq${dataRecepter?.code}-${dataRecepter?.id}`,
			JSON.stringify(dataRecepter.data_liquidation[2])
		);
		localStorage.setItem(
			`cashLiq${dataRecepter?.code}-${dataRecepter?.id}`,
			JSON.stringify(dataRecepter.data_liquidation[3])
		);
		localStorage.setItem(
			`trans${dataRecepter?.code}-${dataRecepter?.id}`,
			JSON.stringify(dataRecepter.data_liquidation[4])
		);
		localStorage.setItem(
			`invoLiq${dataRecepter?.code}-${dataRecepter?.id}`,
			JSON.stringify(dataRecepter.data_liquidation[5])
		);
		localStorage.setItem(
			`codGenLiq${dataRecepter?.code}-${dataRecepter?.id}`,
			dataRecepter.data_liquidation[6]
		);
	};

	const selectSeller = async (data) => {
		Swal.fire({
			title: "¿Está seguro?",
			icon: "question",
			text: data?.liquidation_isactive
				? `Existe una Liquidacion Guardada, Deseas Acceder o Eliminarla, Tambien puedes Generarle la lista de Facturas x Cobrar.`
				: `Vas a realizar la liquidacion de el Vendedor ${data?.name}, o puedes Generarle la lista de Facturas x Cobrar.`,
			confirmButtonColor: "#F5CA8C",
			denyButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Generar Lista de Fac X Cob",
			denyButtonText: "Si, proseguir!",
			cancelButtonText: "Salir",
			showCancelButton: true,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				navigate(
					`/dashboard/liquidation/sellers/${data.id}/received-inovices`
				);
			} else if (result.isDenied) {
				data?.liquidation_isactive ? loadData(data) : null;
				navigate(`/dashboard/liquidation/sellers/${data?.id}`);
			} else {
				navigate(`/dashboard/liquidation/sellers`);
			}
		});
	};

	return (
		<div className="pages">
			<div>
				<h1 className="m-3 fs-3">Selecciona el Vendedor a liquidar</h1>
				<div className="card-btn">
					<Row>
						{sellerActive?.map((sell, index) => (
							<Col key={index}>
								{/* to={"/dashboard/do-vehicleliquidation"} to={`/dashboard/liquidation/vehicles/${veh.id}`}  */}
								<Link
									className="linkStyle m-2"
									// to={`/dashboard/liquidation/sellers/${sell?.id}`}
									// style={{ margin: "0.5rem 3rem" }}
									onClick={() => selectSeller(sell)}
								>
									<h5>{sell?.code}</h5>
									<CardBtn
										title={(sell?.name).substring(
											0,
											15
										)}
										img={imgSeller}
									/>

									<span>
										Balance: $
										{sell?.balance_sell?.total}
									</span>
									<div>
										{sell?.liquidation_isactive ? (
											<div
												className="bg-success text-bg-info p-1 rounded-3"
												style={{
													fontSize: "12px",
												}}
											>
												"Existe una Liquidacion
												Guardada"
											</div>
										) : null}
									</div>
								</Link>
							</Col>
						))}
					</Row>
				</div>
			</div>
			<div className="do-vehicle"></div>
		</div>
	);
};

export default Selectsellerliq;
