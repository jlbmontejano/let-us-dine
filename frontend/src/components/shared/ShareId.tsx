import { Label } from "../ui/label";
import { Button } from "../ui/button";
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
				description: "The ID has been successfully copied to your clipboard.",
			});
		} catch (error) {
			toast({
				description: "An error has ocurred. Please try again.",
				variant: "destructive",
			});
			console.error(`Error: ${error}`);
		}
	};

	return (
		<>
			<Label>Remember to share your ID:</Label>
			<Button onClick={handleCopyId}>{sessionId}</Button>
		</>
	);
};

export default ShareId;
