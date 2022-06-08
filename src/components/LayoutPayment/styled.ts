import styled from "@emotion/styled";
import { Box, Typography, Button } from "@mui/material";

const text_normal = styled(Typography)(
  {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    padding: 0,
    textTransform: "none",
    // width: "100%",
  },
  (props: { color?: string; mw?: number | string }) => ({
    color: props.color ?? "#1b3459",
    maxWidth: props.mw,
  })
);

export const RowStyled = styled(Box)(
  {
    display: "flex",
    height: "100%",
  },
  (props: { width?: string | number; jContent?: string; aItems?: string }) => ({
    width: props.width ?? "100%",
    justifyContent: props.jContent ?? "space-between",
    alignItems: props.aItems ?? "center",
  })
);

export const ColStyled = styled(Box)(
  {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  (props: { jContent?: string; aItems?: string; mw?: string | number }) => ({
    justifyContent: props.jContent ?? "start",
    alignItems: props.aItems ?? "start",
    maxWidth: props.mw,
  })
);

export const LinedStyled = styled.div(
  {
    width: "100%",
    height: 1,
    borderTop: "1px solid #c7c9d9",
  },
  (props: { mw?: string | number; borderColor?: string }) => ({
    maxWidth: props.mw,
    borderColor: props.borderColor,
  })
);

export const WrapperBoxBorderStyled = styled(Box)(
  {
    width: "100%",
    border: "1px solid #e4e4e4",
    borderRadius: "20px",
  },
  (props: { mw?: number; padding?: string | number; height?: number }) => ({
    maxWidth: props.mw ?? 730,
    padding: props.padding ?? "20px 30px",
    height: props.height,
  })
);

export const Title28Styled = styled(text_normal)(
  {
    fontSize: 28,
    lineHeight: "33px",
  },
  (props: { fw?: number }) => ({ fontWeight: props.fw ?? 500 })
);

export const Title22Styled = styled(Title28Styled)(
  {
    fontSize: 22,
    lineHeight: "26px",
  },
  (props: { color?: string }) => ({ color: props.color ?? "#5a5a5a" })
);

export const Title20Styled = styled(Title28Styled)({
  fontSize: 20,
  lineHeight: "23px",
});

export const Text18Styled = styled(text_normal)(
  {
    fontSize: 18,
    lineHeight: "21px",
  },
  (props: { fw?: number }) => ({ fontWeight: props.fw })
);

export const Text18ItalicStyled = styled(Text18Styled)(
  { fontStyle: "italic" },
  (props: { fw?: number; color?: string }) => ({
    fontWeight: props.fw ?? 400,
    color: props.color ?? "#1b3459",
  })
);

export const Text14Styled = styled(Text18Styled)({
  fontSize: 14,
  lineHeight: "16px",
});

export const Text14ItalicStyled = styled(Text14Styled)({
  fontStyle: "italic",
});

export const Text12ItalicStyled = styled(Text14ItalicStyled)({
  fontSize: 12,
  lineHeight: "14px",
});

export const ButtonStyled = styled(Button)(
  {
    width: "100%",
    borderRadius: 8,
    textAlign: "center",
  },
  (props: {
    border?: string;
    height?: number;
    bg?: string;
    margin?: string | number;
    mw?: number | string;
  }) => ({
    margin: props.margin,
    border: props.border,
    height: props.height ?? 50,
    background: props.bg ?? "#ea242a",
    maxWidth: props.mw,
  })
);

export const ButtonNormalStyled = styled(ButtonStyled)`
  &: hover {
    background: #1b3459;
  }
`;

export const ButtonAction = styled(ButtonStyled)`
  &: hover {
    background: #ea242a;
  }
  &: disabled {
    background: #a4a4a4;
  }
`;
