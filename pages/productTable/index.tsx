import Page from "@layouts/Page"
import dynamic from "next/dynamic";


const DynamicProductTablePages = dynamic(() =>
    import("../../src/components/LayoutProductTable/ProductTablePages").then(
        (m) => m.default,
        (e) => null as never
    )
);


const ProductTable = () => {
    return (
        <Page
            meta={{
                title: "TNR Ecommerce",
                description: "TNR Ecommerce",
                isHomePage: true,
            }}
        >
            <DynamicProductTablePages />
        </Page>
    )
}

export default ProductTable;