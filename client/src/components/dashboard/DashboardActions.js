// import React from 'react'
// import {Link} from 'react-router-dom'


// export const DashboardActions = () => {
//   return (
//     <div class="dash-buttons">
//     <Link to="/edit-profile" class="btn btn-light">
//     <i class="fas fa-user-circle text-primary"></i> 
//         Edit Profile
//     </Link>
//     <Link to="/add-experience" class="btn btn-light">
//     <i class="fab fa-black-tie text-primary"></i> 
//     Add Experience
//     </Link>
//     <Link to="/add-education" class="btn btn-light">
//     <i class="fas fa-graduation-cap text-primary"></i>
//      Add Education
//      </Link>
//   </div>
//   )
// }


import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardActions.css'; // Import the CSS file

export  const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i>
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i>
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i>
        Add Education
      </Link>
    </div>
  );
}





