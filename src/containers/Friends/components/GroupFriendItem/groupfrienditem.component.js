import React from "react";
import {Name} from "@solid/react/";
import {Avatar, ListItemText,ListItem, ListItemAvatar} from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";

const GroupFriendItem = ({friendID, webIDString, group, friendName, imageSrc}) => {
    return(
        (group.members === undefined || !Array.from(group.members).includes(webIDString)) ?
        <ListItem></ListItem> :
        <ListItem button component="a" href={friendID}>
            <ListItemAvatar>
                <StylesProvider injectFirst>
                    <Avatar alt={friendName} src={imageSrc}/>
                </StylesProvider>
            </ListItemAvatar>
            <ListItemText primary={<Name src={friendID}/>}/>
        </ListItem>
    );
};
export default GroupFriendItem; 