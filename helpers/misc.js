export const sortEvents = (a, b) => {
	return new Date(a.start.local).getTime() - new Date(b.start.local).getTime();
};

export const cleanText = text => {
	if (text) {
		return text.replace(/\s\s+/g, ' ').replace(/\r?|\r/g, '');
	}
	return '';
};
