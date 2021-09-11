import React from 'react'

const Banner = () => {
    return (
        <div className="container-lg my-5">
            <div className="row">
                <div className="col-6">
                    <div className="left bg-dark p-5">
                        <input 
                        id="imageDescription"
                        type="text"
                        type="text" 
                        className="form-control" 
                        placeholder="Enter Your Note" />
                        <br />
                        <button  
                         onClick={(event) => {
                             event.preventDefault()
                             const description = document.getElementById('imageDescription').value
                             this.props.createNote(description)
                         }}
                        className="btn btn-danger">Add note</button>
                    </div>
                </div>
                <div className="col-6">
                    <div class="row row-cols-1 row-cols-md-2 g-4">
                        <div class="col col-6">
                            <div class="card">
                                <div class="card-body">
                                    <small class="card-title fw-bold">Author : 0xb5d399b9360fa734d82ebC8e96F88B755BeC586d</small>
                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
