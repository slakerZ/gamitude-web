import React, { ReactElement } from "react";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";

import useHomePageStyles from "./styles";

const HomePage = (): ReactElement => {
    const classes = useHomePageStyles();

    return (
        <ParallaxProvider>
            <ParallaxBanner
                className="xd"
                layers={[
                    {
                        image:
                            "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
                        amount: 0.1,
                    },
                ]}
                style={{
                    height: "1000px",
                }}
            >
                <div />
            </ParallaxBanner>
            <ParallaxBanner
                className="xd"
                layers={[
                    {
                        image:
                            "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
                        amount: 0.1,
                    },
                ]}
                style={{
                    height: "500px",
                }}
            >
                <div />
            </ParallaxBanner>
            <ParallaxBanner
                className="xd"
                layers={[
                    {
                        image:
                            "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
                        amount: 0.1,
                    },
                ]}
                style={{
                    height: "500px",
                }}
            >
                <div />
            </ParallaxBanner>
            <ParallaxBanner
                className="xd"
                layers={[
                    {
                        image:
                            "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
                        amount: 0.1,
                    },
                ]}
                style={{
                    height: "500px",
                }}
            >
                <div />
            </ParallaxBanner>
            <ParallaxBanner
                className="xd"
                layers={[
                    {
                        image:
                            "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
                        amount: 0.1,
                    },
                ]}
                style={{
                    height: "500px",
                }}
            >
                <div />
            </ParallaxBanner>
            <ParallaxBanner
                className="xd"
                layers={[
                    {
                        image:
                            "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
                        amount: 0.1,
                    },
                ]}
                style={{
                    height: "500px",
                }}
            >
                <div />
            </ParallaxBanner>
            <ParallaxBanner
                className="xd"
                layers={[
                    {
                        image:
                            "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
                        amount: 0.1,
                    },
                ]}
                style={{
                    height: "500px",
                }}
            >
                <div />
            </ParallaxBanner>
            <ParallaxBanner
                className="xd"
                layers={[
                    {
                        image:
                            "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
                        amount: 0.1,
                    },
                ]}
                style={{
                    height: "500px",
                }}
            >
                <div />
            </ParallaxBanner>
        </ParallaxProvider>
    );
};

export default HomePage;
