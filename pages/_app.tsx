import React from "react";

import "../styles/globals.css";
import BSOD from "@/components/bsod";
import MetaTags from "@/components/metatags";

class ErrorBoundary extends React.Component<React.PropsWithChildren> {
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = false;
    }
    static getDerivedStateFromError(error: Error) {
        return error;
    }
    render() {
        if (this.state) {
            return (
                <>
                    <MetaTags title="This website ran into a problem and needs to be reloaded." />
                    <BSOD error={this.state as Error} />
                </>
            );
        }
        return this.props.children;
    }
}

export default function MyCustomApp({ Component, pageProps }) {
    return (
        <ErrorBoundary>
            <Component {...pageProps} />
        </ErrorBoundary>
    );
}
