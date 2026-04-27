export default async function apiFetch<T>(
	url: string,
	options?: RequestInit,
): Promise<T> {
	const response = await fetch(url, {
		headers: { "Content-Type": "application/json" },
		...options,
	});

	if (response.status === 404) {
		throw new Error("Session not found");
	}

	if (!response.ok) {
		const json = await response.json().catch(() => null);
		throw new Error(json?.message || `Server error: ${response.status}`);
	}

	const json = await response.json();

	if (!json.success) {
		throw new Error("response.json() failed");
	}

	return json.data as T;
}
