import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Linking, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Spinner from '../components/common/Spinner';
import MapView from 'react-native-maps';
import Eventum from '../helpers/apiHelper';
import { Tile, PricingCard } from 'react-native-elements';
import { FAB, Portal, Provider } from 'react-native-paper';
import firebase from 'firebase';
import { db } from '../helpers/firestore';
import ListAddress from '../components/ListAddress';
import DetailsBlock from '../components/DetailsBlock';
import Moment from 'react-moment';

export default class EventDetails extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', 'Eventum')
		};
	};

	eventumAPI = new Eventum();

	state = {
		venue: null,
		location: {
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0.006757,
			longitudeDelta: 0.006866
		},
		open: false
	};

	async componentDidMount() {
		const events = await this.eventumAPI.getEventById(
			`${this.props.navigation.getParam('itemId')}`
		);

		this.setState(prevState => {
			return {
				venue: events,
				location: {
					...prevState.location,
					latitude: parseFloat(events.venue.address.latitude),
					longitude: parseFloat(events.venue.address.longitude)
				}
			};
		});
	}

	componentWillUnmount() {
		this.setState({ venue: null });
	}

	addToFavour = event => {
		//GET USER ID
		const user = firebase.auth().currentUser;

		const docRef = db
			.collection('users')
			.doc(user.uid)
			.collection('favours');

		//CHECK IF EVENT ALREADY HAS BEEN ADDED TO FAVOURITES

		let eventsArr = [];
		docRef
			.where('eventID', '==', event.eventID)
			.get()
			.then(snapShot => {
				snapShot.forEach(doc => {
					eventsArr.push(doc.data());
				});
				if (eventsArr.length > 0) {
					return;
				} else {
					//IF EVENT DOES NOT EXISTS, ADD IT
					docRef.add(event);
				}
			});
	};

	renderNode = (node, index, siblings, parent, defaultRenderer) => {
		if (node.name == 'img') {
			const a = node.attribs;
			return null;
		}
	};

	render() {
		const { venue, location } = this.state;
		if (!venue || !location.latitude) {
			return <Spinner color="#54BFA1" />;
		} else {
			return (
				<Provider>
					<ScrollView style={{ flex: 1 }} ref="scrollView">
						<Tile
							imageSrc={{ uri: venue.logo.url }}
							title={venue.name.text}
							featured
							caption={venue.venue.name}
							captionStyle={{ fontWeight: 'bold' }}
							overlayContainerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
						/>
						<DetailsBlock
							style={'title'}
							text={venue.name.text}
							textStyle={'titleText'}
						/>
						<DetailsBlock
							style={'organizer'}
							text={venue.organizer.description.text}
							textStyle={'organizerText'}
						/>
						<PricingCard
							color={
								venue.ticket_availability.has_available_tickets
									? '#54BFA1'
									: 'grey'
							}
							title={
								venue.ticket_availability.minimum_ticket_price.value > 0
									? 'Price'
									: 'Free'
							}
							price={venue.ticket_availability.minimum_ticket_price.major_value}
							info={['Format', `${venue.format.short_name}`]}
							button={{
								title: `${
									venue.ticket_availability.has_available_tickets
										? 'Get Tickets'
										: 'No More Tickets'
								}`,
								icon: 'insert-invitation'
							}}
							onButtonPress={() => {
								Linking.openURL(`${venue.url}#tickets`);
							}}
						/>
						<ListAddress
							heading={'Address'}
							title_addr={`${venue.venue.address.address_1}, ${
								venue.venue.address.city
							}`}
							title_addr_sec={`${venue.venue.address.city}, ${
								venue.venue.address.postal_code
							}`}
							icon_addr="place"
							time={
								<Moment element={Text} format="LLLL">
									{venue.start.local}
								</Moment>
							}
							icon_time="timer"
						/>
						<Portal>
							<FAB.Group
								open={this.state.open}
								icon={this.state.open ? 'today' : 'add'}
								actions={[
									{
										icon: 'star',
										label: 'Like',
										onPress: () =>
											this.addToFavour({
												eventID: venue.id,
												logo: venue.logo.url,
												name: venue.name.text,
												date: venue.start,
												currency: venue.currency,
												venue: venue.venue,
												tickets: venue.ticket_availability.minimum_ticket_price
											})
									},
									{
										icon: 'place',
										label: 'Map',
										onPress: () =>
											this.refs.scrollView.scrollToEnd({
												animated: true,
												duration: 2500
											})
									}
								]}
								onStateChange={({ open }) => this.setState({ open })}
							/>
						</Portal>
						<MapView
							initialRegion={this.state.location}
							style={styles.map}
							showsMyLocationButton={true}
							showsPointsOfInterest={true}
							toolbarEnabled={true}
						>
							<MapView.Marker
								coordinate={this.state.location}
								addLineBreaks={false}
							/>
						</MapView>
					</ScrollView>
				</Provider>
			);
		}
	}
}

const styles = StyleSheet.create({
	title: {
		margin: 13
	},
	titleText: {
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#000',
		fontSize: 20
	},
	map: {
		width: '100%',
		height: 300
	},
	organizer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		marginHorizontal: 13
	},
	organizerText: {
		textAlign: 'justify',
		lineHeight: 20.5
	}
});
