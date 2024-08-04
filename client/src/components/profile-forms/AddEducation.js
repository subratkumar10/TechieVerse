
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './css/ProfileStyles.css';

const AddEducation = ({ addEducation }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        schoolName: '',
        degree: '',
        branch: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { schoolName, degree, branch, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const addEducationDB = e => {
        e.preventDefault();
        addEducation(formData);
        navigate('/dashboard');
    };

    return (
        <Fragment>
            <div className="form-container">
                <h1 className="large text-primary">Add Your Education</h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any school/college/university that you have attended
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={addEducationDB}>
                    <div className="form-group">
                        <input type="text" placeholder="* School / College / University" name="schoolName" value={schoolName} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Branch or Field of Study" name="branch" value={branch} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                        <input type="date" name="from" value={from} onChange={onChange} />
                    </div>
                    <div>
                        <p>
                            <input type="checkbox" name="current" value={current} checked={current} onChange={() => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            }} />
                            {' '} Currently Enrolled?
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
                            placeholder="Program / Course Description"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);
