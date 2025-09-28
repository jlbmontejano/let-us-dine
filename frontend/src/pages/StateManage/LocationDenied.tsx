import { Button } from "@/components/ui/button";

const LocationDenied = () => {
	return (
		<div className='helper-container'>
			<div className='text-center'>
				<h2 className='helper-container-title'>
					Location Access Required
				</h2>
				<p className='text-gray-600'>
					We need your location to find restaurants near you.
				</p>
			</div>
			<div className='max-w-md rounded-lg bg-gray-50 p-6'>
				<p className='mb-2 font-semibold'>To enable location access:</p>
				<ol className='list-inside list-decimal space-y-2 text-sm'>
					<li>
						Look for the location icon (📍) in your browser's
						address bar
					</li>
					<li>Click it and select "Allow" or "Always allow"</li>
					<li>Click the refresh button below</li>
				</ol>
			</div>
			<Button onClick={() => window.location.reload()} className='mt-4'>
				Refresh Page
			</Button>
		</div>
	);
};

export default LocationDenied;
