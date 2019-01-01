// Import React Table
import React from "react";
import "react-table/react-table.css";
import { FaBookReader } from 'react-icons/fa';
import SkillExperienceDropdown from "../components/screens/common/SkillExperienceDropdown";
import CompetentLevelDropdown from "../components/screens/common/CompetentLevelDropdown";
import SkillCategoryDropdown from "../components/screens/common/SkillCategoryDropdown";

const skillsetModel = [{
  Header: 'Skill',
  accessor: 'Skill.Name'
}, {
  Header: 'Skill Category',
  accessor: 'Skill',
  Cell: row => (
    <SkillCategoryDropdown name='SkillCategoryId'
      label='SkillCategory'
      isEditting={true}
      onlyInput={true}
      selectedValue={row.value.CategoryId}
      />
  )
}, {
  Header: 'Experience',
  accessor: 'ExperienceId',
  Cell: row => (
    <SkillExperienceDropdown name='ExperienceId'
      label='Experience'
      isEditting={true}
      onlyInput={true}
      selectedValue={row.value} />
  )
}, {
  Header: 'Competent Level',
  accessor: 'CompetentLevelId',
  Cell: row => (
    <CompetentLevelDropdown name='CompetentLevelId'
      label='CompetentLevel'
      isEditting={true}
      onlyInput={true}
      selectedValue={row.value} />
  )
}]

export { skillsetModel }