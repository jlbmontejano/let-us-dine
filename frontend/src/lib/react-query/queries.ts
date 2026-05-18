import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import apiFetch from "@/lib/react-query/apiFetch";
import QUERY_KEYS from "@/lib/react-query/queryKeys";
import { SessionResult } from "@/types/index";
import { CreateSessionResultBody, SessionInfo } from "@/types/shared";

export const useCreateSession = () => {
	return useMutation({
		mutationFn: (totalParticipants: number) =>
			apiFetch<SessionInfo>(
				`${import.meta.env.VITE_API_URL}/api/sessions`,
				{
					method: "POST",
					body: JSON.stringify({ totalParticipants }),
				},
			),
	});
};

export const useCreateResults = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			sessionId,
			reqBody,
		}: {
			sessionId: string;
			reqBody: CreateSessionResultBody;
		}) =>
			apiFetch(
				`${import.meta.env.VITE_API_URL}/api/sessions/${sessionId}`,
				{
					method: "POST",
					body: JSON.stringify(reqBody),
				},
			),
		onSuccess: (_, { sessionId }) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RESULTS, QUERY_KEYS.GET_SESSION],
			});
			navigate(`/sessions/${sessionId}/results`);
		},
	});
};

export const useCheckSession = () => {
	const navigate = useNavigate();
	const { toast } = useToast();

	return useMutation({
		mutationFn: (sessionId: string) =>
			apiFetch<SessionInfo>(
				`${import.meta.env.VITE_API_URL}/api/sessions/${sessionId}`,
			),
		onSuccess: data => {
			if (!data.isActive) {
				toast({
					description: "Inactive session",
					variant: "destructive",
				});
				return;
			}
			navigate(`/questions/${data.uuid}`);
		},
		onError: error => {
			toast({
				description: error.message || "Error retrieving session",
				variant: "destructive",
			});
		},
	});
};

export const useGetSession = (sessionId: string) =>
	useQuery({
		queryKey: [QUERY_KEYS.GET_SESSION, sessionId],
		enabled: !!sessionId,
		queryFn: () =>
			apiFetch<SessionInfo>(
				`${import.meta.env.VITE_API_URL}/api/sessions/${sessionId}`,
			),
	});

export const useGetResults = (sessionId: string) =>
	useQuery({
		queryKey: [QUERY_KEYS.GET_RESULTS, sessionId],
		enabled: !!sessionId,
		queryFn: () =>
			apiFetch<SessionResult>(
				`${import.meta.env.VITE_API_URL}/api/sessions/${sessionId}/results`,
			),
	});
