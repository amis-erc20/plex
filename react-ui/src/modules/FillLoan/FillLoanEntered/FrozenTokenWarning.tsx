import * as React from "react";

import { FrozenTokenWarningWrapper } from "./styledComponents";

interface Props {
    tokenName: string;
}

export default class FrozenTokenWarning extends React.Component<Props, {}> {
    render() {
        const { tokenName } = this.props;

        return (
            <FrozenTokenWarningWrapper>
                The {tokenName} token in this order is currently frozen. Therefore, we are unable to
                fill this order at present.
            </FrozenTokenWarningWrapper>
        );
    }
}
