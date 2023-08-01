import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";

import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
	const { cities } = useCities();

	const [mapPosition, setMapPosition] = useState([40, 0]);
	const {
		isLoading: isLoadingPosition,
		position: geolocation,
		getPosition,
	} = useGeolocation();

	const [lng, lat] = useUrlPosition();
	useEffect(
		function () {
			if (lat && lng) setMapPosition([lat, lng]);
		},
		[lat, lng]
	);

	useEffect(
		function () {
			if (geolocation) setMapPosition([geolocation.lat, geolocation.lng]);
		},
		[geolocation]
	);

	return (
		<div className={styles.mapContainer}>
			{geolocation ? (
				""
			) : (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Use your position"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={7}
				scrollWheelZoom={true}
				className={styles.mapContainer}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						key={city.id}
						position={[city.position.lat, city.position.lng]}
					>
						<Popup className="leaflet-popup">
							{city.emoji} {city.cityName}
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvent({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}

export default Map;
