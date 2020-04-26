import React, { useState } from 'react';
import i18n from '../../../../i18n'
import { Button, Select, MenuItem } from '@material-ui/core';
import { useLDflexList } from '@solid/react';
import { ShareWrapper } from './ShareComponent.style';

//import gestorPOD from '../../../persistanceManagement';

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
            {getFriends().map((friend) => <MenuItem value={`${friend}`} >{friend.value}</MenuItem>)}
        </Select>
    );
};

const listFriendsStyle = {
    minWidth: "200px",
    marginRight: '10px',
  };

export default class ShareComponent extends React.Component {

    constructor() {
        super();
        this.state = { loading: true, selectedFriend: "" };

        this.setSelectedFriend = this.setSelectedFriend.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    async componentDidMount() {
        /* this.setState( {loading: true }, () => {
            gestorPOD.seeRoutes().then((routes) => this.setState( {loading: false, routes: Array.from(routes)}) )
        }); */
    }

    setSelectedFriend(newSelectedFriend) {
        this.setState({selectedFriend: newSelectedFriend})
    }

    buttonClicked() {
        console.log(this.state.selectedFriend);
    }

    render() {
        return (
            this.props.route === undefined ? <ShareWrapper id="share"></ShareWrapper> :
                <ShareWrapper id="share">
                    <div>
                        <p>{i18n.t('home.share_text')}</p>
                        <ListFriends setSelectedFriend={this.setSelectedFriend}></ListFriends>
                        <Button onClick={this.buttonClicked} variant="contained" color="primary">{i18n.t('home.share_route')}</Button>
                    </div>
                </ShareWrapper>
        );
    }
}