import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreateSessionResultBody } from "../../../../shared/types";
import apiFetch from "./apiFetch";
import QUERY_KEYS from "./queryKeys";
import { SessionResult, SessionStatus } from "@/types";

export const useCreateSession = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (totalParticipants: number) =>
			apiFetch<SessionStatus>(
				`${import.meta.env.VITE_API_URL}/sessions`,
				{
					method: "POST",
					body: JSON.stringify({ totalParticipants }),
				},
			),
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
		mutationFn: ({
			sessionId,
			reqBody,
		}: {
			sessionId: string;
			reqBody: CreateSessionResultBody;
		}) =>
			apiFetch(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`, {
				method: "POST",
				body: JSON.stringify(reqBody),
			}),
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
			apiFetch<SessionStatus>(
				`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`,
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
			apiFetch<SessionStatus>(
				`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`,
			),
	});

export const useGetResults = (sessionId: string) =>
	useQuery({
		queryKey: [QUERY_KEYS.GET_RESULTS, sessionId],
		enabled: !!sessionId,
		queryFn: () =>
			apiFetch<SessionResult>(
				`${import.meta.env.VITE_API_URL}/sessions/${sessionId}/results`,
			),
	});
