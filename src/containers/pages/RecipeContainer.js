import React from 'react';
import { connect } from 'react-redux';

import { Recipes } from '../../components/pages';
import { listAllRecipesRequest } from '../../actions/recipeActions';

const RecipeContainer = props => {
  return <Recipes {...props} />;
};

const mapStateToProps = state => ({});

const mapDispatchToProps = props => ({
  listAllRecipesRequest : () => {
      return listAllRecipesRequest();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeContainer);
