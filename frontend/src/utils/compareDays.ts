// Google API Response example:
// 'Monday: Closed'
// 'Tuesday: 4:00 – 8:30 PM'

const compareDays = (completeDay: string, currentDay: string): boolean => {
	const weekday = completeDay.split(":")[0];
	return weekday === currentDay;
};

export default compareDays;
