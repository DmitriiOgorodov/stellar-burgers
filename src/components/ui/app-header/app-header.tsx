import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to={'/'} className={styles.link} end>
          {({ isActive }) => (
            <span className={styles.link_inner}>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={`text text_type_main-default ml-2 mr-10 ${isActive ? '' : 'text_color_inactive'}`}
              >
                Конструктор
              </p>
            </span>
          )}
        </NavLink>
        <NavLink to={'/feed'} className={styles.link}>
          {({ isActive }) => (
            <span className={styles.link_inner}>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}
              >
                Лента заказов
              </p>
            </span>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <NavLink to={'/profile'} className={styles.link}>
        {({ isActive }) => (
          <div className={styles.link_position_last}>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <p
              className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}
            >
              {userName || 'Личный кабинет'}
            </p>
          </div>
        )}
      </NavLink>
    </nav>
  </header>
);
