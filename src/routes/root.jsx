import { Outlet, Link, NavLink } from "react-router-dom";

function Root() {
    return (
        <div>
           
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu">
                Menu
            </button>
            <div className="offcanvas offcanvas-start bg-dark" tabIndex='-1' id="sidebarMenu">
                    <div className="offcanvas-header">
                        <h5 class="offcanvas-title text-light" id="offcanvasExampleLabel">Menu</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        
                        
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <NavLink to={`home`} className={({ isActive }) =>
                            isActive
                            ? 'nav-link active'
                            
                            : 'nav-link'
                        
                        }><p data-bs-dismiss='offcanvas'>Home</p></NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to={`Pokedex`} className={({isActive})=>
                        isActive
                        ? 'nav-link active'
                        : 'nav-link '
                        
                        }><p data-bs-dismiss='offcanvas'>Pokedex</p></NavLink>
                        </li>
                    
                    </ul>
                    
                </div>
            </div>
            <div id='App'>
                <Outlet/>
            </div>
        </div>
      );
}
export default Root;