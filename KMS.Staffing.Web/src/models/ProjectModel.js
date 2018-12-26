// Import React Table
import "react-table/react-table.css";
  const projectStatusEnum = {
    working: 0,
    kickoff: 1,
    done: 2
  }

  const projectModel = {
    name : '',
    description : '',
    teamSize : 0,
    status : projectStatusEnum.working
  }

export { projectModel, projectStatusEnum }