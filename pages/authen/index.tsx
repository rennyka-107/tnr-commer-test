import styled from '@emotion/styled';
import Page from "@layouts/Page";
import { Tab, Tabs } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';


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


