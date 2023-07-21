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
	const [expenseMembers, setExpenseMembers] = useState([]);

	function handleAddFriend(friendName, imageUrl) {
		// e.preventDefault();
		setFriends([
			...friends,
			{ id: Date.now(), name: friendName, image: imageUrl, balance: 0 },
		]);
		handleShowAddFriendForm();
	}

	function handleShowAddFriendForm() {
		setShowForm((s) => !s);
	}

	function handleAddExpenseMember(id) {
		const newMember = friends.find((friend) => friend.id === id);
		setExpenseMembers([...expenseMembers, newMember]);
	}

	function handleRemoveExpenseMember(id) {
		setExpenseMembers((members) =>
			members.filter((member) => member.id !== id)
		);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onAddExpenseMember={handleAddExpenseMember}
					onRemoveExpenseMember={handleRemoveExpenseMember}
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
			<FormSplitBill expenseMembers={expenseMembers}></FormSplitBill>
		</div>
	);
}

function FriendsList({ friends, onAddExpenseMember, onRemoveExpenseMember }) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend
					friend={friend}
					key={friend.id}
					onAddExpenseMember={onAddExpenseMember}
					onRemoveExpenseMember={onRemoveExpenseMember}
				/>
			))}
		</ul>
	);
}

function Friend({ friend, onAddExpenseMember, onRemoveExpenseMember }) {
	const [selected, setSelected] = useState(false);

	function handleClick(id) {
		selected && onRemoveExpenseMember(id);
		!selected && onAddExpenseMember(id);
		setSelected((s) => !s);
	}

	return (
		<li>
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
			{!selected && (
				<Button onClick={() => handleClick(friend.id)}>Select</Button>
			)}
			{selected && (
				<Button onClick={() => handleClick(friend.id)}>Deselect</Button>
			)}
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
	const [imageUrl, setImageUrl] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
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

function FormSplitBill({ expenseMembers }) {
	const [bill, setBill] = useState(Number(0));
	const [myExpense, setMyExpense] = useState(Number(0));

	return (
		<form className="form-split-bill">
			<h2>
				Split bill with{" "}
				{expenseMembers.reduce((acc, el) => el.name + ", " + acc, "")}
			</h2>
			<label>💰Bill value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(e.target.value)}
			/>

			<label>🫵🏻Your expense</label>
			<input
				type="text"
				value={myExpense}
				onChange={(e) => setMyExpense(e.target.value)}
			/>

			{expenseMembers.map((member) => (
				<React.Fragment key={member.id}>
					<label>🤗{member.name}'s expense</label>
					<input type="text" disabled />
				</React.Fragment>
			))}

			<label>🤗X expense</label>
			<input type="text" value={bill - myExpense} disabled />

			<label>🤑Who's paying the bill?</label>
			<select>
				<option value="you">You</option>
				<option value="friend">X</option>
			</select>

			<Button>Add</Button>
		</form>
	);
}
