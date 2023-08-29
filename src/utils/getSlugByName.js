const getSlugByName = slug => {
	// Normalize the title to remove accents and special characters
	const normalizedTitle = slug
		.normalize("NFKD")
		.replace(/[^\w\s-]/g, "")
		.trim();

	// Replace spaces with dashes and convert to lowercase
	return normalizedTitle.replace(/[-\s]+/g, "-").toLowerCase();
};

export default getSlugByName;
