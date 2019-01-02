import { combineReducers} from 'redux';
import {reducer as burgerMenu} from 'redux-burger-menu';

import { routerReducer } from 'react-router-redux'
import employees from './employeeReducer';
import selectedEmployee from './selectedEmployeeReducer';
import projects from './projectReducer';
import projectDetail from './projectDetailReducer';
import titles from './titleReducer';
import experiences from './experienceReducer';
import competentLevels from './competentLevelReducer';
import skillCategories from './skillCategoryReducer';

const reducers = {
  // Your other reducers go here
  employees,
  selectedEmployee,
  titles,
  experiences,
  competentLevels,
  skillCategories,
  projects,
  projectDetail,
  burgerMenu, // Must be mounted at 'burgerMenu'
  routing: routerReducer
};

export default combineReducers(reducers);