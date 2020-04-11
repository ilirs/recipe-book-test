import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import './styles.css';
import { connect } from 'react-redux';

class RecipeDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            recipes: JSON.parse(localStorage.getItem("recipes")),
        }
    }

    render() {
      
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-sm-12">
                        <div className="card shadow p-3 mb-5 bg-white">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-6">
                                        <h3><b>Recipe Details</b></h3>
                                    </div>
                                    <div className="col-6">
                                        <Link className="btn btn-secondary" to={'/recipe-list'}>Recipe List</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row dashboard-row">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Recipe name</th>
                                            <th>Recipe source</th>
                                            <th>Ingredients</th>
                                            <th >Preparation instructions</th>
                                            <th>Preparation time</th>
                                          
                                        </tr>
                                    </thead>
                                    {this.state.recipes.map((recipe, index) => (
                                        this.props.location.state.id === index ?
                                        <tbody key={index} >
                                            <tr>
                                                <td>{index}</td>
                                                <td>{recipe.name}</td>
                                                <td>{recipe.source}</td>
                                                <td>
                                                    {recipe.ingredientss.map((ing, index) => (
                                                        ing.value ? 
                                                       <p>{ing.value} {ing.name}</p>  : null
                                                    ))}
                                                </td>
                                                <td>{recipe.instruction}</td>
                                                <td>{recipe.preptime}</td>
                                            
                                            </tr>
                                        </tbody> : null
                                    ))}
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reducer) => ({
    recipes: reducer.recipes,
});

export default connect(mapStateToProps)(RecipeDetails);
