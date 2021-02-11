import React, { Component } from 'react';
import PostDataService, { INSTRUCTOR } from '../service/PostDataService';

class ListCoursesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            message: null
        }
        this.refreshCourses = this.refreshCourses.bind(this)
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.goHome = this.goHome.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        PostDataService.retrieveAllPosts(INSTRUCTOR)//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({ posts: response.data })
                }
            )
    }

    deleteCourseClicked(id) {
        PostDataService.deleteCourse(INSTRUCTOR, id)
            .then(
                response => {
                    this.setState({ message: `Delete of course ${id} Successful` })
                    this.refreshCourses()
                }
            )
    
    }

    updateCourseClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/courses/${id}`)
    }

    addCourseClicked() {
        this.props.history.push(`/courses/-1`)
    }

    goHome() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="container">
                <h3>All Posts</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.posts.map(
                                    post =>
                                        <tr key={post.id}>
                                            <td>{post.title}</td>
                                            <td>{post.details}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateCourseClicked(post.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(post.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
                        <button className="btn btn-success" onClick={this.goHome}>Home</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListCoursesComponent