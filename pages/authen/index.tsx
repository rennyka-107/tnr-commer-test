import Page from "@layouts/Page";
import dynamic from 'next/dynamic';


const DynamicAuthenPages = dynamic(() =>
    import("../../src/components/LayoutAuthen/AuthenPages").then(
        (m) => m.default,
        (e) => null as never
    )
);


const Authen = () => {

    return (
        <Page
            meta={{
                title: "TNR Ecommerce",
                description: "TNR Ecommerce",
                isHomePage: true,
            }}
        >
            <DynamicAuthenPages />
        </Page>
    )
}

export default Authen;


