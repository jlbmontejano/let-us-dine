import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMutating } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type BackButtonProps = {
	className?: string;
};

const BackButton = ({ className = "" }: BackButtonProps) => {
	const navigate = useNavigate();
	const isMutating = useIsMutating();

	return (
		<Button
			onClick={() => navigate(-1)}
			disabled={isMutating > 0}
			className={cn("w-fit", className)}>
			Back
		</Button>
	);
};

export default BackButton;
