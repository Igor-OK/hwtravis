import * as React from "react";

// import { Button } from "../Button/Button";
// import { Image } from "../Image/Image";
// import { Description } from "../Description/Description";

export function Dashboard({ Items, Opened, Current, CloseIt, Next, Previous }) {
  if (!Items) {
    return null;
  }

  if (!Items.length) {
    return null;
  }

  return (
    <div className={Opened ? "dashboard" : "hidden"}>
      <h1>HELLO</h1>
    </div>
  );
}
