import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from "../../actions/profile";

export const Experience = ( { experience, deleteExperience } ) => 
{
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -&nbsp;
                {
                    exp.to === null ? ('Present') : 
                    (<Moment format='DD/MM/YYYY'>{exp.to}</Moment>) 
                }
            </td>
            <td>
                <button onClick={ () => deleteExperience(exp._id) } className="btn btn-danger">
                    X
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{ experiences }</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = 
{
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}


const mapDispatchToProps = 
{
    deleteExperience
}

export default connect(null, mapDispatchToProps)(Experience);