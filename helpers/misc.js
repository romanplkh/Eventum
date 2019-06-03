//CUSTOM METHODS USED IN APP

//SORTS FROM EARLIEST TO OLDEST
export const sortEvents = (a, b) => {
	return new Date(a.start.local).getTime() - new Date(b.start.local).getTime();
};

//SORTS FROM OLDEST TO EARLIEST
export const sortEventsDesc = (a, b) => {
	return new Date(b.date.local).getTime() - new Date(a.date.local).getTime();
};

//CLEANS TEXT FROM TRAILING WHITE SPACES, CARRIAGE RETURNS, NEW LINES
export const cleanText = text => {
	if (text) {
		return text.replace(/\s\s+/g, ' ').replace(/\r?|\r/g, '');
	}
	return '';
};
