import { useState } from "react";

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItems((items) => items.filter((el) => el.id !== id));
	}

	function handleToogleItem(id) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToogleItem={handleToogleItem}
			/>
			<Stats />
		</div>
	);
}

function Logo() {
	return <h1>🏝️ Far away 🧳</h1>;
}

function Form({ onAddItems }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();

		if (!description) return;

		const newItem = {
			description,
			quantity,
			packed: false,
			id: Date.now(),
		};
		onAddItems(newItem);

		setDescription("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your trip? 🥰</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
					<option value={el} key={el}>
						{el}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function PackingList({ items, onDeleteItem, onToogleItem }) {
	return (
		<div className="list">
			<ul>
				{items.map((item) => (
					<Item
						itemObj={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onToogleItem={onToogleItem}
					/>
				))}
			</ul>
		</div>
	);
}

function Item({ itemObj, onDeleteItem, onToogleItem }) {
	return (
		<li>
			<input
				type="checkbox"
				value={itemObj.packed}
				onChange={() => onToogleItem(itemObj.id)}
			/>
			<span
				style={itemObj.packed ? { textDecoration: "line-through" } : {}}
			>
				{itemObj.quantity} {itemObj.description}
			</span>
			<button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
		</li>
	);
}

function Stats() {
	return (
		<footer className="stats">
			<em>You have X items on your list and you already packed X 💼</em>
		</footer>
	);
}
