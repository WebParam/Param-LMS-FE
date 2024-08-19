import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

function Steppers() {
    const pathName = usePathname();
  const isActive = (path:any) => pathName === path;

  return (
    <div className="col-lg-3 page-nav">
      <div className="page-section pt-lg-112pt">
        <nav className="nav page-nav__menu">
          <Link 
            className={`nav-link ${isActive('/protected/admin/account/basic-info') ? 'active' : ''}`} 
            href="/protected/admin/account/basic-info?account-title=Basic Information"
          >
            Basic Information
          </Link>
          <Link 
            className={`nav-link ${isActive('/protected/admin/account/change-password') ? 'active' : ''}`} 
            href="/protected/admin/account/change-password?account-title=Change Password"
          >
            Change Password
          </Link>
        </nav>
     
      </div>
    </div>
  );
}

export default Steppers;
