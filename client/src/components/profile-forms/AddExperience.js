
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './css/ProfileStyles.css';

const AddExperience = ({ addExperience }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { title, company, location, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const addExperienceDB = e => {
        e.preventDefault();
        addExperience(formData);
        navigate('/dashboard');
    };

    return (
        <Fragment>
            <div className="form-container">
                <h1 className="large text-primary">Add An Experience</h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={addExperienceDB}>
                    <div className="form-group">
                        <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                        <input type="date" name="from" value={from} onChange={onChange} />
                    </div>
                    <div >
                        <p>
                            <input type="checkbox" name="current" value={current} checked={current} onChange={() => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            }} />
                            {' '} Current Job
                        </p>
                    </div>
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input type="date" name="to" value={to} onChange={onChange} disabled={toDateDisabled ? 'disabled' : ''} />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Job Description"
                            value={description} onChange={onChange}
                        ></textarea>
                    </div>
                    <div className="link-buttons">
                        <input type="submit" className="btn btn-primary my-1" />
                        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);