import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class RecipeAdd extends Component {


    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            quantity:
                ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
                    '18', '19', '20', '21', '22', '23'],
            name: '',
            source: '',
            preptime: '',
            instruction: '',
            ingredientss: [{
                name: "Flour",
                value: ''
            }, {
                name: 'Milk',
                value: ''
            }, {
                name: 'Oil',
                value: ''
            },

            {
                name: 'Salt',
                value: ''
            }],
        }
    }


    createNewRecipe = async () => {
        await this.props.dispatch({
            type: 'FETCH_ADD_NEW_RECIPE',
            payload: {
                name: this.state.name,
                source: this.state.source,
                preptime: this.state.preptime,
                instruction: this.state.instruction,
                ingredientss: this.state.ingredientss,
                history:  this.props.history,

            }
        });
        this.props.history.push('/recipe-list');
    }

    componentDidMount(){
        localStorage.setItem('recipes', JSON.stringify(this.props.recipes));
    }

    handleInputChange(event) {
        const value = event.target.value;
        const statename = event.target.name;
        this.setState({
            [statename]: value
        });
    }

    handleselectChange = async (event, name, index) => {
        const value = event.target.value;
        const arrayC = [...this.state.ingredientss]
        arrayC[index].value = value
        this.setState({ ingredientss: arrayC })
    }

    render() {

       // const { recipes } = this.props;

       

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-sm-12">
                        <div className="card shadow p-3 mb-5">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-6">
                                        <h3><b>Add Recipe</b></h3>
                                    </div>
                                    <div className="col-6">
                                        <Link className="btn btn-secondary" to={'/recipe-list'}>Recipe List</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="recipe-form">

                                <div className="form-group">
                                    <label for="recipe-name">Recipe name</label>
                                    <input type="text" name="name" className="form-control" id="recipe-name" value={this.state.name} placeholder="Enter recipe name" onChange={this.handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label for="recipe-source">Recipe source</label>
                                    <input type="text" name="source" className="form-control" id="recipe-source" value={this.state.source} placeholder="Enter recipe source" onChange={this.handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label> Ingredients: </label>

                                    {this.state.ingredientss.map((ing, index) => (
                                        <div className="row">
                                            <div className="col-6">
                                                <p value={ing.name}>{ing.name}</p>
                                            </div>
                                            <div className="col-6">

                                                <select name="quantity" className="custom-select" id="quantity" onChange={(e) => this.handleselectChange(e, ing.name, index)} >
                                                    {this.state.quantity.map((qty, index) => (
                                                        <option value={qty}>{qty}</option>))}
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="form-group">
                                    <label for="preperation-time">Preperation time</label>
                                    <input type="text" className="form-control" name="preptime" id="preperation-time" value={this.state.preptime} placeholder="XX hours XX minutes" onChange={this.handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label for="preperation-instructions">Preperation instructions</label>
                                    <textarea className="form-control" name="instruction" id="preperation-instructions" rows="3" value={this.state.instruction} onChange={this.handleInputChange}></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary" onClick={this.createNewRecipe}>Save</button>
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

export default connect(mapStateToProps)(RecipeAdd);