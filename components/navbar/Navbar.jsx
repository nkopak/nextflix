import Link from 'next/link';
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './Navbar.module.css';
import { magic } from '../../lib/magic-client';

export const Navbar = () => {

  const [showDropdown, setShowDropdown] = useState();
  const [username, setUsername] = useState();

  const router = useRouter();

  useEffect(()=>{
    async function getEmail(){
      try {
        const {email} = await magic.user.getMetadata();
        setUsername(email);
      } catch (error) {
        console.error(`Error retrieving email ${error}`);
      }
    }
    getEmail();

  },[]);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      router.push('/login');
    } catch (error) {
      console.error(`Error signing out ${error}`);
      router.push('/login');

    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href='/'>
          <div className={styles.logoWrapper}>
            <Image src='/static/netflix.svg' alt='netflix logo' width={'128px'} height={'34px'}/>
          </div>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn}
              onClick={handleShowDropdown}
            >
              <p className={styles.username}>{username}</p>
              <Image src='/static/expand_more.svg' alt='Expand more logo' width={'24px'} height={'24px'}/>
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href='/login'>
                    <a className={styles.linkName} onClick={handleSignOut}>
                      Sign Out
                    </a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>)}
          </div>
        </nav>
      </div>
    </div>
  );
};
