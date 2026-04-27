type DetailRowProps = {
	icon: React.ReactNode;
	label: string;
	children: React.ReactNode;
};

const DetailRow = ({ icon, label, children }: DetailRowProps) => (
	<div className='places-list-details'>
		<div className='places-list-label'>
			{icon}
			<p>{label}</p>
		</div>
		<div className='places-list-left-padding'>{children}</div>
	</div>
);

export default DetailRow;
