// External libraries
import * as React from "react";
import { IndexLink } from "react-router";

// Styled components
import {
    BrandLogo,
    LogoContainer,
    NavBar,
    NavBarContainer,
    MenuRight,
    MenuItem,
} from "./StyledComponents";

export class Navigation extends React.Component<{}, {}> {
    render() {
        return (
            <NavBarContainer>
                <NavBar>
                    <LogoContainer>
                        <IndexLink to="/">
                            <BrandLogo src={require("../../../assets/img/logo_color.png")} />
                        </IndexLink>
                    </LogoContainer>

                    <MenuRight>
                        <MenuItem>
                            <a href="https://docs.dharma.io" target="_blank">
                                Developer Documentation
                            </a>
                        </MenuItem>

                        <MenuItem>
                            <a href="https://chat.dharma.io" target="_blank">
                                Chat
                            </a>
                        </MenuItem>

                        <MenuItem>
                            <a href="https://blog.dharma.io" target="_blank">
                                Blog
                            </a>
                        </MenuItem>

                        <MenuItem>
                            <a href="https://www.reddit.com/r/DharmaProtocol/" target="_blank">
                                Reddit
                            </a>
                        </MenuItem>
                    </MenuRight>
                </NavBar>
            </NavBarContainer>
        );
    }
}
