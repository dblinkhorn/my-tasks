const ProjectFactory = (projectTitle) => {
    return {
        projectTitle: projectTitle,
        todos: []
    };
};

projects = [];

projects.push(
    ProjectFactory("Random Tasks")
)

projects[0].todos.push(
    "This is an example task. Delete it and begin creating your own!"
)

let selectedProject = 0;

const highlightSelectedProject = (selectedProject) => {
    let projectContainers = document.querySelectorAll(".project-container");
    projectContainers.forEach( (container) => {
      container.classList.remove("clicked");
      console.log(selectedProject.toString());
      if (container.id === selectedProject.toString()) {
          container.classList.add("clicked");
      } return;
    })
}

// display all todos for the selected project
const showTodos = (clickedProject) => {
    const todosDiv = document.getElementById("todos-list");
    todosDiv.textContent = "";
    // try/catch block to prevent undefined error when deleting project which contains todos
    try {
        projects[clickedProject].todos.forEach((todo) => {
            let todoContainer = document.createElement("div");
            todoContainer.classList = "todo-container hover pointer";
            let todoItem = document.createElement("div");
            todoItem.classList = "todo-item";
            todoItem.id = projects[clickedProject].todos.indexOf(todo);
            todoItem.textContent = todo;
            todosDiv.appendChild(todoContainer);
            todoContainer.appendChild(todoItem);
    
            // add delete buttons to each project item
            let todoDeleteButton = document.createElement("div");
            todoDeleteButton.classList = "todo-delete-button"
            todoDeleteButton.id = projects[clickedProject].todos.indexOf(todo);
            todoDeleteButton.textContent = "x";
            todoContainer.appendChild(todoDeleteButton);
    
            // defines behavior when a delete button is clicked
            let todoDeleteButtons = document.querySelectorAll(".todo-delete-button");
            todoDeleteButtons.forEach((todoDeleteButton) => {
                todoDeleteButton.addEventListener("click", (event) => {
                    let targetTodoIndex = Number(event.target.id);
                    projects[clickedProject].todos.splice(targetTodoIndex, 1);
                    event.target.parentElement.remove();
                })
            })
        })
    } catch(error) {
        return;
    }
}

// display all project objects from projects array
const showProjects = () => {
    const projectsDiv = document.getElementById("projects-list");
    projectsDiv.textContent = "";
    projects.forEach((project) => {
        let projectContainer = document.createElement("div");
        projectContainer.classList = "project-container hover pointer";
        let projectItem = document.createElement("div");
        projectItem.classList = "project-item";
        projectItem.id = projects.indexOf(project);
        projectContainer.id = projects.indexOf(project);
        projectItem.addEventListener("click", (event) => {
            let clickedProject = Number(event.target.id);
            selectedProject = clickedProject;
            highlightSelectedProject(clickedProject);
            showTodos(clickedProject);
        })
        projectItem.textContent = project.projectTitle;
        projectsDiv.appendChild(projectContainer);
        projectContainer.appendChild(projectItem);

        // add delete buttons to each project item
        let projectDeleteButton = document.createElement("div");
        projectDeleteButton.classList = "project-delete-button"
        projectDeleteButton.id = projects.indexOf(project);
        projectDeleteButton.textContent = "x";
        projectContainer.appendChild(projectDeleteButton);

        // defines behavior when a delete button is clicked
        let projectDeleteButtons = document.querySelectorAll(".project-delete-button");
        projectDeleteButtons.forEach((projectDeleteButton) => {
            projectDeleteButton.addEventListener("click", (event) => {
                let targetProjectIndex = Number(event.target.id);
                if (targetProjectIndex == selectedProject) {
                    const todosDiv = document.getElementById("todos-list");
                    todosDiv.innerHTML = "";
                }
                projects.splice(targetProjectIndex, 1);
                event.target.parentElement.remove();
            })
        })
    })
}

const addNewProjectButton = document.getElementById("add-new-project");
addNewProjectButton.addEventListener("click", () => {
        addNewProjectDiv();
});

let newProjectButtonClicked = false;

// adds each project from the projects array to the projects div
const addNewProjectDiv = () => {
    if (newProjectButtonClicked) {
        return;
    }
    const projectsDiv = document.getElementById("projects");
    const projectInputField = document.createElement("input");
    const projectButtonsDiv = document.createElement("div");
    const addProjectButton = document.createElement("button");
    const cancelProjectButton = document.createElement("button");
    const addProjectForm = document.createElement("form");

    projectInputField.type = "text";
    projectInputField.id = "new-project";
    projectInputField.required = true;
    projectInputField.classList = "project-input";
    projectInputField.setAttribute("maxlength", 20);

    projectButtonsDiv.classList = "new-project-buttons";

    addProjectForm.id = "add-project-form";
    addProjectForm.class = "add-project-form";

    addProjectButton.type = "submit";
    addProjectButton.value = "Add";
    projectInputField.setAttribute("placeholder", "Enter project name");

    cancelProjectButton.value = "Cancel";

    addProjectButton.textContent = "Add";
    cancelProjectButton.textContent = "Cancel";

    projectsDiv.appendChild(addProjectForm);
    addProjectForm.appendChild(projectInputField);
    addProjectForm.appendChild(projectButtonsDiv);
    projectButtonsDiv.appendChild(addProjectButton);
    projectButtonsDiv.appendChild(cancelProjectButton);

    newProjectButtonClicked = true;

    let addProjectButtonClicked = false;

    // when submit action is clicked then add the new project to the projects array &
    // remove the form elements, re-display the projects array in the projects div
    addProjectForm.addEventListener("submit", function(e) {
        if (addProjectButtonClicked) {
            return;
        }
        e.preventDefault();
        addProjectButtonClicked = true;
        let newProjectName = projectInputField.value;
        let newProjectInstance = ProjectFactory(newProjectName);
        projects.push(newProjectInstance);
        projectInputField.remove();
        projectButtonsDiv.remove();
        showProjects();
        let newProject = Number(projects.indexOf(newProjectInstance));
        selectedProject = newProject;
        highlightSelectedProject(newProject);
        showTodos(selectedProject);
        newProjectButtonClicked = false;
    });

    // if cancel button is clicked then remove the form elements from the DOM
    cancelProjectButton.addEventListener("click", () => {
        projectInputField.remove();
        projectButtonsDiv.remove();
        newProjectButtonClicked = false;
    })
}

const addNewTodoButton = document.getElementById("add-new-todo");
addNewTodoButton.addEventListener("click", () => {
    if (projects.length !== 0) {
        addNewTodoDiv();
    } else {
        alert("You must create a project to add tasks.")
    }
});

let newTodoButtonClicked = false;

const addNewTodoDiv = () => {
    if (newTodoButtonClicked) {
        return;
    }
    const todosDiv = document.getElementById("todos");
    const todoInputField = document.createElement("input");
    const todoButtonsDiv = document.createElement("div");
    const addTodoButton = document.createElement("button");
    const cancelTodoButton = document.createElement("button");
    const addTodoForm = document.createElement("form");

    todoInputField.type = "text";
    todoInputField.id = "new-todo";
    todoInputField.required = true;
    todoInputField.classList = "todo-input";
    todoInputField.setAttribute("maxlength", 120);

    todoButtonsDiv.classList = "new-todo-buttons";

    addTodoForm.id = "add-todo-form";
    addTodoForm.class = "add-todo-form";

    addTodoButton.type = "submit";
    addTodoButton.value = "Add";
    todoInputField.setAttribute("placeholder", "Enter task description");

    cancelTodoButton.value = "Cancel";

    addTodoButton.textContent = "Add";
    cancelTodoButton.textContent = "Cancel";

    todosDiv.appendChild(addTodoForm);
    addTodoForm.appendChild(todoInputField);
    addTodoForm.appendChild(todoButtonsDiv);
    todoButtonsDiv.appendChild(addTodoButton);
    todoButtonsDiv.appendChild(cancelTodoButton);

    newTodoButtonClicked = true;

    let addTodoButtonClicked = false;

    // when submit action is clicked then add the new todo to the todos array &
    // remove the form elements, re-display the todos array in the todos div
    addTodoForm.addEventListener("submit", function(e) {
        if (addTodoButtonClicked) {
            return;
        }
        e.preventDefault();
        addTodoButtonClicked = true;
        let newTodoName = todoInputField.value;
        projects[selectedProject].todos.push(newTodoName);
        todoInputField.remove();
        todoButtonsDiv.remove();
        showTodos(selectedProject);
        newTodoButtonClicked = false;
    });

    // if cancel button is clicked then remove the form elements from the DOM
    cancelTodoButton.addEventListener("click", () => {
        todoInputField.remove();
        todoButtonsDiv.remove();
        newTodoButtonClicked = false;
    })
}

showProjects();
showTodos(selectedProject);