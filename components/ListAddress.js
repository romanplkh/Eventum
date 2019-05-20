import React from 'react';
import { List } from 'react-native-paper';

const ListAddress = props => {
	return (
		<List.Section>
			<List.Subheader>Time</List.Subheader>
			<List.Item
				title={props.time}
				left={() => <List.Icon icon={props.icon_time} />}
			/>
			<List.Subheader>{props.heading}</List.Subheader>
			<List.Item
				title={props.title_addr}
				description={props.title_addr_sec}
				left={() => <List.Icon icon={props.icon_addr} />}
			/>
		</List.Section>
	);
};

export default ListAddress;
