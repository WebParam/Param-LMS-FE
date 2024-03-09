import { NextPage } from 'next';
import SideNav from "./SideNav";

const Drawer: NextPage<{ setIsOpen: any, isOpen: boolean }> = ({ setIsOpen, isOpen }) => {
  
  const isMobi = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  if (isMobi)
    return (
      <div style={isOpen ? { display: 'block' } : { display: 'none' }} className="mdk-drawer js-mdk-drawer" id="default-drawer" data-align="start" data-position="left" data-domfactory-upgraded="mdk-drawer" data-persistent="" data-opened="">
        <div className={isOpen ? "mdk-drawer__scrim__open" : "mdk-drawer__scrim"} onClick={() => { setIsOpen(!isOpen) }} ></div>
        <SideNav />
      </div>
    )
  
    return (
      <div className="mdk-drawer js-mdk-drawer" id="default-drawer" data-align="start" data-position="left" data-domfactory-upgraded="mdk-drawer" data-persistent="" data-opened="">
        <div className={isOpen ? "mdk-drawer__scrim__open" : "mdk-drawer__scrim"} onClick={() => { setIsOpen(!isOpen) }} ></div>
        <SideNav />
      </div>
    )
}

export default Drawer