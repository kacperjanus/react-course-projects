import Spinner from "./Spinner.jsx";
import styles from "./CityList.module.css";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";

function CityList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;
	if (cities.length === 0)
		return <Message message={"No cities to display"} />;
	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem city={city} key={city.id} />
			))}
		</ul>
	);
}

export default CityList;