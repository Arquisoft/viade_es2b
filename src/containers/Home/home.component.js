import React from 'react';
//import { Uploader } from '@inrupt/solid-react-components';
import { Trans } from 'react-i18next';
import {
  HomeWrapper,
  HomeCard,
  HomeSidenav,
  HomeBody,
  RouteMap,
  RouteInfo
} from './home.style';
import manejador from	
	'../../persistanceManagement';

/**
 * Hom Page UI component, containing the styled components for the Hom Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const HomePageContent = props => {
 // const { t } = useTranslation(); /* se puede pasar un mensaje prefefinido a Trans o usar t */
  const arrayRutas = manejador.seeRoutes();
  return (
    <HomeWrapper data-testid="home-wrapper">
      <HomeSidenav className="home-sidebar">
        <p> Menu donde se muestra la coleccion de rutas</p>
        {Array.from(arrayRutas).map((ruta)=>
		<a 
			href="#routes" key={ruta.name}>{ruta.name}
		</a>)}
      </HomeSidenav>
      <HomeBody className="home-body">
        <HomeCard className="card">
          <RouteMap className="map">
            <div>Aqui se deberia carga el mapa con la ruta</div> 
          </RouteMap>
          <RouteInfo>
            <Trans i18nKey="home.information">
                <h2>
                  text
                </h2>
            </Trans>
            <Trans i18nKey="home.ej_information">

              <p>
               text
                <a
                  href="https://github.com/inrupt/solid-react-sdk/tree/master#release-timeline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  text
                </a>
               text
              </p>
            </Trans>  
          </RouteInfo>
        </HomeCard>
      </HomeBody>
    </HomeWrapper>
  );
};
