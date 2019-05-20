import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import Spinner from './common/Spinner';
import eventumAPI from '../helpers/apiHelper';
import CardImage from './CardImage';
import Calendar from './Calendar';
import CardShortDescription from './CardShortDes';
import CardBlock from './CardBlock';
import CardButton from './CardButton';
import { sortEvents } from '../helpers/misc';

export default class CardEvent extends Component {
	eventumAPI = new eventumAPI();

	state = {
		events: undefined,
		city: '',
		loading: false,
		navigationSearch: false
	};

	componentDidMount() {
		this.getEvents();
	}

	getEvents = async city => {
		try {
			this.setState({ loading: true });
			const events = await this.eventumAPI.getEventByCity(city);
			let sortedEventsByDate = events.events.sort(sortEvents);
			this.setState({ events: sortedEventsByDate, loading: false });
		} catch (e) {
			console.log(e);
		}
	};

	searchByCity = city => {
		if (this.state.city === '') {
			return;
		}
		this.getEvents(city);
	};

	addToFavour = event => {
		const user = firebase.auth().currentUser;
		db.collection('users')
			.doc(user.uid)
			.collection('favours')
			.add(event);
	};

	onLocationEventSearch = () => {
		this.setState({ navigationSearch: true });
		try {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords;
					this.eventumAPI
						.getEventsByLocation(latitude, longitude)
						.then(response => {
							let sortedEventsByDate = response.events.sort(sortEvents);
							this.setState({
								events: sortedEventsByDate,
								navigationSearch: false
							});
						});
				},
				error => {
					alert(`${error.message}`);
					this.setState({ navigationSearch: false });
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	showMore = ({ ...args }) => {
		this.props.navigation.navigate('Details', {
			...args
		});
	};

	keyExtractor = ({ id }) => {
		return id.toString();
	};

	cardJSX = ({ item }) => {
		try {
			return (
				<View style={styles.container}>
					<View style={styles.cardTop}>
						<CardImage source={item.logo.url} />
					</View>
					<View style={styles.cardMiddle}>
						<Calendar>{item.start.local}</Calendar>
						<CardShortDescription
							title={item.name.text}
							place={item.venue.name}
							date={item.start.local}
						/>
					</View>
					<View style={styles.cardFooter}>
						<CardBlock
							text="Price"
							value={item.ticket_availability.minimum_ticket_price.display}
							color={
								item.ticket_availability.minimum_ticket_price.value > 0
									? '#EB594B'
									: '#00CB26'
							}
						/>
						<CardBlock
							text="Category"
							value={item.category.short_name}
							color="#0086F2"
						/>
						<CardBlock
							text="Tickets"
							value={
								item.ticket_availability.has_available_tickets
									? 'Available'
									: 'Sold out'
							}
							color={
								item.ticket_availability.has_available_tickets
									? '#FFCC09'
									: '#FF2617'
							}
						/>
					</View>
					<CardButton
						color="#00CFB6"
						title="More"
						onPress={() =>
							this.showMore({
								itemId: item.id,
								image: item.logo.url,
								title: item.name.text
							})
						}
					/>
				</View>
			);
		} catch (e) {}
	};

	render() {
		const { events, loading, navigationSearch, city } = this.state;

		return (
			<View>
				<View style={styles.searchBarContainer}>
					<Searchbar
						selectionColor="#54BFA1"
						selectTextOnFocus
						placeholder="Enter City"
						onChangeText={city => this.setState({ city })}
						value={city}
						onSubmitEditing={() => this.searchByCity(city)}
						style={{ width: '85%', marginLeft: 5 }}
						keyboardType="web-search"
					/>
					{navigationSearch && <Spinner size="small" color="#54BFA1" />}
					{!navigationSearch && (
						<IconButton
							icon="my-location"
							color="grey"
							size={20}
							onPress={this.onLocationEventSearch}
						/>
					)}
				</View>

				{loading && (
					<View
						style={{
							flex: 1,
							marginTop: Dimensions.get('window').height / 3.4
						}}
					>
						<Spinner size="large" color="#54BFA1" />
					</View>
				)}

				{!loading && (
					<FlatList
						data={events}
						renderItem={this.cardJSX}
						keyExtractor={this.keyExtractor}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		elevation: 10,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 5,
		backgroundColor: '#fff',
		padding: 10,
		minHeight: 200
	},
	cardTop: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%'
	},
	cardMiddle: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
		width: '100%'
	},
	cardBottom: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 5
	},
	cardFooter: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 15,
		marginBottom: 5
	},
	searchBarContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10
	}
});
