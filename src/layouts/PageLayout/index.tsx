// External libraries
import * as React from "react";

// Components
import Icon from "../../components/Icon/Icon";
import LeftNavBar from "../LeftNavBar";

import { ToastContainer } from "../../components/Toast";

// Styled components
import {
    Container,
    Drawer,
    DrawerButton,
    Main,
    Content,
    Footer,
    FooterA,
    FooterLink,
    Layout,
    LayoutObfuscator,
    Header,
} from "./styledComponents";

interface State {
    screenWidth: number;
    drawerVisible: boolean;
}

/**
 * The number of pixels, below which the layout responds
 * to a mobile-friendly view.
 *
 * Currently set to the size of an iPad.
 *
 * @type {number}
 */
const LAYOUT_BREAK_POINT = 768;

class PageLayout extends React.Component<{}, State> {
    constructor(props: Object) {
        super(props);

        this.state = { screenWidth: 0, drawerVisible: false };

        this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
        this.handleCloseDrawer = this.handleCloseDrawer.bind(this);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ screenWidth: window.innerWidth });
    }

    handleOpenDrawer() {
        this.setState({ drawerVisible: true });
    }

    handleCloseDrawer() {
        this.setState({ drawerVisible: false });
    }

    render() {
        const { screenWidth, drawerVisible } = this.state;
        const hasDrawer = screenWidth > LAYOUT_BREAK_POINT;

        return (
            <Container>
                <Layout className={hasDrawer ? "has-drawer" : ""}>
                    <Drawer className={`Drawer ${drawerVisible ? "is-visible" : ""}`}>
                        <LeftNavBar handleCloseDrawer={this.handleCloseDrawer} />
                    </Drawer>

                    <Main className="Main">
                        <Header className="Header">
                            <DrawerButton role="button" onClick={this.handleOpenDrawer}>
                                <Icon icon="bars" />
                            </DrawerButton>
                        </Header>

                        <ToastContainer />

                        <Content className="Content">
                            {this.props.children}

                            <Footer>
                                <FooterLink to="/terms">Terms of Use</FooterLink>
                                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                                <FooterA
                                    href="https://airtable.com/shrMjBS1pyM1iAJzQ"
                                    target="_blank"
                                >
                                    Give Us Feedback
                                </FooterA>
                            </Footer>
                        </Content>
                    </Main>

                    <LayoutObfuscator
                        className={drawerVisible ? "is-visible" : ""}
                        onClick={this.handleCloseDrawer}
                    />
                </Layout>
            </Container>
        );
    }
}

export { PageLayout };
