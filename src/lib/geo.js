export const nominatim = async (lat, lng) => {
	const response = await fetch(
		`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
		{
			headers: {
				'User-Agent': 'SocietyFlow/0.1 (rishirajdas@gigrandom.com)'
			}
		}
	);
	const data = await response.json();
	return data;
};
