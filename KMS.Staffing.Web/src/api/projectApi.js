class ProjectApi {  
    static getAllProjects() {
      return fetch('http://localhost:58955/api/projects/').then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }
}

export default ProjectApi; 