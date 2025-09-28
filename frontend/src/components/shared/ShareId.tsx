import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type ShareIdProps = {
	sessionId: string;
};

const ShareId = ({ sessionId }: ShareIdProps) => {
	const { toast } = useToast();

	const handleCopyId = async () => {
		try {
			await navigator.clipboard.writeText(sessionId);
			toast({
				description: "ID copied to your clipboard.",
			});
		} catch (error) {
			toast({
				description: "An error has ocurred. Please try again.",
				variant: "destructive",
			});
			console.error(error);
		}
	};

	return (
		<section>
			<Label>Remember to share the session ID:</Label>
			<Button onClick={handleCopyId}>{sessionId}</Button>
		</section>
	);
};

export default ShareId;
