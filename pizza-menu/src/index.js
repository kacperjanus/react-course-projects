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
	return (
		<header className="header">
			<h1>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu() {
	const pizzas = pizzaData;
	return (
		<main className="menu">
			<h2>Our menu</h2>

			{pizzas.length > 1 ? (
				// React fragment that lets us return two elements
				<>
					<p>
						Authentic Italian cuisine. {pizzas.length} creative
						dishes to choose from. All from out stone oven, all
						organic, all delicious.
					</p>
					<ul className="pizzas">
						{pizzaData.map((pizza) => (
							<Pizza pizzaObj={pizza} key={pizza.name} />
						))}
					</ul>
				</>
			) : (
				<p>We're still working on menu. Please come back later!</p>
			)}
		</main>
	);
}

// Destructuring props
function Pizza({ pizzaObj }) {
	return (
		<li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
			<img src={pizzaObj.photoName} alt="Pizza Spinaci"></img>
			<div>
				<h3>{pizzaObj.name}</h3>
				<p>{pizzaObj.ingredients}</p>
				<span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
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
				<Order closeHour={closeHour} />
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

function Order({ closeHour }) {
	return (
		<div className="order">
			<p>
				It's {new Date().toLocaleTimeString()} - We're currently open
				until {closeHour}:00
			</p>
			<button className="btn">Order</button>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
