import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/common/Header';
import { useIntl } from 'react-intl';
import { Dropdown } from '@ux/uxcore2';
import { RootState, Website } from '../types';
import { IntlKeys } from '../constants/IntlKeys';
import { withLocale } from '../utils/hoc/withLocale';
import { apiActions } from '../redux/api';
import { websiteEntity as websiteFeature } from '../redux/features';
import { createUseStyles } from '../hooks/jss';

const useStyles = createUseStyles({
  '.home .content-header': { marginBottom: '1.25rem', marginLeft: '0.625rem' },
  '.home .banner': {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '24.375rem',
    overflow: 'auto hidden'
  },
  '.home .vertical-separator': {
    width: '0.0625rem',
    height: '100%',
    margin: '0 1rem',
    display: 'flex'
  },
  '.home .vertical-separator .vertical-line': {
    margin: 'auto',
    borderLeft: '1px solid #d4dbe0',
    height: '16rem',
    marginTop: '3rem'
  },
  '.home .section-title': {
    fontStyle: 'normal',
    fontWeight: '850',
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    color: '#004249'
  }
});

const WebsitesPage = () => {
  const intl = useIntl();
  const styles = useStyles();
  // const websites = useSelector<RootState, Website[]>((state) => state.website.ids);
  const websites = useSelector<RootState, Website[]>(websiteFeature.selectors.selectAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiActions.fetchWebsites());
  }, []);

  function changeRoute(website: Website) {
    /** need to trigger page reload to load proper shared-header **/
    window.location.href = `/website/${website.id}`;
  }

  if (process.env.NODE_ENV === 'production') {
    if (typeof window !== 'undefined')
      window.location.href = 'https://account.godaddy.com/products?go_redirect=disabled';
    return <div></div>;
  }

  return (
    <div className='home'>
      <Header />

      <Dropdown
        onChange={({ selected }: { selected: number }) => {
          changeRoute(websites[selected]);
        }}
        data-aid='websites-dropdown'
        type='select'
        name='websites'
        placeholder={intl.formatMessage({ id: IntlKeys.SELECT_WEBSITE })}
      >
        {websites &&
          websites.map((website, index) => (
            <Dropdown.DropdownItem key={index}>{website.domainName}</Dropdown.DropdownItem>
          ))}
      </Dropdown>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default withLocale(WebsitesPage);
