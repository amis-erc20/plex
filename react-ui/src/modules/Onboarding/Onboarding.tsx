import * as React from "react";
import { TermsAgreement } from "./TermsAgreement";
import SplashPage from "./SplashPage/SplashPage";

export interface Props {
    agreeToTerms: boolean;
    handleSetError: (errorMessage: string) => void;
    handleAgreeToTerms: (agree: boolean) => void;
}

interface State {
    step: number;
}

export class Onboarding extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // Set up binding proactively for performance.
        this.handleEnterApp = this.handleEnterApp.bind(this);

        // Set default state.
        this.state = {
            step: 0,
        };
    }

    handleEnterApp() {
        this.setState({ step: 1 });
    }

    render() {
        const { agreeToTerms, handleSetError, handleAgreeToTerms } = this.props;
        const { step } = this.state;

        return (
            <div>
                {
                    step === 0
                        ? <SplashPage handleEnterApp={this.handleEnterApp} />
                        : <TermsAgreement
                            agreeToTerms={agreeToTerms}
                            handleSetError={handleSetError}
                            handleAgreeToTerms={handleAgreeToTerms}
                        />
                }
            </div>
        );
    }
}