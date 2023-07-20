export default function Item({ itemObj, onDeleteItem, onToogleItem }) {
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
