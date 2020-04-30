import React from "react";
import {evaluateExpressions} from "@solid/react";
import FriendAvatar from "./friendAvatar.component";
import data from "@solid/query-ldflex";


const FriendAvatarEvaluator = evaluateExpressions(["friendID","friendName","imageSrc"], FriendAvatar);

export default (props) => <FriendAvatarEvaluator
          friendName={data[props.friendID].name}
          imageSrc={data[props.friendID].vcard_hasPhoto}
          />;
