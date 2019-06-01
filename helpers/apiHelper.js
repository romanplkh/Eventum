//CUSTOM CLASS TO HANDLE REQUEST TO API
export default class Eventum {
	configuration = {
		headers: {
			//THIS IS PERSONAL TOKEN. DO NOT USE IT IN OTHER APP
			Authorization: 'Bearer MRJLFQNFBKWQ5SDBCP34'
		}
	};

	_apiBase = 'https://www.eventbriteapi.com/v3/events/';

	async getEvent(url) {
		const response = await fetch(`${this._apiBase}${url}`, this.configuration);
		if (!response.ok)
			throw new Error(
				`Roman, Could not fetch ${url}, \n received server code: ${
					response.status
				}`
			);
		return await response.json();
	}

	//IF NO CITY IS SUPPLIED BY DEFAULT IT WILL BE MONCTON
	getEventByCity(city = 'moncton') {
		return this.getEvent(
			`search?location.address=${city}?start_date.this_month&expand=category,organizer,ticket_availability,venue`
		);
	}

	getEventById(id) {
		return this.getEvent(
			`${id}/?expand=venue,ticket_availability,organizer,category,format`
		);
	}

	getEventsByLocation(latitude, longitude) {
		return this.getEvent(
			`search?location.longitude=${longitude}&location.latitude=${latitude}&location.within=2km&expand=venue,ticket_availability,organizer,category,format`
		);
	}
}
