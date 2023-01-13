import Link from 'next/link';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import APIService from '../../services/APIService';
import { Section, ContainerLogoLeague, ContainerSeasons } from './styles';

export default function LeagueDetails({ detailsLeagueSelected, seasonsLeague }) {
  const { currentTheme, theme } = useContext(ThemeContext);
  const setLogo = (
    theme === 'dark'
      ? detailsLeagueSelected.logos.dark
      : detailsLeagueSelected.logos.light);

  return (
    <Section theme={currentTheme}>
      <ContainerLogoLeague>
        <img
          src={setLogo}
          alt={detailsLeagueSelected.name}
        />
        <h2>{detailsLeagueSelected.name}</h2>
      </ContainerLogoLeague>
      <ContainerSeasons theme={currentTheme}>
        <strong>Temporadas</strong>
        <ul>
          {seasonsLeague.map((season) => (
            <Link href="/">
              <li key={season.year}>{season.year}</li>
            </Link>
          ))}
        </ul>
      </ContainerSeasons>
    </Section>
  );
}

LeagueDetails.propTypes = {
  detailsLeagueSelected: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logos: PropTypes.shape({
      light: PropTypes.string.isRequired,
      dark: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  seasonsLeague: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export async function getServerSideProps(context) {
  const detailsLeague = await APIService.listDetailsLeagueSelected(
    context.params.leagueId,
  );

  const seasonsLeague = await APIService.listSeasonsLeagueSelected(
    context.params.leagueId,
  );

  return {
    props: {
      detailsLeagueSelected: detailsLeague.data,
      seasonsLeague: seasonsLeague.data.seasons,
    },
  };
}
