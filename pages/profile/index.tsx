import WithAuth from "@HOCs/WithAuth";
import Page from "@layouts/Page";
import dynamic from "next/dynamic";
import React from "react";

const DynamicProfilePages = dynamic(() =>
    import("../../src/components/LayoutProfile/ProfilePages").then(
        (m) => m.default,
        (e) => null as never
    )
);

const Profile = () => {
    return (
        <Page
            meta={{
                title: "TNR Ecommerce",
                description: "TNR Ecommerce",
                isHomePage: true,
            }}
        >
            <DynamicProfilePages />
        </Page>
    )
}
export default WithAuth(Profile);