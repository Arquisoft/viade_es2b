import React from "react";
import {evaluateExpressions} from "@solid/react";
import FriendItem from "./friendItem.component";
import data from "@solid/query-ldflex";


const FriendEvaluation = evaluateExpressions(["friendID","friendName","imageSrc"], FriendItem);

export default (props) => <FriendEvaluation 
          friendID={data[props.friendID]}
          friendName={data[props.friendID].name}
          imageSrc={data[props.friendID].vcard_hasPhoto}
          friendKnows={data[props.friendID].friend}
          />;
