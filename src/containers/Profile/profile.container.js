import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { FormModel } from "@inrupt/solid-react-components";
//import { successToaster, errorToaster } from "@utils";
import { Loader } from "@util-components";
import {Value, List, Link, useLDflexValue} from "@solid/react";
import {
  Header,
  ProfileContainer,
  ProfileWrapper,
  FormRenderContainer,
  WebId
} from "./profile.style";
import { Image } from "./components";
//import { AutoSaveSpinner } from "@components";
//import data from "@solid/query-ldflex";


const defaultProfilePhoto = "./img/icon/empty-profile.svg";

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
  const email = useLDflexValue('user.inbox') || 'unknown';
 
/*
  const onError = e => {
    if (e.message.toString().indexOf("Validation failed") < 0) {
      errorToaster(t("formLanguage.renderer.formNotLoaded"), t("notifications.error"), {
        label: t("errorFormRender.link.label"),
        href: t("errorFormRender.link.href")
      });
    }
  };

  const onDelete = () => {
    successToaster(t("formLanguage.renderer.fieldDeleted"), t("notifications.success"));
  };

  const onAddNewField = () => {
    successToaster(t("formLanguage.renderer.fieldAdded"), t("notifications.success"));
  };
*/

  return (
    <ProfileWrapper data-testid="profile-component">
      <ProfileContainer>
        {webId && (
          <Fragment>    
            <Header>
              <Image
                {...{
                  webId,
                  defaultProfilePhoto
                }}
              />
            </Header>

            <FormRenderContainer>
            <h2><Value src="user.name"></Value></h2>
              <WebId>
                <p>{t('navBar.profile')}:<Link href="user">{`${webId}`}</Link></p>
                <p>Inbox:<Link href="user.inbox">{`${email}`}</Link></p>
              </WebId>
            </FormRenderContainer>
            <h2> {t("friends.title")}</h2>
            <List src="user.friends">
              {(friend)=> <a href={`${friend}`} target="_blank" rel="noopener noreferrer">{`${friend}`}<br/></a>}
            </List>
          </Fragment>
        
        )}
        {isLoading && <Loader absolute />}
      </ProfileContainer>
    </ProfileWrapper>
  );
};

export default Profile;
