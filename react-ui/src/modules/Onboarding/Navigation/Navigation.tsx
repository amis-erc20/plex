// External libraries
import * as React from "react";
import { IndexLink, Link } from "react-router";

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
                            <Link to="https://docs.dharma.io">Developer Documentation</Link>
                        </MenuItem>

                        <MenuItem>
                            <Link to="https://chat.dharma.io/">Chat</Link>
                        </MenuItem>

                        <MenuItem>
                            <Link to="https://blog.dharma.io">Blog</Link>
                        </MenuItem>

                        <MenuItem>
                            <Link to="https://www.reddit.com/r/DharmaProtocol/">Reddit</Link>
                        </MenuItem>
                    </MenuRight>
                </NavBar>
            </NavBarContainer>
        );
    }
}
