import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from "../../actions/profile";

export const Education = ( { education, deleteEducation } ) => 
{
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -&nbsp;
                {
                    edu.to === null ? ('Present') : 
                    (<Moment format='DD/MM/YYYY'>{edu.to}</Moment>) 
                }
            </td>
            <td>
                <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">
                    X
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{ educations }</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = 
{
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

const mapDispatchToProps = 
{
    deleteEducation
}

export default connect(null, mapDispatchToProps)(Education);