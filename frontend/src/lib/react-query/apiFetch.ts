export default async function apiFetch<T>(
	url: string,
	options?: RequestInit,
): Promise<T> {
	const response = await fetch(url, {
		headers: { "Content-Type": "application/json" },
		...options,
	});

	if (response.status === 404) {
		throw new Error("Not found");
	}

	if (!response.ok) {
		throw new Error("Network or server error");
	}

	const json = await response.json();

	if (!json.success) {
		throw new Error("response.json() failed");
	}

	return json.data as T;
}
