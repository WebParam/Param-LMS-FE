import { NextPage } from 'next';
import NavToggler from './NavToggler'
import NavOverview from './NavOverview'

const SideNav: NextPage<{sideTabs: any[]}> = ({sideTabs}) => {
    return (
        <div className="mdk-drawer__content" >
            <div className="sidebar sidebar-left ps ps--active-y sidebar-dark-pickled-bluewood" data-perfect-scrollbar="">

                            <NavToggler />
                            <NavOverview sideTabs={sideTabs} />                            

                            <div className="ps__rail-x" style={{ left: '0px', bottom: '0px' }}><div className="ps__thumb-x" style={{ left: '0px', width: '0px' }}></div>
                        </div>
                    <div className="ps__rail-y" style={{ top: '0px', height: '826px', right: '0px' }}><div className="ps__thumb-y" style={{ top: '0px', height: '676px' }}></div>
                </div>
            </div>
        </div>
    )
}

export default SideNav