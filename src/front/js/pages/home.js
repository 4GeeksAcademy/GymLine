import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useParams, useNavigate, Link } from 'react-router-dom';

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/shop');
	};

	return (
		<div className="container mt-4">
			<div>
				<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-indicators">
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
					</div>
					<div class="carousel-inner">
						<div class="carousel-item active">
							<img src={`./images/carrusel1.png`} class="d-block" style={{ width: "90em", height: "30em" }} alt="imagen pesas" />
						</div>
						<div class="carousel-item">
							<img src={`./images/carrusel2.png`} class="d-block" style={{ width: "90em", height: "30em" }} alt="imagen gimansio" />
						</div>
						<div class="carousel-item">
							<img src={`./images/carrusel3.png`} class="d-block" style={{ width: "90em", height: "30em" }} alt="imagen entreno" />
						</div>
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			<div className="col-12" style={{ marginTop: "7em" }}>
				<div className="col-12" style={{ textAlign: "center" }}>
					<h1 style={{/* fontFamily: "Sora, sans-serif", */ fontSize: "5em" }}>GYM LINE</h1>
					<br />
					<h3 style={{/* fontFamily: "Sora, sans-serif", */ fontSize: "2em", fontStyle: "italic" }}>Tu equipamiento ideal para entrenamientos sin límites</h3>
				</div>
				<div className=" col-12 d-flex align-items-center justify-content-center" style={{ marginTop: "9em" }}>
					<div className="me-4 col-4">
						<img src={`./images/foto-home1.png`} style={{ width: "25em", height: "20em" }} alt="ordenador" />
					</div>
					<div style={{ textAlign: "center" }} className="col-4 ">
						<h2>VISITA NUESTRA GRAN TIENDA!</h2>
						<Link to="/shop">
							<button onClick={handleClick} type="button" className="btn btn-secondary">
								IR AHORA!
							</button>
						</Link>
					</div>
					<div className="ms-4 col-4">
						<img src={`./images/foto-home2.png`} style={{ width: "25em", height: "20em" }} alt="ejercicio" />
					</div>
				</div>
				{/* <div className="col-12 row" style={{ marginTop: "9em" }}>
					<div className=" col-9 d-flex align-items-center justify-content-center" style={{ textAlign: "justify" }}  >
						<p>
							Bienvenidos a GymLine, tu destino para equipamiento de gimnasio de alta calidad. Ofrecemos una amplia gama de productos para todos los niveles, desde principiantes hasta atletas avanzados. Nuestro eslogan, "GymLine: Tu Equipamiento Ideal para Entrenamientos Sin Límites", refleja nuestro compromiso de ayudarte a superar tus metas. Descubre pesas, máquinas de cardio y más, junto con guías de entrenamiento para optimizar tus sesiones. Con GymLine, no hay límites para lo que puedes lograr. ¡Actívate hoy!
						</p>
					</div>
					<div className="col-3">
					<img src={`./images/foto-lado.png`} style={{ width: "20em", height: "25em" }} alt="ejercicio" />
					</div>
				</div> */}
				
				<div class="form-container col-12" style={{ margin: "0 auto", marginTop: "7em", marginBottom: "5em" }}>
					
					<form class="form">
						<div class="form-group">
							<label for="email">Correo</label>
							<input type="text" id="email" name="email" required="" />
						</div>
						<div class="form-group">
							<label for="email">Asunto</label>
							<input type="text" id="email" name="email" required="" />
						</div>
						<div class="form-group">
							<label for="textarea">Como te podemos ayudar?</label>
							<input name="textarea" id="textarea" rows="10" cols="50" required="" />
						</div>
						<div class="button">
							<button class="form-submit-btn" type="submit">Enviar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
