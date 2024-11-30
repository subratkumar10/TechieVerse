import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({
    education:{
        schoolName,
        degree,
        branch,
        current,
        to,
        from,
        description
    }
}) => {
  return (
    <div> 
        <h3 class="text-dark">{schoolName}</h3>
        <p><Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}</p>
        <p><strong>Degree: </strong>{degree}</p>
        <p><strong>Branch: </strong>{branch}</p>
        <p>
            <strong>Description: </strong>{description}
        </p>
    </div>
  )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired

}

export default ProfileEducation;