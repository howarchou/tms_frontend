/**
 *  Created by pw on 2020/9/20 3:52 下午.
 */
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import Cookies from 'js-cookie';
import './Header.less';
import * as Storage from '@/lib/storage';
import { MenuIF } from '@/components/header/types';
import Logo from '../../images/home/logo.png';
import LocationPNG from '../../images/home/location.png';
import UPPNG from '../../images/home/up.png';
import DownPNG from '../../images/home/down.png';
import TELPNG from '../../images/home/tel.png';
import { __MENU_ } from '@/lib/Conts';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { isBrowser } from 'umi';
export default function() {
  return (
    <div className="header-wrapper">
      <div className="header-left">
        <Slogan />
        <Area />
        <MenuCP />
      </div>
      <ContactUS />
    </div>
  );
}

function Slogan() {
  const handleClick = () => {
    history.push({ pathname: '/' });
  };

  return (
    <div className="header-slogan" onClick={handleClick}>
      <img alt="logo" className="slogna-icon" src={Logo} />
    </div>
  );
}

const citys = [
  {
    title: '北京',
    value: 11,
    contact: '18511901760',
  },
  {
    title: '上海',
    value: 31,
    contact: '021-65667525',
  },
];

if (!Storage.get(Storage.STORAGE_KEY_AREA)) {
  Storage.save(Storage.STORAGE_KEY_AREA, 11);
}


function Area() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const [open, setOpen] = useState(false);

  const cityId = Storage.get(Storage.STORAGE_KEY_AREA) || 11;
  const [location, setLocation] = useState(
    citys.find(c => c.value === cityId)?.title,
  );
  const handleClick = (event: React.MouseEvent<any>) => {
    setIcon(icon === 'down' ? 'up' : 'down');
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLocation = (city: { title: string; value: number }) => {
    Storage.save(Storage.STORAGE_KEY_AREA, city.value);
    setLocation(city.title);
    handleClose();
    window.location.reload();
  };

  const [icon, setIcon] = useState('down');

  return (
    <div className="header-area" onClick={handleClick}>
      <img alt="location" className="location-png" src={LocationPNG} />
      <div className="location">{location}</div>
      <img alt="icon" className="area-arrow" src={icon === 'down' ? DownPNG : UPPNG} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {citys.map(city => (
          <MenuItem
            key={`menu-item-${city.value}`}
            onClick={() => changeLocation(city)}
          >
            {city.title}
          </MenuItem>
        ))}
        {/*<MenuItem onClick={handleClose}>江苏</MenuItem>*/}
        {/*<MenuItem onClick={handleClose}>浙江</MenuItem>*/}
      </Menu>
    </div>
  );
}

function MenuCP() {
  const defalutMenu = Cookies.getJSON(__MENU_) as MenuIF;
  const defaultMenuStr = defalutMenu?.id ?? 'home';
  const [selectMenu, setSelectMenu] = useState(defaultMenuStr);
  useEffect(() => {
    if (location.pathname === '/') {
      setSelectMenu('home');
    } else if (~location.pathname.indexOf('teambuilding')) {
      setSelectMenu('teambuilding');
    } else {
      setSelectMenu(defaultMenuStr);
    }
  }, [defaultMenuStr]);
  const menus: MenuIF[] = [
    {
      id: 'home',
      label: '首页',
      href: '/',
    },
    {
      id: 'teambuilding',
      label: '团建',
      href: '/teambuilding',
    },
    // {
    //   id: 'annualMeeting',
    //   label: '年会',
    //   href: '',
    // },
    {
      id: 'case',
      label: '案例',
      href: '/case',
    },
    // {
    //   id: 'travel',
    //   label: '自由行',
    //   href: '',
    // },
    {
      id: 'partners',
      label: '合作伙伴',
      href: '/partner',
    },
    {
      id: 'about',
      label: '关于我们',
      href: '/about',
    },
  ];

  const handleOnClick = (item: MenuIF) => {
    const menu = menus.find(m => m.id === item.id) as MenuIF;
    setSelectMenu(menu.id);
    history.push({ pathname: menu.href });
    Cookies.set(__MENU_, menu);
  };

  return (
    <div className="header-menu">
      {menus.map(item => {
        return (
          <div
            key={item.id}
            className={`menu-item-wrapper ${
              selectMenu === item.id ? 'menu-item-wrapper-select' : ''
            }`}
            onClick={() => handleOnClick(item)}
          >
            <div className="menu-item">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function ContactUS() {
  const cityId = Storage.get(Storage.STORAGE_KEY_AREA) || 11;
  const contact = citys.find(c => c.value === cityId)?.contact;
  return (
    <a className="contact-us" href={`tel:${contact}`}>
      <img alt="icon" className="tel-icon" src={TELPNG} />
      <span className="tel">{contact}</span>
    </a>
  );
}
