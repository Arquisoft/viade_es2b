/* eslint-disable constructor-super */
import React from "react";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import { FriendsWrapper, FriendsCard} from "./friends.style";
import { Grid} from "@material-ui/core";
import {List} from "@solid/react";


import FriendItem from "./components/FriendItem";

/**
 * A React component page that is displayed when the user wants to check his/her friends list and each 
 * friend"s routes.
 */
const Friends = (props) => {
  const { t } = useTranslation();
  return (
    <FriendsWrapper>
      <Grid container spacing={6}>
        {/*Friends section*/}
        <Grid item xs={12} md={6}>
          <h3>{t("friends.title")}</h3>
          <FriendsCard>
            <List src ="user.friends">
            {(friend)=> 
              <FriendItem friendID={friend.value}/>
            }
            </List>
          </FriendsCard>
        </Grid>
        {/*Groups section*/}
        <Grid item xs={12} md={6}>
        <h3>{t("groups.title")}</h3>
        <FriendsCard>

        </FriendsCard>
        </Grid>
      </Grid>
           
         
           
         
    </FriendsWrapper>
  );
};

export default Friends;
