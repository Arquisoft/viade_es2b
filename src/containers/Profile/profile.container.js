import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "@util-components";
import {Value,Link, useLDflexValue} from "@solid/react";
import {
  Header,
  ProfileContainer,
  ProfileWrapper,
  FormRenderContainer,
  ImageRounded
} from "./profile.style";
import data from "@solid/query-ldflex";

/**
 * We are using ldflex to fetch profile data from a solid pod.
 * ldflex libary is using json-LD for this reason you will see async calls
 * when we want to get a field value, why ? becuase they are expanded the data
 * this means the result will have a better format to read on Javascript.
 * for more information please go to: https://github.com/solid/query-ldflex
 */
type Props = { webId: String };

const Profile = ({ webId }: Props) => {
  const { t } = useTranslation();
  const [isLoading/*, setIsLoading*/] = useState(false);
  const inbox = useLDflexValue("user.inbox") || "unknown";
  const image = data[webId].vcard_hasPhoto;
  return (
    <ProfileWrapper data-testid="profile-component">
      <ProfileContainer>
        {webId && (
          <Fragment>    
            <Header>
              <ImageRounded src={image} />
            </Header>
            <FormRenderContainer>
            <h2><Value src="user.name"></Value></h2>
              <p>{t("navBar.profile")}:<Link href="user">{`${webId}`}</Link></p>
              <p>Inbox:<Link href="user.inbox">{`${inbox}`}</Link></p>
            </FormRenderContainer>
          </Fragment> 
        )}
        {isLoading && <Loader absolute />}
      </ProfileContainer>
    </ProfileWrapper>
  );
};

export default Profile;
