import { NextPage } from 'next';
import SideNav from "./SideNav";
import SideTab from '@/app/interfaces/sideTabs';

const Drawer: NextPage<{ setIsOpen: any, isOpen: boolean, sideTabs: SideTab[] }> = ({ setIsOpen, isOpen, sideTabs }) => {
    
  return (
    <div className="mdk-drawer js-mdk-drawer" id="default-drawer-mobi" data-align="start" data-position="left" data-domfactory-upgraded="mdk-drawer" data-persistent="" data-opened="" style={{ overflowY: 'auto', zIndex: 1000, scrollbarWidth: 'thin', backgroundColor: 'success', scrollbarColor: 'success' }}>
      <div className={isOpen ? "mdk-drawer__scrim__open" : "mdk-drawer__scrim"} onClick={() => { setIsOpen(!isOpen) }} ></div>
      <SideNav setIsOpen={setIsOpen} isOpen={isOpen} sideTabs={sideTabs} />
    </div>
  );
}

export default Drawer