import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
	return (
		<header>
			<SearchOrder />
			<Link to="/">Fast React Pizza Co.</Link>
		</header>
	);
}

export default Header;
