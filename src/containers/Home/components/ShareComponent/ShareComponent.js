import React, { useState } from 'react';
import i18n from '../../../../i18n'
import { Button, Select, MenuItem } from '@material-ui/core';
import { useLDflexList, Value } from '@solid/react';
import { ShareWrapper } from './ShareComponent.style';

import { useNotification, NotificationTypes } from '@inrupt/solid-react-components';

import gestorPOD from '../../../../services/persistanceManagement';
import { toast } from 'react-toastify';

const ShareButton = (props) => {

    toast.configure({
        autoClose: 500,
        draggable: true,
      });

    const [webID, setWebID] = useState("");

    const { createNotification, discoverInbox } = useNotification(webID);

    const handleClickButtonShare = async () => {

        setWebID(await gestorPOD.getWebID());

        let routeToShare = props.route;
        routeToShare.priv = false;

        const arrayToIterate = props.selectedGroup.length > 0 ? props.selectedGroup : [props.selectedFriend];

        for (let i = 0; i < arrayToIterate.length; i++) {
            gestorPOD.shareRoute(routeToShare, arrayToIterate[i]);

            const inboxUrl = await discoverInbox(arrayToIterate[i]);

            if (!inboxUrl) {
                return console.log("Inbox not found");
            }

            try {
                const actor = "Viade_es2b";
                createNotification(
                    {
                        title: i18n.t("share.notification_title"),
                        summary: i18n.t("share.notification_content"),
                        actor: actor
                    },
                    inboxUrl,
                    NotificationTypes.ANNOUNCE
                );
            } catch (error) {
                console.log(error);
                toast.error(i18n.t("share.toast_error") + arrayToIterate[i]);
            }

        }

        toast(i18n.t("share.notification_sended"));

    }

    return <Button onClick={handleClickButtonShare} variant="contained" color="primary">{i18n.t('home.share_route')}</Button>
}

function ListFriendsGroups(props) {

    const [selectValue, setSelectValue] = useState("[]");
    const [groups, setGroups] = useState([]);

    function getFriends() {
        const friends = useLDflexList('user.friends');
        gestorPOD.seeGroups().then(groups => setGroups(groups));
        return friends;
    };

    function handleChange(event) {
        // If the selected is a group
        if (event.target.value.members !== undefined) {
            setSelectValue(event.target.value.name);
            props.setSelectedFriend("");
            props.setSelectedGroup(event.target.value.members)
        } else {
            setSelectValue(event.target.value);
            props.setSelectedFriend(event.target.value);
            props.setSelectedGroup([]);
        }
    };

    return (
        <Select style={listFriendsStyle} renderValue={() => selectValue} onChange={handleChange}>
            {getFriends().map((friend) =>
                <MenuItem key={friend} value={`${friend}`} >
                    <Value src={`[${friend}].name`}>{`${friend}`}</Value>
                </MenuItem>)}
            {groups.map((group) =>
                <MenuItem key={group.id} value={group} >
                    {group.name}
                </MenuItem>)}
        </Select>
    );
};

const listFriendsStyle = {
    minWidth: "200px",
    marginRight: '10px',
};

export default class ShareComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, selectedFriend: "", selectedGroup: [] };

        this.setSelectedFriend = this.setSelectedFriend.bind(this);
        this.setSelectedGroup = this.setSelectedGroup.bind(this);
    }

    async componentDidMount() {
        /* this.setState( {loading: true }, () => {
            gestorPOD.seeRoutes().then((routes) => this.setState( {loading: false, routes: Array.from(routes)}) )
        }); */
    }

    setSelectedFriend(newSelectedFriend) {
        this.setState({ selectedFriend: newSelectedFriend })
    }

    setSelectedGroup(newSelectedGroup) {
        this.setState({ selectedGroup: newSelectedGroup })
    }

    render() {
        return (
            this.props.route === undefined ? <ShareWrapper id="share"></ShareWrapper> :
                <ShareWrapper id="share">
                    <div>
                        <p>{i18n.t('home.share_text')}</p>
                        <ListFriendsGroups setSelectedGroup={this.setSelectedGroup} setSelectedFriend={this.setSelectedFriend}></ListFriendsGroups>
                        <ShareButton route={this.props.route} selectedFriend={this.state.selectedFriend} selectedGroup={this.state.selectedGroup}></ShareButton>
                    </div>
                </ShareWrapper>
        );
    }
}