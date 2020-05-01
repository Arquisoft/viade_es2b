import React, { useState } from 'react';
import i18n from '../../../../i18n'
import { Button, Select, MenuItem } from '@material-ui/core';
import { useLDflexList, Value } from '@solid/react';
import { ShareWrapper } from './ShareComponent.style';

import { useNotification, NotificationTypes } from '@inrupt/solid-react-components';

import gestorPOD from '../../../../services/persistanceManagement';
import { toast } from 'react-toastify';

const ShareButton = (props) => {

    const [webID, setWebID] = useState("");

    const { createNotification, discoverInbox } = useNotification(webID);

    const handleClickButtonShare = async () => {

        setWebID(await gestorPOD.getWebID());

        const inboxUrl = await discoverInbox(props.selectedFriend);

        let routeToShare = props.route;
        routeToShare.priv = false;

        gestorPOD.shareRoute(routeToShare, props.selectedFriend);

        if (!inboxUrl) {
            return console.log("Inbox not found");
        }

        try {
            createNotification(
                {
                    title: i18n.t("share.notification_title"),
                    summary: i18n.t("share.notification_content"),
                    actor: webID
                },
                inboxUrl,
                NotificationTypes.ANNOUNCE
            );
        } catch (error) {
            console.log(error);
        }

        toast.info(i18n.t("share.notification_sended"));

    }

    return <Button onClick={handleClickButtonShare} variant="contained" color="primary">{i18n.t('home.share_route')}</Button>
}

function ListFriends(props) {

    const [selectedFriend, setSelectedFriend] = useState("");


    function getFriends() {
        const friends = useLDflexList('user.friends');
        return friends;
    };

    function handleChange(event) {
        setSelectedFriend(event.target.value);
        props.setSelectedFriend(event.target.value);
    };


    return (
        <Select style={listFriendsStyle} value={selectedFriend} onChange={handleChange}>
            {getFriends().map((friend) =>
                <MenuItem key={friend} value={`${friend}`} >
                    <Value src={`[${friend}].name`}>{`${friend}`}</Value>
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
        this.state = { loading: true, selectedFriend: "" };

        this.setSelectedFriend = this.setSelectedFriend.bind(this);
    }

    async componentDidMount() {
        /* this.setState( {loading: true }, () => {
            gestorPOD.seeRoutes().then((routes) => this.setState( {loading: false, routes: Array.from(routes)}) )
        }); */
    }

    setSelectedFriend(newSelectedFriend) {
        this.setState({ selectedFriend: newSelectedFriend })
    }

    render() {
        return (
            this.props.route === undefined ? <ShareWrapper id="share"></ShareWrapper> :
                <ShareWrapper id="share">
                    <div>
                        <p>{i18n.t('home.share_text')}</p>
                        <ListFriends setSelectedFriend={this.setSelectedFriend}></ListFriends>
                        <ShareButton route={this.props.route} selectedFriend={this.state.selectedFriend}></ShareButton>
                    </div>
                </ShareWrapper>
        );
    }
}