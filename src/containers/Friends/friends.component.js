/* eslint-disable constructor-super */
import React, { useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from 'notistack';
import { FriendsWrapper, FriendsCard } from "./friends.style";
import { Grid, ButtonGroup } from "@material-ui/core";
import { List } from "@solid/react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ModalGroupForm from "./components/ModalGroupForm/ModalGroupForm.component";
import gestorPOD from "../../services/persistanceManagement";
import FriendItem from "./components/FriendItem";
import GroupFriendItem from "./components/GroupFriendItem";

/**
 * A React component page that is displayed when the user wants to check his/her friends list and each 
 * friend"s routes.
 */
const Friends = (props) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const keySnackBar = Math.random();

  const showModalForm = (x) => {
    setModal(true);
  }

  const close = () => {
    setModal(false);
  };
  
  const showAlertDeleteGroups = () => {
    enqueueSnackbar(t("snackbar.alert_delete_groups"), {
      key: keySnackBar,
      preventDuplicate: true,
      variant: "warning",
      autoHideDuration: 3000,
      action: actionSnackbarDeleteAllGroups(keySnackBar, closeSnackbar, enqueueSnackbar, t),
    });
  }

  const actionSnackbarDeleteAllGroups = (key, closeSnackbar, enqueueSnackbar, t) => (
    <Fragment>
        <Button onClick={async () => {
              enqueueSnackbar(t("snackbar.delete_process"), {variant: "info", persist: true});
              await gestorPOD.deleteGroups().then(() => window.location.reload(false));
              }}>
            {t("snackbar.yes")}
        </Button>
        <Button onClick={async () => {
              closeSnackbar(key);
              }}>
            {t("snackbar.no")}
        </Button>
    </Fragment>
  );

  useEffect(() => {
    async function getGroups() {
      const groups = await gestorPOD.seeGroups();
      setGroups(groups);
    }
    getGroups();
  }, []);

  // Styles for Material UI
  const useStyles = makeStyles(() => ({
    ButtonGroup: {
      display: "flex",
      justifyContent: "center"
    },
  }));

  const classes = useStyles();

  return (
    <FriendsWrapper>
      <Grid container spacing={6}>
        {/*Friends section*/}
        <Grid item xs={12} md={6}>
          <h3 name="friends">{t("friends.title")}</h3>
          <FriendsCard className="friends-list">
            <List src="user.friends">
              {(friend) =>
                <FriendItem className="friend-item" friendID={friend.value} />
              }
            </List>
          </FriendsCard>
        </Grid>
        {/*Groups section*/}
        <Grid item xs={12} md={6}>
          <h3 name="groups">{t("groups.title")}</h3>
          <FriendsCard className="groups-list">
            {Array.from(groups).map((group) =>
              <div>
                <h4 id={group.name} >{group.name}</h4>
                <List src="user.friends">
                  {(friend) =>
                    <GroupFriendItem friendID={friend.value} group={group} />
                  }
                </List>
              </div>
            )}
            <ButtonGroup style={{ boxShadow: "none" }} className={classes.ButtonGroup}>
              <Button name="group_button" onClick={(e) => { showModalForm(); }} variant="contained" color="primary">{t("groups.createGroup")}</Button>
              <Button name="group_button_delete" onClick={showAlertDeleteGroups} variant="contained" color="secondary">{t("groups.deleteGroups")}</Button>
            </ButtonGroup>
          </FriendsCard>
          <ModalGroupForm show={modal} closingFunction={close}></ModalGroupForm>
        </Grid>
      </Grid>
    </FriendsWrapper>
  );
};

export default Friends;
