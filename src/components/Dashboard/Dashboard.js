import * as React from "react";

import { Button } from "../Button/Button";
import { Image } from "../Image/Image";
import { Description } from "../Description/Description";

export function Dashboard({ Items, Opened, Current, CloseIt, Next, Previous }) {
  if (!Items) {
    return null;
  }

  if (!Items.length) {
    return null;
  }

  return (
    <div className={Opened ? "dashboard" : "hidden"}>
      <Button ButtonHandler={CloseIt} Class={"dashboard__closebtn"} />
      <Button ButtonHandler={Next} Class={"dashboard__nextbtn"} />
      <Button ButtonHandler={Previous} Class={"dashboard__previousbtn"} />
 
      <Image
        Src={Items[Current].media_fullsize} //media
      />
      <Description Desc={Items[Current].title} />
      <div className="spinner spinner-centr">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
      <div className="dashboard-background" />
    </div>
  );
}
