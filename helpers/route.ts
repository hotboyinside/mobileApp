export const urlJoin = (...parts: string[]): string => {
	return (
		'/' +
		parts
			.map(part => part.replace(/\/$/, '').replace(/^\//, ''))
			.filter(Boolean)
			.join('/')
	);
};
