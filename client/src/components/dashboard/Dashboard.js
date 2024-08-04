// import React,{Fragment, useEffect} from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import { getCurrentProfile } from '../../actions/profile'
// import Spinner from '../layouts/Spinner'
// import { Link } from 'react-router-dom'
// import { DashboardActions } from './DashboardActions'
// import Experience from './Experience'
// import Education from './Education'

// const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading}}) => {
//     useEffect(()=>{
//         getCurrentProfile();
//     },[]);

//   return loading && profile === null ? <Spinner/> : <Fragment>

//     <h1 className="large text-primary">Dashboard</h1>
//     <p className="lead">
//         <i className="fas fa-user"></i> Welcome {user && user.name}
//     </p>
//     {
//     profile !== null ? (
//         <Fragment>
//             <DashboardActions/>
//             <Experience experience={profile.experiences}/>
//             <Education education={profile.education}/>
//         </Fragment>
//     ) : (
//         <Fragment>
//             <p>You have not yet setup a profile, please add some info</p>
//            <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
//         </Fragment>
//     )
//     }
//   </Fragment> 
// }

// Dashboard.propTypes = {
//     getCurrentProfile: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     profile:PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//     auth: state.auth,
//     profile: state.profile
// })

// export default connect(mapStateToProps,{getCurrentProfile})(Dashboard)

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import './Dashboard.css';  // Import the custom CSS file
import default_profile_image from '../../img/default_profile_image.png';
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading },deleteAccount }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="dashboard-container">
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    {/* <i className="fas fa-user"></i> Welcome {user && user.name} */}
                    <div className="profile-header">
                 <img src={default_profile_image} alt="Profile" className="profile-image" />
                 <span className="welcome-text">Welcome {user && user.name}</span>
                     </div>
                </p>
                {profile !== null ? (
                    <Fragment>
                        <DashboardActions />
                        <Experience experience={profile.experiences} />
                        <Education education={profile.education} />
                        <div className="my-2">
                            <button className="btn btn-danger"  onClick = {()=>deleteAccount()}>
                                <i className="fas fa-user-minus"></i> Delete My Account
                            </button>
                        </div>
                        
                    </Fragment>
                ) : (
                    <Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAccount})(Dashboard);

