
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import './TableStyles.css'; // Import the shared CSS file
import { deleteEducation } from '../../actions/profile';
const Education = ({ education,deleteEducation }) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.schoolName}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                {edu.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)}
            </td>
            <td>
                <button onClick = {()=> deleteEducation(edu._id)}className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return (
        <div className="table-container">
            <Fragment>
                <h2 className="my-2">Education Credentials</h2>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>College</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {educations}
                    </tbody>
                </table>
            </Fragment>
        </div>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null,{deleteEducation})(Education);
