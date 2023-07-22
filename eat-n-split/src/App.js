import { useState } from "react";
import React from "react";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

export default function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showForm, setShowForm] = useState(false);
	const [expenseMember, setExpenseMember] = useState(null);

	function handleAddFriend(friendName, imageUrl) {
		setFriends([
			...friends,
			{
				id: Date.now(),
				name: friendName,
				image: `${imageUrl}?=${Date.now()}`,
				balance: 0,
			},
		]);
		handleShowAddFriendForm();
	}

	function handleShowAddFriendForm() {
		setShowForm((s) => !s);
	}

	function handleAddExpenseMember(id) {
		if (id === expenseMember?.id) setExpenseMember(null);
		else {
			const newMember = friends.find((friend) => friend.id === id);
			setExpenseMember(newMember);
		}
		setShowForm(false);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onAddExpenseMember={handleAddExpenseMember}
					expenseMember={expenseMember}
				/>
				{showForm && <FormAddFriend onAddFriend={handleAddFriend} />}
				{showForm ? (
					<Button onClick={handleShowAddFriendForm}>Close</Button>
				) : (
					<Button onClick={handleShowAddFriendForm}>
						Add friend
					</Button>
				)}
			</div>
			{expenseMember && (
				<FormSplitBill expenseMember={expenseMember}></FormSplitBill>
			)}
		</div>
	);
}

function FriendsList({ friends, onAddExpenseMember, expenseMember }) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend
					friend={friend}
					key={friend.id}
					onAddExpenseMember={onAddExpenseMember}
					expenseMember={expenseMember}
				/>
			))}
		</ul>
	);
}

function Friend({ friend, onAddExpenseMember, expenseMember }) {
	function handleClick(id) {
		onAddExpenseMember(id);
	}

	return (
		<li className={friend.id === expenseMember?.id ? "selected" : ""}>
			<img src={friend.image} alt={friend.name}></img>
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} {Math.abs(friend.balance)} dollars
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you {Math.abs(friend.balance)} dollars
				</p>
			)}
			{friend.balance === 0 && (
				<p>You are all squared with {friend.name}</p>
			)}
			<Button onClick={() => handleClick(friend.id)}>
				{expenseMember?.id !== friend.id ? "Select" : "Deselect"}
			</Button>
		</li>
	);
}

function Button({ children, onClick }) {
	return (
		<button onClick={onClick} className="button">
			{children}
		</button>
	);
}

function FormAddFriend({ onAddFriend }) {
	const [friendName, setFriendName] = useState("");
	const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

	function handleSubmit(e) {
		e.preventDefault();

		if (!friendName || !imageUrl) return;
		onAddFriend(friendName, imageUrl);
		setFriendName("");
		setImageUrl("");
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>😀Friend name</label>
			<input
				type="text"
				value={friendName}
				onChange={(e) => setFriendName(e.target.value)}
			/>

			<label>🤔Image URL</label>
			<input
				type="text"
				value={imageUrl}
				onChange={(e) => setImageUrl(e.target.value)}
			/>

			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill({ expenseMember }) {
	const [bill, setBill] = useState("");
	const [myExpense, setMyExpense] = useState("");
	const paidByFriend = bill ? bill - myExpense : "";
	const [whoPays, setWhoPays] = useState("user");

	return (
		<form className="form-split-bill">
			<h2>Split bill with {expenseMember.name}</h2>
			<label>💰Bill value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>

			<label>🫵🏻Your expense</label>
			<input
				type="text"
				value={myExpense}
				onChange={(e) =>
					setMyExpense(
						Number(e.target.value) > bill
							? bill
							: Number(e.target.value)
					)
				}
			/>

			<label>🤗{expenseMember.name} expense</label>
			<input type="text" value={paidByFriend} disabled />

			<label>🤑Who's paying the bill?</label>
			<select
				value={whoPays}
				onChange={(e) => setWhoPays(e.target.value)}
			>
				<option value="you">You</option>
				<option value="friend">{expenseMember.name}</option>
			</select>

			<Button>Split bill</Button>
		</form>
	);
}
