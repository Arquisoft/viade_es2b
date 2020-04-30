import React from "react";
import {Avatar,CircularProgress} from "@material-ui/core";

const FriendAvatar = ({friendName, imageSrc, pending}) => {

    return(
        pending 
        ? <CircularProgress/>
        : <Avatar alt={friendName} src={imageSrc} />
    );
}
export default FriendAvatar; 