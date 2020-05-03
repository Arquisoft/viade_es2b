import React from "react";
import {evaluateExpressions} from "@solid/react";
import GroupFriendItem from "./groupfrienditem.component";
import data from "@solid/query-ldflex";


const FriendEvaluation = evaluateExpressions(["friendID","friendName","imageSrc"], GroupFriendItem);

export default (props) => <FriendEvaluation 
          friendID={data[props.friendID]}
          webIDString={props.friendID}
          group = {props.group}
          friendName={data[props.friendID].name}
          imageSrc={data[props.friendID].vcard_hasPhoto}
          />;
