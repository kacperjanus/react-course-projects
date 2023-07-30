import styles from "./CountryList.module.css";

import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner />;
	if (cities.length === 0)
		return <Message message={"No cities to display"} />;

	const countries = cities
		.map((city) => city.country)
		.reduce(
			(acc, country) =>
				acc.find((val) => val.country === country)
					? acc
					: [
							...acc,
							{
								country: country,
								emoji: cities.find(
									(city) => city.country === country
								).emoji,
							},
					  ],
			[]
		);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</ul>
	);
}

export default CountryList;
