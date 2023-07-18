import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];

function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header() {
	// const style = {
	// 	color: "lightblue",
	// 	fontSize: "48px",
	// 	textTransform: "uppercase",
	// };
	const style = {};
	return (
		<header className="header">
			<h1 style={style}>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu() {
	const pizzas = pizzaData;
	return (
		<main className="menu">
			<h2>Our menu</h2>

			{pizzas.length > 1 ? (
				<ul className="pizzas">
					{pizzaData.map((pizza) => (
						<Pizza pizzaObj={pizza} key={pizza.name} />
					))}
				</ul>
			) : (
				<p>We're still working on menu. Please come back later!</p>
			)}
			{/* <Pizza
				name="Pizza Spinaci"
				ingredients="Tomato, mozarella, spinach, and ricotta cheese"
				photoName="pizzas/spinaci.jpg"
				price={10}
			/>
			<Pizza
				name="Pizza Funghi"
				ingredients="Tomato, mozarella, mushrooms, and onion"
				photoName="pizzas/funghi.jpg"
				price={12}
			/> */}
		</main>
	);
}

function Pizza(props) {
	// console.log(props);
	return (
		<li className="pizza">
			<img src={props.pizzaObj.photoName} alt="Pizza Spinaci"></img>
			<div>
				<h3>{props.pizzaObj.name}</h3>
				<p>{props.pizzaObj.ingredients}</p>
				<span>{props.pizzaObj.price}</span>
			</div>
		</li>
	);
}

function Footer() {
	const hour = new Date().getHours();
	const openHour = 9;
	const closeHour = 23;
	const isOpen = hour >= openHour && hour < closeHour;

	return (
		<footer className="footer">
			{isOpen ? (
				<div className="order">
					<p>
						It's {new Date().toLocaleTimeString()}{" "}
						{isOpen
							? "We're currently open"
							: "We're currently closed"}
					</p>
					<button className="btn">Hello</button>
				</div>
			) : (
				<p>
					We're closed now. We're happy to welcome you at {openHour}
					:00
				</p>
			)}
		</footer>
	);
	// return React.createElement("footer", null, "We're currently open");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
