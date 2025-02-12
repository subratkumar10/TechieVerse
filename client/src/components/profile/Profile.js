import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layouts/Spinner'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import { useParams,Link } from 'react-router-dom';
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({getProfileById,profile:{profile,loading},auth}) => {
    const { id } = useParams();
    useEffect(()=>{
        getProfileById(id);
    },[getProfileById]);



  return (
    <Fragment>
        {profile === null || loading ? <Spinner/> : <Fragment>
            <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
            )}

            
        <div class="profile-grid my-1">

            <ProfileTop profile={profile}/>
            <ProfileAbout profile={profile}/>
            <div class="profile-exp bg-white p-2">
                <h2 class="text-primary">Experience</h2>
                {profile.experiences.length > 0 ? (<Fragment>
                    {profile.experiences.map(exp=>(
                      <ProfileExperience key={exp._id} experiences={exp}/>
                    ))}
                </Fragment>) : <h4>No experience credentials</h4>}
                </div>

                <div class="profile-edu bg-white p-2">
                <h2 class="text-primary">Education</h2>
                {profile.education.length > 0 ? (<Fragment>
                    {profile.education.map(edu=>(
                      <ProfileEducation key={edu._id} education={edu}/>
                    ))}
                </Fragment>) : <h4>No education credentials</h4>}
                </div>
                    {
                        profile.githubUserName && (
                            <ProfileGithub username={profile.githubUserName}/>
                        )
                    }


            </div>
    


     

        </Fragment>}

    </Fragment>
  )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getProfileById})(Profile)