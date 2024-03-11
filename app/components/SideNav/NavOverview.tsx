import Link from 'next/link'
import { NextPage } from 'next';
import SideTab from '@/app/interfaces/sideTabs';

const NavOverview: NextPage<{sideTabs: SideTab[]}> = ({sideTabs}) => {

  return (
      <>
          <div className="sidebar-heading">Overview</div>
            <ul className="sidebar-menu">
                            
                {sideTabs && sideTabs.map((tab) => {
                    if (tab.children) {
                        const children = tab.children.map((l: SideTab) => (<li key={l.name} className="sidebar-menu-item">
                            <a className="sidebar-menu-button" href={l.url}>
                                <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">{l.icon}</span>
                                <span className="sidebar-menu-text">{l.name}</span>
                            </a>
                        </li>));
                        
                        return (
                            <li key={tab.name} className="sidebar-menu-item">
                                <a className="sidebar-menu-button" data-toggle="collapse" href={`#${tab.name}`}>
                                    <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">{tab.icon}</span>
                                    {tab.name}
                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                </a>
                                <ul className="sidebar-submenu collapse sm-indent" id={tab.name}>
                                    {children}
                                </ul>
                            </li>);
                        
                    } 
                
                    return (<li key={tab.url} className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href={tab.url}>
                            <span className="material-icons sidebar-menu-icon sidebar-menu-icon--left">{tab.icon}</span>
                            <span className="sidebar-menu-text">{tab.name}</span>
                        </a>
                    </li>);
                })}    
          </ul>
          
      </>
  )
}

export default NavOverview