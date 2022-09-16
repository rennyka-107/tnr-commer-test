import {
  IconFacebookCircle,
  IconInstagramCircle,
  IconYoutubeCircle,
  Logo,
} from "@components/Icons";
import styled from "@emotion/styled";
import { responseUserManual } from "interface/userManual";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenralInfoAPI } from "../../../../pages/api/contactApi";
import { setGeneralInfo } from "../../../../store/generalInfoSlice";
import { RootState } from "../../../../store/store";

interface ItemValueUserProps {
  id: number;
  value: string;
}

interface ItemValueProps {
  id: string;
  name: string;
}

interface MenuProps {
  listMenuBarProjectType?: ItemValueProps[];
  listUserManual: responseUserManual[];
}
const WrapFooterBot = styled.div`
  min-height: 360px;
  background: #1b3459;
  padding: 0 10rem;
  color: #c7c9d9;

  @media (max-width: 585px) {
    padding: 0 2rem;
  }
`;
const WrapContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 61px;
  word-break: break-word;

  @media (max-width: 1100px) {
    gap: 1.5em;
    flex-wrap: wrap;
  }
`;

const BlockDiv = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  :nth-child(1) {
    width: 30%;
  }

  @media (max-width: 1110px) {
    :nth-child(1) {
      width: 100%;
    }

    :nth-child(2) {
      width: 45%;
    }
    :nth-child(3) {
      width: 45%;
    }
  }
`;
const TitleTypo = styled.span`
  font-weight: 700;
`;
const LineInfo = styled.p`
  margin: 0;
  line-height: 26px;
`;
const LineInfo2 = styled.a`
  margin: 0;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
`;
const LineInfoFirst = styled.p`
  margin-bottom: 0;
  line-height: 26px;
`;

const IconsBlock = styled.div`
  display: flex;
  justify-content: space-around;
`;
type Props = {};

const FooterBot = ({ listMenuBarProjectType, listUserManual }: MenuProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getGenralInfoAPI().then((res) => {
      dispatch(setGeneralInfo(res.responseData));
    });
  }, []);
  const generalInfo = useSelector((state: RootState) => state.generalInfo);

  return (
    <WrapFooterBot>
      <Link href="https://tnre-customer-test.vercel.app">
        <a>
          <Logo style={{ width: 148, height: 56, margin: "56px 0 28px 0" }} />
        </a>
      </Link>
      <WrapContent>
        <BlockDiv>
          {generalInfo?.companyName ?? ""}
          <LineInfoFirst>
            <TitleTypo>Địa chỉ: {""}</TitleTypo>
            {generalInfo?.address ?? ""}
          </LineInfoFirst>
          <LineInfo>
            <TitleTypo>Tel: {""}</TitleTypo>
            {generalInfo.phoneNumber}
          </LineInfo>
          <LineInfo>
            <TitleTypo>Email: {""}</TitleTypo>
            {generalInfo?.email ?? ""}
          </LineInfo>
          <LineInfo style={{ marginTop: 5 }}>
            <TitleTypo>
              TNR Version {process.env.NEXT_PUBLIC_VERSION} Copyright © tnrholdings.com.vn {""}
            </TitleTypo>
          </LineInfo>
        </BlockDiv>
        <BlockDiv
          style={{ display: "flex", gap: ".5em", flexDirection: "column" }}
        >
          <TitleTypo style={{ fontSize: "18px" }}>SẢN PHẨM</TitleTypo>
          {listMenuBarProjectType?.map((item, index) => (
            <LineInfo2
              key={index}
              onClick={() => {
                Router.replace(`/projectTNR?type=${item.id}`);
              }}
            >
              {item.name}
            </LineInfo2>
          ))}
        </BlockDiv>
        <BlockDiv
          style={{ display: "flex", gap: ".5em", flexDirection: "column" }}
        >
          <TitleTypo style={{ fontSize: "18px" }}>HỖ TRỢ</TitleTypo>
          {listUserManual?.map((item, index) => (
            <LineInfo2
              key={index}
              onClick={() => {
                Router.replace(
                  `/buyingGuide?idUserManual=${item.id}&&selected=${index}`
                );
              }}
            >
              {item.name}
            </LineInfo2>
          ))}
          <LineInfo2
            onClick={() => {
              Router.replace(`/contact`);
            }}
          >
            Liên hệ
          </LineInfo2>
        </BlockDiv>
        <BlockDiv
          style={{ display: "flex", gap: "2em", flexDirection: "column" }}
        >
          <IconsBlock>
            <IconYoutubeCircle />
            <IconInstagramCircle />
            <IconFacebookCircle />
          </IconsBlock>
          <Image
            src="/images/BCT.png"
            width={135}
            height={51}
            alt="image-thuong-hieu"
            objectFit="cover"
          />
        </BlockDiv>
      </WrapContent>
    </WrapFooterBot>
  );
};
export default FooterBot;
