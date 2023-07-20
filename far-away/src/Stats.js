export default function Stats({ items }) {
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
