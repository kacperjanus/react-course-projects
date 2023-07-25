import { useEffect } from "react";

export function useKey(key, callback) {
	useEffect(
		function () {
			function esc(e) {
				if (e.code.toLowerCase() === key.toLowerCase()) {
					callback();
				}
			}
			document.addEventListener("keydown", esc);

			return function () {
				document.removeEventListener("keydown", esc);
			};
		},
		[key, callback]
	);
}
