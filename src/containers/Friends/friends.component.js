/* eslint-disable constructor-super */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import { FriendsWrapper, FriendsCard} from "./friends.style";
import { Grid} from "@material-ui/core";
import {List} from "@solid/react";
import { Button } from '@material-ui/core';
import ModalGroupForm from "./components/ModalGroupForm/ModalGroupForm.component";
import gestorPOD from "../../services/persistanceManagement"
import FriendItem from "./components/FriendItem";

async function getGroups() {
  var groups = await gestorPOD.seeGroups();
  console.log(groups);
  return groups;
}

/**
 * A React component page that is displayed when the user wants to check his/her friends list and each 
 * friend"s routes.
 */
const Friends = (props) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [groups, setGroups] = useState(getGroups());

  const showModalForm = (x) => {
    setModal(true);
  }

  const close = () => {
    setModal(false);
  }

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
          {Array.from(groups).forEach((group) => 
            console.log(group.name)
          )}
          <Button onClick={e => {showModalForm()}} variant="contained" color="primary">{t('friends.createGroup')}</Button>
        </FriendsCard>
        <ModalGroupForm show={modal} closingFunction={close}></ModalGroupForm>
        </Grid>
      </Grid>
    </FriendsWrapper>
  );
};

export default Friends;
