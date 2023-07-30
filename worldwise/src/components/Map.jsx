import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	console.log(lat, lng);
	return <div className={styles.mapContainer}>Map</div>;
}

export default Map;
