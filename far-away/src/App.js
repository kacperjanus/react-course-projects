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

	function handleClear() {
		const confirmed = window.confirm(
			"Are you sure you want to clear the list?"
		);
		if (confirmed) setItems([]);
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToogleItem={handleToogleItem}
				onClear={handleClear}
			/>
			<Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToogleItem, onClear }) {
	const [sort, setSort] = useState("input");

	let sortedItems;

	if (sort === "input") sortedItems = items;
	if (sort === "description")
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	if (sort === "packed")
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						itemObj={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onToogleItem={onToogleItem}
					/>
				))}
			</ul>

			<div className="actions">
				<select value={sort} onChange={(e) => setSort(e.target.value)}>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by description</option>
					<option value="packed">Sort by packed status</option>
				</select>
				<button onClick={onClear}>Clear list</button>
			</div>
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

function Stats({ items }) {
	if (items.length === 0)
		return <p className="stats">Start adding items to your list</p>;

	const noItems = items.length;
	const packedItems = items.filter((el) => el.packed).length;
	const percentage = (packedItems / noItems) * 100;

	return (
		<footer className="stats">
			{percentage === 100 ? (
				<em>Everything packed - you are all set ✅</em>
			) : (
				<em>
					You have {noItems} items on your list and you already packed{" "}
					{packedItems} ({percentage}%) 💼
				</em>
			)}
		</footer>
	);
}
