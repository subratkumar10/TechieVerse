
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import './css/ProfileStyles.css';

const EditProfile = ({ createProfile, getCurrentProfile, profile: { profile, loading } }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubUserName: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubUserName: loading || !profile.githubUserName ? '' : profile.githubUserName,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.socialMedia ? '' : profile.socialMedia.twitter,
            facebook: loading || !profile.socialMedia ? '' : profile.socialMedia.facebook,
            linkedin: loading || !profile.socialMedia ? '' : profile.socialMedia.linkedin,
            youtube: loading || !profile.socialMedia ? '' : profile.socialMedia.youtube,
            instagram: loading || !profile.socialMedia ? '' : profile.socialMedia.instagram
        });
    }, [loading]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubUserName,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        createProfile(formData, true);
        navigate('/dashboard');
    };

    return (
        <Fragment>
            <div className="form-container">
                <h1 className="large text-primary">Edit Your Profile</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Let's update your profile information
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <select name="status" value={status} onChange={onChange}>
                            <option value="0">* Select Professional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor">Instructor or Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className="form-text">Give us an idea of where you are at in your career</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
                        <small className="form-text">Could be your own company or one you work for</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
                        <small className="form-text">Could be your own or a company website</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                        <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
                        <small className="form-text">Please use comma separated values (eg. HTML, CSS, JavaScript, PHP)</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Github Username"
                            name="githubUserName"
                            value={githubUserName}
                            onChange={onChange}
                        />
                        <small className="form-text">If you want your latest repos and a Github link, include your username</small>
                    </div>
                    <div className="form-group">
                        <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                        <button type="button" className="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                            Add Social Network Links
                        </button>
                        <span className="optional-label">Optional</span>
                    </div>

                    {displaySocialInputs && (
                        <Fragment>
                            <div className="form-group social-input">
                                <i className="fab fa-twitter fa-2x"></i>
                                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
                            </div>
                        </Fragment>
                    )}

                    <div className="link-buttons">
                        <input type="submit" className="btn btn-primary my-1" />
                        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);
