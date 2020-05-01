/* eslint-disable constructor-super */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import { FriendsWrapper, FriendsCard} from "./friends.style";
import { Grid} from "@material-ui/core";
import {List} from "@solid/react";
import { Button } from '@material-ui/core';
import ModalGroupForm from "./components/ModalGroupForm/ModalGroupForm.component";
import gestorPOD from "../../services/persistanceManagement"
import FriendItem from "./components/FriendItem";

/**
 * A React component page that is displayed when the user wants to check his/her friends list and each 
 * friend"s routes.
 */
const Friends = (props) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [groups, setGroups] = useState([]);

  const showModalForm = (x) => {
    setModal(true);
  }

  const close = () => {
    setModal(false);
  }

  useEffect(async () => {
    async function getGroups() {
      const groups = await gestorPOD.seeGroups();
      setGroups(groups);
    }
    getGroups();
  }, [])

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
          {/* Cambia el codigo para mostrar los grupos como quieras, esto era para ver si se listaban */}
          {Array.from(groups).map((group) => <p>{group.name}</p>)}
          <Button onClick={e => {showModalForm()}} variant="contained" color="primary">{t('friends.createGroup')}</Button>
        </FriendsCard>
        <ModalGroupForm show={modal} closingFunction={close}></ModalGroupForm>
        </Grid>
      </Grid>
    </FriendsWrapper>
  );
};

export default Friends;
