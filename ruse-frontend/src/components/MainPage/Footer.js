import { Link, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {

  const [lang, setLang] = useState('en');

  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    setLang(lang)
    i18n.changeLanguage(lang)
  };

  return (
    <div className='footer'>
      <div className='footerLogos'>
        <div>
          <Link href='https://reveal.si.usi.ch/' color='inherit'>
            <img src='Logo-REVEAL1.png' width='128px' alt='REVEAL'></img>
          </Link>
        </div>
        <div>
          <Link href='https://si.usi.ch/' color='inherit'>
            <img src='Logo-SI.png' width='128px' alt='Software Institute'></img>
          </Link> 
        </div>
        <div>
          <Link href='https://www.conservatorio.ch/it/scuola-universitaria' color='inherit'>
            <img src='Logo-CSI.png' width='128px' alt='Conservatorio della Svizzera Italiana'></img>  
          </Link>
        </div>
      </div>
      <div className='lastElFooter'>
        <div>
          <Select
              value={lang}
              onChange={handleChange}
              MenuProps={{
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
            >
            <MenuItem value='en'><span role='img' aria-label='england'>🇬🇧</span></MenuItem>
            <MenuItem value='it'><span role='img' aria-label='italy'>🇮🇹</span></MenuItem>
            <MenuItem value='fr'><span role='img' aria-label='france'>🇫🇷</span></MenuItem>
            <MenuItem value='de'><span role='img' aria-label='germany'>🇩🇪</span></MenuItem>
          </Select>
        </div>
        <div>
          <Link href='/credits' color='inherit'>
            Credits
          </Link>
        </div>
        <div>
          {"Copyright © "} {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}


export default Footer;