import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { db } from '../helpers/firestore';
import myAuth from '../helpers/auth';
import Spinner from '../components/common/Spinner';
import FavouriteDescription from '../components/FavouriteDescription';

export default class Favour extends Component {
	static navigationOptions = {
		title: 'Favourites'
	};

	//INIT CUSTOM API HELPER
	myAuth = new myAuth();

	state = {
		events: null,
		user: ''
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

					this.setState({ events });
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

	//REDIRECT TO EVENT DETAILS AND PASS DATA ALONG
	goToEvent = (eventID, title) => {
		this.props.navigation.push('FavourDetails', { itemId: eventID, title });
	};

	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => (
		<ListItem
			title={item.name}
			subtitle={
				<FavouriteDescription
					date={item.date.local || "no date"}
					place={`${item.venue.address.address_1 || "no place"}, ${item.venue.address.city || "no city"}`}
				/>
			}
			leftAvatar={{
				size: 'large',
				rounded: false,
				source: { uri: item.logo || "" }
			}}
			onPress={() => this.goToEvent(item.eventID, item.name)}
			chevron={
				<Icon name="arrow-circle-right" type="font-awesome" color="#60D9C4" />
			}
		/>
	);

	render() {
		const { events } = this.state;
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
			</View>
		);
	}
}
