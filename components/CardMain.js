/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */
/* DELETE */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardImage from './CardImage';
import Calendar from './Calendar';
import CardShortDescription from './CardShortDes';
import CardOrganizator from './CardOrganizator';
import CardBlock from './CardBlock';
import CardButton from './CardButton';

const CardMain = props => {
	console.log(props);
	return (
		<View style={styles.container}>
			<View style={styles.cardTop}>
				<CardImage source={props.item.logo.url} />
			</View>
			<View style={styles.cardMiddle}>
				<Calendar>{props.item.start.local}</Calendar>
				<CardShortDescription
					title={props.item.name.text}
					place={props.item.venue.name}
					date={props.item.start.local}
				/>
			</View>
			<View style={styles.cardBottom}>
				<CardOrganizator organizator={props.item.organizer.description.text} />
			</View>
			<View style={styles.cardFooter}>
				<CardBlock
					text="Price"
					value={props.item.ticket_availability.minimum_ticket_price.display}
					color="darkorange"
				/>
				<CardBlock text="Category" value={'ROMAN'} color="#0086F2" />
				<CardBlock
					text="Tickets"
					value={
						props.item.ticket_availability.has_available_tickets
							? 'Available'
							: 'Sold out'
					}
					color={
						props.item.ticket_availability.has_available_tickets
							? '#00CFB6'
							: '#FF2617'
					}
				/>
			</View>
			<CardButton
				color="#00CFB6"
				title="More"
				onPress={() =>
					props.showMore({
						itemId: props.item.id,
						image: props.item.logo.url,
						title: props.item.name.text
					})
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'space-around',
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
		justifyContent: 'space-around'
	}
});

export default CardMain;
