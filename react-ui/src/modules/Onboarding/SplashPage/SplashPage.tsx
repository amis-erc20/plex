import * as React from "react";
import Hero from "./Hero/Hero";

export interface Props {
    // A function that gets invoked when the user agrees to enter the app.
    handleEnterApp: () => void;
}

export default class SplashPage extends React.Component<Props, {}> {
    render() {
        const { handleEnterApp } = this.props;

        return <Hero handleEnterApp={handleEnterApp} />
    }
}