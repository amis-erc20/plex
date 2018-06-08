import * as React from "react";

import { Wrapper, ExplainerContent } from "./StyledComponents";

export default class Explainer extends React.Component<{}, {}> {
    render() {
        return (
            <Wrapper>
                <ExplainerContent>
                    <h2>What is Dharma Plex?</h2>
                    <p>
                        Dharma Plex is an easy way to open up a request for a loan of cryptoassets.
                        It was created as an example of what developers can build on top of{" "}
                        <a href="https://dharma.io">Dharma Protocol</a>.
                    </p>

                    <p>
                        It takes about 5 minutes to open a loan order, after which you will get a
                        link where the order can be filled.{" "}
                        <strong>Anyone who has this link can fill your loan order on Plex.</strong>
                    </p>
                </ExplainerContent>
            </Wrapper>
        );
    }
}
