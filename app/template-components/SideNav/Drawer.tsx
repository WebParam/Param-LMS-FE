import NavApplications from "./NavApplications"
import NavOverview from "./NavOverview"
import NavToggler from "./NavToggler"
import NavUI from "./NavUI"

const Drawer = () => {
  return (
    <div className="mdk-drawer js-mdk-drawer" id="default-drawer" data-align="start" data-position="left" data-domfactory-upgraded="mdk-drawer" data-persistent="" data-opened=""><div className="mdk-drawer__scrim" ></div>
                <div className="mdk-drawer__content" >
                    <div className="sidebar sidebar-left ps ps--active-y sidebar-dark-pickled-bluewood" data-perfect-scrollbar="">

                        <NavToggler />
                        <NavOverview  />
                        <NavApplications />
                        <NavUI />

          <div className="ps__rail-x" style={{ left: '0px', bottom: '0px' }}><div className="ps__thumb-x" style={{ left: '0px', width: '0px' }}></div></div><div className="ps__rail-y" style={{ top: '0px', height: '826px', right: '0px' }}><div className="ps__thumb-y"  style={{ top: '0px', height: '676px' }}></div></div></div>
                </div>
            </div>
  )
}

export default Drawer