import { css, Global } from "@emotion/react"
import React from "react"

import fontAvenir300Woff from "../fonts/AvenirNextLTPro-UltLt/font.woff"
import fontAvenir300Woff2 from "../fonts/AvenirNextLTPro-UltLt/font.woff2"
import fontAvenir400Woff from "../fonts/AvenirNextLTPro-Regular/font.woff"
import fontAvenir400Woff2 from "../fonts/AvenirNextLTPro-Regular/font.woff2"
import fontAvenir700Woff from "../fonts/AvenirNextLTPro-Bold/font.woff"
import fontAvenir700Woff2 from "../fonts/AvenirNextLTPro-Bold/font.woff2"

export const Fonts = () => (
  <Global
    styles={css`
      /**
        * @license
        * MyFonts Webfont Build ID 3996156, 2021-01-11T09:40:44-0500
        *
        * The fonts listed in this notice are subject to the End User License
        * Agreement(s) entered into by the website owner. All other parties are
        * explicitly restricted from using the Licensed Webfonts(s).
        *
        * You may obtain a valid license at the URLs below.
        *
        * Webfont: AvenirNextLTPro-Bold by Linotype
        * URL: https://www.myfonts.com/fonts/linotype/avenir-next-pro/pro-bold/
        *
        * Webfont: AvenirNextLTPro-Regular by Linotype
        * URL: https://www.myfonts.com/fonts/linotype/avenir-next-pro/pro-regular/
        *
        * Webfont: AvenirNextLTPro-UltLt by Linotype
        * URL: https://www.myfonts.com/fonts/linotype/avenir-next-pro/pro-ultralight/
        *
        *
        * Webfonts copyright: Copyright &amp;#x00A9; 2004 - 2017 Monotype GmbH. All rights reserved.
        *
        * © 2021 MyFonts Inc
        */

      @font-face {
        font-family: "AvenirNextLTPro";
        src: url(${fontAvenir300Woff2}) format("woff2"),
          url(${fontAvenir300Woff}) format("woff");
        font-weight: 300;
        font-style: normal;
      }
      @font-face {
        font-family: "AvenirNextLTPro";
        src: url(${fontAvenir400Woff2}) format("woff2"),
          url(${fontAvenir400Woff}) format("woff");
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: "AvenirNextLTPro";
        src: url(${fontAvenir700Woff2}) format("woff2"),
          url(${fontAvenir700Woff}) format("woff");
        font-weight: 700;
        font-style: normal;
      }
    `}
  />
)
