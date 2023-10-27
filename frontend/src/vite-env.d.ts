/// <reference types="vite/client" />
import React from "react";
declare module "react" {
  interface IntrinsicElements {
    foreignObject: React.DetailedHTMLProps<
      React.SVGProps<SVGForeignObjectElement>,
      SVGForeignObjectElement
    >;
  }
}
