import React from "react";
import {Name, Link, useLDflexList} from "@solid/react";
import { useTranslation } from "react-i18next";
import {Avatar, CircularProgress, ListItemText, ListItemIcon, ListItem, ListItemAvatar} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import FriendAvatar from "../FriendAvatar";
import { StylesProvider } from "@material-ui/core/styles";

const FriendItem = ({friendID, friendName, imageSrc,friendKnows, pending}) => {
    const { t } = useTranslation();
    const friendsList= useLDflexList(friendKnows);

    return(
        pending ?
        <ListItem>
            <ListItemIcon>
                <CircularProgress/>
            </ListItemIcon>
            <ListItemText
                primary={t("friends.loading")}
            />
        </ListItem> :
        <ListItem id="name_friend" button component="a" href={friendID}>
            <ListItemAvatar>
                <StylesProvider injectFirst>
                    <Avatar alt={friendName} src={imageSrc}/>
                </StylesProvider>
                
            </ListItemAvatar>
            <ListItemText primary={<Name src={friendID}/>}
            secondary={<Link href={friendID} children={t("friends.pod")}/>} 
            />

            <ListItemText primary={t("friends.title")}
            secondary={
                <AvatarGroup max={3} spacing="small">
                {friendsList.map((webId) => (
                   <FriendAvatar friendID={webId.value}/>
                 ))}
                </AvatarGroup>
            } 
            />
        </ListItem>
    );
};
export default FriendItem; 