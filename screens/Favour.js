import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { db } from '../helpers/firestore';
import myAuth from '../helpers/auth';
import Spinner from '../components/common/Spinner';
import FavouriteDescription from '../components/FavouriteDescription';
import Swipeout from 'react-native-swipeout';
import { Snackbar } from 'react-native-paper';
import { sortEventsDesc } from '../helpers/misc';

export default class Favour extends Component {
	static navigationOptions = {
		title: 'Favourites'
	};

	//INIT CUSTOM API HELPER
	myAuth = new myAuth();

	state = {
		events: null,
		user: '',
		snackBarVisible: false
	};

	//GET DATA
	getFavourites = () => {
		try {
			let events = [];
			db.collection('users')
				.doc(this.myAuth.getUser().uid)
				.collection('favours')
				.orderBy('date.local', 'asc')
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						let item = JSON.parse(JSON.stringify(doc.data()));
						events.push(item);
					});

					//Set state with sorted by desc events dates
					this.setState({ events: events.sort(sortEventsDesc) });
				});
		} catch (e) {
			console.log(e);
		}
	};

	//ADD LISTENER TO FETCH DATA WHEN TAB IS FOCUSED
	componentDidMount() {
		const { navigation } = this.props;
		this.focusListener = navigation.addListener('didFocus', () => {
			this.getFavourites();
		});
	}

	//REMOVE LISTENER
	componentWillUnmount() {
		this.focusListener.remove();
	}

	deleteItem = async item => {
		//GET USER ID
		const user = this.myAuth.getUser().uid;
		const favourEventsRef = db
			.collection('users')
			.doc(user)
			.collection('favours');
		let event = [];

		try {
			const query = await favourEventsRef.where('eventID', '==', item).get();

			await query.forEach(doc => {
				event.push(doc.id);
			});
		} catch (error) {
			console.log(`${error} : Item is not found`);
		}

		try {
			favourEventsRef
				.doc(event[0])
				.delete()
				.then(() => {
					this.getFavourites();
					//	this.setState({ snackBarVisible: true });
				})
				.then(() => {
					this.setState({ snackBarVisible: true });
				});
		} catch (error) {
			console.error('Error removing document: ', error);
		}
	};

	//REDIRECT TO EVENT DETAILS AND PASS DATA ALONG
	goToEvent = (eventID, title) => {
		this.props.navigation.push('FavourDetails', { itemId: eventID, title });
	};

	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => {
		const swipeoutBtns = [
			{
				text: 'Delete',
				backgroundColor: '#c90000',
				onPress: () => this.deleteItem(item.eventID)
			}
		];

		return (
			<Swipeout right={swipeoutBtns} backgroundColor="#54D68C" autoClose={true}>
				<View>
					<ListItem
						title={item.name}
						subtitle={
							<FavouriteDescription
								date={item.date.local || 'no date'}
								place={`${item.venue.address.address_1 || 'no place'}, ${item
									.venue.address.city || 'no city'}`}
							/>
						}
						leftAvatar={{
							size: 'large',
							rounded: false,
							source: { uri: item.logo || '' }
						}}
						onPress={() => this.goToEvent(item.eventID, item.name)}
						chevron={
							<Icon
								name="arrow-circle-right"
								type="font-awesome"
								color="#60D9C4"
							/>
						}
						onLongPress={() => {
							alert('pressed');
						}}
					/>
				</View>
			</Swipeout>
		);
	};

	render() {
		const { events, snackBarVisible } = this.state;
		return (
			<View style={{ flex: 1 }}>
				{!events && <Spinner color="#54BFA1" />}
				{events && (
					<FlatList
						keyExtractor={this.keyExtractor}
						data={this.state.events}
						renderItem={this.renderItem}
					/>
				)}
				<Snackbar
					duration={2500}
					visible={snackBarVisible}
					onDismiss={() => this.setState({ snackBarVisible: false })}
				>
					Event successfully deleted
				</Snackbar>
			</View>
		);
	}
}
