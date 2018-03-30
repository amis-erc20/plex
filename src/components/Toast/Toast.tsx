import * as React from 'react';
import { Wrapper, StyledAlert } from './styledComponents';

interface Props {
	message: string;
	type: ToastType;
	handleClearToast: () => void;
}

interface State {
	visible: boolean;
}

export enum ToastType {
	Error = 'danger',
	Info = 'info',
	Success = 'success'
}

class Toast extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			visible: false
		};
		this.onDismiss = this.onDismiss.bind(this);
	}

	componentWillReceiveProps(nextProps: Props) {
		if (this.props.message !== nextProps.message && nextProps.message) {
			this.setState({ visible: true });
		}
	}

	onDismiss() {
		this.props.handleClearToast();
		this.setState({ visible: false });
	}

	render() {
		return (
			<Wrapper>
				{this.props.message && (
					<StyledAlert color={this.props.type} isOpen={this.state.visible} toggle={this.onDismiss}>
						{this.props.message}
					</StyledAlert>
				)}
			</Wrapper>
		);
	}
}

export { Toast };
