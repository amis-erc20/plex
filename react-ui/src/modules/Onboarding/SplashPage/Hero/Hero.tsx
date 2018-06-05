import * as React from "react";

import {
    Title,
    Slash,
    Wrapper,
    SubTitle,
    Description,
    BlocksBetweenContainer,
    Button,
    HeroContainer,
    SectionHeader
} from "./StyledComponents";

export interface Props {
    // A function that gets invoked when the user agrees to enter the app.
    handleEnterApp: () => void;
}

export default class Hero extends React.Component<Props, {}> {
    render() {
        const { handleEnterApp } = this.props;

        return (
            <SectionHeader>
                <BlocksBetweenContainer>
                    <HeroContainer>
                        <Wrapper>
                            <Title>Dharma Plex</Title>
                            <Slash
                                alt="logo"
                                src={require("../../../../assets/img/slash.svg")}
                            />
                        </Wrapper>
                        <SubTitle>Borrow and Lend Cryptoassets</SubTitle>
                        <Description>
                            Using Dharma Plex, borrowers and lenders can enter into tokenized
                            lending agreements without any intermediaries — for as little
                            as $1.50 in gas costs.
                        </Description>
                        <BlocksBetweenContainer>
                            <Button onClick={handleEnterApp}>Get Started</Button>
                        </BlocksBetweenContainer>
                    </HeroContainer>
                </BlocksBetweenContainer>
            </SectionHeader>
        );
    }
}