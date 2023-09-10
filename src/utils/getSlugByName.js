import { deburr } from "lodash";

export const getSlugByName = slug => {
	// Normalize the title to remove accents and special characters
	const normalizedTitle = deburr(slug)
		.normalize("NFD")
		.replace(/[^\w\s-]/g, "")
		.trim();

	// Replace spaces with dashes and convert to lowercase
	return normalizedTitle.replace(/[-\s]+/g, "-").toLowerCase();
};

export default getSlugByName;
