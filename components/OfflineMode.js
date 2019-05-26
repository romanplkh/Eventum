import React, { PureComponent } from 'react';
import OfflineBanner from './OfflineBanner';

class OfflineMode extends PureComponent {
	render() {
		return <OfflineBanner text="No internet connection" />;
	}
}

export default OfflineMode;
