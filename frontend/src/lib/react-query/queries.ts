import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateSessionResultBody } from "../../../../shared/types";
import QUERY_KEYS from "./queryKeys";
import { useNavigate } from "react-router-dom";

export const useCreateSession = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (totalParticipants: number) => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/sessions`,
				{
					method: "POST",
					body: JSON.stringify({
						totalParticipants,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) throw new Error("Network or server error");

			const json = await response.json();
			if (!json.success) throw new Error("response.json() failed");

			return json.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RESULTS, QUERY_KEYS.GET_SESSION],
			});
		},
	});
};

export const useCreateResults = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			sessionId,
			reqBody,
		}: {
			sessionId: string;
			reqBody: CreateSessionResultBody;
		}) => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`,
				{
					method: "POST",
					body: JSON.stringify(reqBody),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) throw new Error("Network or server error");

			const json = await response.json();
			if (!json.success) throw new Error("response.json() failed");

			return json.data;
		},
		onSuccess: (_, { sessionId }) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RESULTS, QUERY_KEYS.GET_SESSION],
			});

			navigate(`/sessions/${sessionId}/results`);
		},
	});
};

export const useGetSession = (sessionId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_SESSION, sessionId],
		enabled: !!sessionId,
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) throw new Error("Network or server error");

			const json = await response.json();
			if (!json.success) throw new Error("response.json() failed");

			return json.data;
		},
	});
};

export const useGetResults = (sessionId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RESULTS, sessionId],
		enabled: !!sessionId,
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/sessions/${sessionId}/results`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) throw new Error("Network or server error");

			const json = await response.json();
			if (!json.success) throw new Error("response.json() failed");

			return json.data;
		},
	});
};
