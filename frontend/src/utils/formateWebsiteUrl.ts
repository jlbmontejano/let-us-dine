const formatWebsiteUrl = (url: string): string => {
	let formatted = url.replace(/^https?:\/\//, "");
	if (!formatted.startsWith("www.")) formatted = "www." + formatted;
	if (formatted.endsWith("/")) formatted = formatted.split("/")[0];
	return formatted;
};

export default formatWebsiteUrl;
