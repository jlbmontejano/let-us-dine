import BackButton from "@/components/shared/BackButton";

const Error = () => {
	return (
		<div className='flex flex-col justify-center items-center w-full h-full gap-4'>
			<p className='text-2xl'>Ooops... there's been an error.</p>
			<BackButton />
		</div>
	);
};

export default Error;
