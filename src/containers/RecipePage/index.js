import React from 'react';
import styled from 'react-emotion';
import AddRecipeModal from './AddRecipeModal';
import DeleteIcon from '../../images/delete.png';

import { toast } from 'react-toastify';

import { LIGHT_GREY, primary } from '../../constants';

import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils/helpers';

const Header = styled('div')`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`;
const ListWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;
const ListItem = styled('div')`
  font-size: 14px;
  margin: 5px;
  padding: 10px 15px;
  background: white;
  box-shadow: 0px 3px 3px ${LIGHT_GREY};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 200px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`;
const AddRecipe = styled(ListItem)`
  color: ${primary};
  cursor: pointer;
`;
export default class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddRecipeModal: false,
      reload: false, // to reload the list when delete happens
    };
  }
  renderList = () => {
    const recipes = this.getRecipesList();
    const { onItemSelect } = this.props;
    return recipes.map((item) => (
      <ListItem key={item.key} onClick={() => onItemSelect(item.timerState)}>
        <span>{item.name}</span>
        <div
          style={{
            width: '16px',
            height: '16px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            this.onDeleteRecipe(item.name);
          }}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
            src={DeleteIcon}
          />
        </div>
      </ListItem>
    ));
  };

  openmodal = () =>
    this.setState({
      showAddRecipeModal: true,
    });

  closeModal = () =>
    this.setState({
      showAddRecipeModal: false,
    });

  onAddRecipe = ({ name, timerState }) => {
    const recipes = getItemFromLocalStorage('recipes');
    const recipeKey = `${name} - ${(Math.random() * 100).toFixed(1)}`;
    // empty state
    if (!recipes) {
      setItemInLocalStorage('recipes', [{ name, timerState, key: recipeKey }]);
      toast.dark('Recipe added successfully');
      this.toggleReload();
      this.closeModal();
      return;
    }

    // non empty state
    const filterList = recipes.filter((recipe) => recipe.name === name);
    const recipeExist = filterList.length > 0;
    if (recipeExist) {
      //don't add to list, show toaster
      toast.dark('Recipe added already');
    } else {
      const newRecipeList = [
        ...recipes,
        {
          name,
          timerState,
          key: recipeKey,
        },
      ];
      setItemInLocalStorage('recipes', newRecipeList);
      toast.dark('Recipe added successfully');
      this.toggleReload();
      this.closeModal();
    }
  };

  getRecipesList = () => {
    return getItemFromLocalStorage('recipes');
  };

  onDeleteRecipe = (name) => {
    const recipes = getItemFromLocalStorage('recipes');
    const newRecipeList = recipes.filter((recipe) => recipe.name !== name);
    setItemInLocalStorage('recipes', newRecipeList);
    toast.dark('Recipe deleted successfully');
    this.toggleReload();
  };

  toggleReload = () =>
    this.setState({
      reload: !this.state.reload,
    });
  render() {
    const { showAddRecipeModal } = this.state;
    return (
      <div>
        <Header>Custom Recipes</Header>
        <ListWrapper>
          <AddRecipe onClick={this.openmodal}>+ Add Recipe</AddRecipe>
          {this.renderList()}
        </ListWrapper>
        {showAddRecipeModal && (
          <AddRecipeModal close={this.closeModal} onAddRecipe={this.onAddRecipe} />
        )}
      </div>
    );
  }
}
