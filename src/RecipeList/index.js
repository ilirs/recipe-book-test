import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import './styles.css';
import { connect } from 'react-redux';

class RecipeList extends Component {


    constructor(props) {
        super(props)
        this.state = {
            recipes: JSON.parse(localStorage.getItem("recipes")),

        }
    }


    deleteRecipe = async (id) => {
        await this.props.dispatch({
            type: 'FETCH_DELETE_RECIPE',
            payload: {
                recipe: this.props.recipes,
                id: id,
                
            }
        });
    }


    detailsRecipe = (history, id) => {
        history.push({
            pathname: '/recipe-details/' + id,
            state: { id: id, recipe: this.state.recipes }
        });
    }

    render() {
        const { recipes } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-sm-12">
                        <div className="card shadow p-3 mb-5 bg-white">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-3">
                                        <h3><b>Recipe List</b></h3>
                                    </div>
                                    <div className="col-9">
                                        <Link className="btn btn-secondary" to={'/recipe-add'}>Add New Recipe +</Link>
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
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    {recipes.map((recipe, index) => (
                                        <tbody>
                                            <tr>
                                                <td>{index}</td>
                                                <td>{recipe.name}</td>
                                                <td>{recipe.source}</td>
                                                <td>
                                                    {recipe.ingredientss.slice(0, 4).map((ing, index) => (
                                                        
                                                        ing.value && index < 3 ? <p>{ing.value} {ing.name}</p> : index === 3 && ing.value ? "..." :""
            
                                                    ))}
                                                </td>
                                                <td>{recipe.instruction.length > 50 ? recipe.instruction.substring(0, 50) + "..." : recipe.instruction}</td>
                                                <td>{recipe.preptime}</td>
                                                <td><button className="btn btn-primary" style={{ marginRight: 2 }} onClick={() => this.deleteRecipe(index)}>Delete</button>
                                                    <button className="btn btn-secondary" onClick={() => this.detailsRecipe(this.props.history, index)}>Details</button>
                                                </td>
                                            </tr>
                                        </tbody>
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

export default connect(mapStateToProps)(RecipeList);
