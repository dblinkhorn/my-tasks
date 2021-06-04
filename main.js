const ProjectFactory = (projectTitle) => {
    return {
        projectTitle: projectTitle,
        todos: [],
        finishedTodos: []
    }
}

const TodoFactory = (todoTitle, todoDescription, todoPriority, todoDueDate) => {
    return {
        todoTitle: todoTitle,
        todoDescription: todoDescription,
        todoPriority: todoPriority,
        todoDueDate: todoDueDate
    }
}

projects = [];

projects.push(
    ProjectFactory("Random Tasks")
)

projects[0].todos.push(
    TodoFactory(
        "This is an example task. Delete it and begin creating your own!",
        "This is just an example task. Feel free to delete it!",
        "Low",
        "No Due Date"
    )
)

projects[0].finishedTodos.push(
    TodoFactory(
        "this is a test finished task",
        "this is the description for it",
        "Medium",
        "No Due Date"
    )
)

let selectedProject = 0;

// highlights the project clicked by user
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
    const todosListDiv = document.getElementById("todos-list");
    todosListDiv.textContent = "";

    projects[clickedProject].todos.forEach((todo) => {
        let todoContainer = document.createElement("div");
        todoContainer.classList = "todo-container hover pointer";

        let todoItem = document.createElement("div");
        todoItem.classList = "todo-item";
        todoItem.id = projects[clickedProject].todos.indexOf(todo);

        let todoItemIndex = projects[clickedProject].todos.indexOf(todo);
        todoItem.textContent = projects[clickedProject].todos[todoItemIndex].todoTitle;
        todosListDiv.appendChild(todoContainer);
        todoContainer.appendChild(todoItem);

        // add expand buttons to each todo item
        let todoExpandButton = document.createElement("div");
        todoExpandButton.classList = "todo-expand-button";
        todoExpandButton.id = projects[clickedProject].todos.indexOf(todo);
        todoExpandButton.textContent = "MORE >";
        todoContainer.appendChild(todoExpandButton);

        let expandButtonClicked = false;

        todoExpandButton.addEventListener("click", (event) => {
            todoExpandButton.setAttribute("display", "inline");
            let targetExpandIndex = Number(event.target.id);
            const todoDescriptionValue = document.createElement("div");
            const todoPriorityValue = document.createElement("div");
            const todoDueDateValue = document.createElement("div");

            todoDescriptionValue.id = `todo-description-value-${targetExpandIndex.toString()}`;
            todoDescriptionValue.classList = "todo-description-value";
            todoDescriptionValue.textContent = `Description: ${projects[clickedProject].todos[targetExpandIndex].todoDescription}`;

            todoPriorityValue.id = `todo-priority-value-${targetExpandIndex.toString()}`;
            todoPriorityValue.classList = "todo-priority-value";
            todoPriorityValue.textContent = `Priority: ${projects[clickedProject].todos[targetExpandIndex].todoPriority}`;
            
            todoDueDateValue.id = `todo-due-date-value-${targetExpandIndex.toString()}`;
            todoDueDateValue.classList = "todo-due-date-value";
            todoDueDateValue.textContent = `Due date: ${projects[clickedProject].todos[targetExpandIndex].todoDueDate}`;

            if (expandButtonClicked) {
                let todoDescription = document.getElementById(`todo-description-value-${targetExpandIndex.toString()}`);
                let todoPriority = document.getElementById(`todo-priority-value-${targetExpandIndex.toString()}`);
                let todoDueDate = document.getElementById(`todo-due-date-value-${targetExpandIndex.toString()}`);
                todoDescription.remove();
                todoPriority.remove();
                todoDueDate.remove();
                todoExpandButton.textContent = "MORE >";
                todoContainer.classList.remove("clicked");
                return expandButtonClicked = false;
            }

            todoContainer.appendChild(todoDescriptionValue);
            todoContainer.appendChild(todoPriorityValue);
            todoContainer.appendChild(todoDueDateValue);

            todoExpandButton.textContent = "< LESS";

            expandButtonClicked = true;
            todoContainer.classList.add("clicked");
        })

        // add delete buttons to each todo item
        let todoDeleteButton = document.createElement("div");
        todoDeleteButton.classList = "todo-delete-button";
        todoDeleteButton.id = projects[clickedProject].todos.indexOf(todo);
        todoDeleteButton.textContent = "x";
        todoContainer.appendChild(todoDeleteButton);

        // defines behavior when a delete button is clicked
        let todoDeleteButtons = document.querySelectorAll(".todo-delete-button");
        todoDeleteButtons.forEach((todoDeleteButton) => {
            todoDeleteButton.addEventListener("click", (event) => {
                let targetTodoIndex = Number(event.target.id);
                delete projects[clickedProject].todos[targetTodoIndex];
                event.target.parentElement.remove();
            })
        })

        // adds brackets over delete button on hover
        todoDeleteButtons.forEach((todoDeleteButton) => {
            todoDeleteButton.addEventListener("mouseover", (event) => {
                event.target.textContent = "[\u00D7]";
            })
        })

        // removes brackets when mouse leaves element
        todoDeleteButtons.forEach((todoDeleteButton) => {
            todoDeleteButton.addEventListener("mouseout", (event) => {
                event.target.textContent = "\u00D7";
            })
        })

        const setFinishedTodo = (todo) => {
            
        }
    })

    // creates a finished tasks area and displays any that exist
    if (projects[clickedProject].finishedTodos.length !== 0) {
        projects[clickedProject].finishedTodos.forEach((todo) => {
            const finishedTodoContainer = document.createElement("div");
            finishedTodoContainer.classList = "finished-todo-container";
            finishedTodoContainer.id = "finished-todo-container"
            const todosDiv = document.getElementById("todos");
            const categoryPara = document.createElement("p");
            categoryPara.id = "finished-todos-heading";
            categoryPara.classList = "category finished-todos-heading"
            const hr = document.createElement("hr");
            hr.id = "finished-todo-hr"
            categoryPara.textContent = "Finished Tasks";
    
            
            finishedTodoContainer.textContent = projects[clickedProject].finishedTodos[0].todoTitle;
    
            todosDiv.appendChild(categoryPara);
            todosDiv.appendChild(hr);
            todosDiv.appendChild(finishedTodoContainer);
        })
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
        projectDeleteButton.classList = "project-delete-button";
        projectDeleteButton.id = projects.indexOf(project);
        projectDeleteButton.textContent = "\u00D7";
        projectContainer.appendChild(projectDeleteButton);

        // defines behavior when a delete button is clicked
        let projectDeleteButtons = document.querySelectorAll(".project-delete-button");
        projectDeleteButtons.forEach((projectDeleteButton) => {
            projectDeleteButton.addEventListener("click", (event) => {
                let targetProjectIndex = Number(event.target.id);
                if (targetProjectIndex == selectedProject) {
                    const todosListDiv = document.getElementById("todos-list");
                    todosListDiv.innerHTML = "";
                }
                delete projects[targetProjectIndex];
                event.target.parentElement.remove();
            })
        })

        // adds brackets over delete button on hover
        projectDeleteButtons.forEach((projectDeleteButton) => {
            projectDeleteButton.addEventListener("mouseover", (event) => {
                event.target.textContent = "[\u00D7]";
            })
        })

        // removes brackets when mouse leaves element
        projectDeleteButtons.forEach((projectDeleteButton) => {
            projectDeleteButton.addEventListener("mouseout", (event) => {
                event.target.textContent = "\u00D7";
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
    projectInputField.focus();

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

// checks to see if there are no projects
let checkIfAllEmptyProjects = () => {
    for (project in projects) {
        if (project === undefined) {
            return undefined;
        } return true;
    }
}

const addNewTodoButton = document.getElementById("add-new-todo");

// controls what happens when add task button is clicked depending on
// if there are no projects
addNewTodoButton.addEventListener("click", () => {
    let checkProjects = checkIfAllEmptyProjects();
    if (checkProjects === undefined) {
        alert("You must create a project before adding tasks.");
        return;
    } addNewTodoDiv();
})

let newTodoButtonClicked = false;

// displays add todo form and controls logic
const addNewTodoDiv = () => {
    if (newTodoButtonClicked) {
        return;
    }

    const addTodoFormDiv = document.getElementById("add-todo-form-container");
    const todoTitleInputField = document.createElement("input");
    const todoTitleInputFieldLabel = document.createElement("label");
    const todoDescriptionInputField = document.createElement("input");
    const todoDescriptionInputFieldLabel = document.createElement("label");
    const todoPrioritySelect = document.createElement("select");
    const todoPrioritySelectLabel = document.createElement("label");
        const todoPriorityHigh = document.createElement("option");
        const todoPriorityMedium = document.createElement("option");
        const todoPriorityLow = document.createElement("option");
    const todoDueDateInputField = document.createElement("input");
    const todoDueDateInputFieldLabel = document.createElement("label");
    const todoButtonsDiv = document.createElement("div");
    const addTodoButton = document.createElement("button");
    const cancelTodoButton = document.createElement("button");
    const addTodoForm = document.createElement("form");

    todoTitleInputFieldLabel.setAttribute("for", "new-todo-title");
    todoTitleInputFieldLabel.textContent = "Task title:";

    todoTitleInputField.type = "text";
    todoTitleInputField.id = "new-todo-title";
    todoTitleInputField.name = "new-todo-title";
    todoTitleInputField.required = true;
    todoTitleInputField.classList = "todo-title-input";
    todoTitleInputField.setAttribute("maxlength", 120);
    todoTitleInputField.setAttribute("placeholder", "Enter the task to be completed");

    todoDescriptionInputFieldLabel.setAttribute("for", "new-todo-description");
    todoDescriptionInputFieldLabel.textContent = "Task description:";

    todoDescriptionInputField.type = "text";
    todoDescriptionInputField.id = "new-todo-description";
    todoDescriptionInputField.name = "new-todo-description";
    todoDescriptionInputField.required = true;
    todoDescriptionInputField.classList = "todo-description-input";
    todoDescriptionInputField.setAttribute("maxlength", 120);
    todoDescriptionInputField.setAttribute("placeholder", "Enter a description of the task");

    todoPrioritySelectLabel.setAttribute("for", "new-todo-priority");
    todoPrioritySelectLabel.textContent = "Priority level:"

    todoPrioritySelect.type = "select";
    todoPrioritySelect.id = "new-todo-priority";
    todoPrioritySelect.name = "new-todo-priority";
    todoPrioritySelect.required = true;
    todoPrioritySelect.classList = "todo-priority-select";
    todoPrioritySelect.name = "todo-priority"

    todoPriorityHigh.value = "High";
    todoPriorityHigh.textContent = "High";
    todoPriorityMedium.value = "Medium";
    todoPriorityMedium.textContent = "Medium";
    todoPriorityLow.value = "Low";
    todoPriorityLow.textContent = "Low";

    todoDueDateInputFieldLabel.setAttribute("for", "new-todo-due-date");
    todoDueDateInputFieldLabel.textContent = "Due date:";

    todoDueDateInputField.type = "date";
    todoDueDateInputField.id = "new-todo-due-date";
    todoDueDateInputField.name = "new-todo-due-date";
    todoDueDateInputField.classList = "todo-due-date-input";

    todoButtonsDiv.classList = "new-todo-buttons";

    addTodoForm.id = "add-todo-form";
    addTodoForm.classList = "add-todo-form";

    addTodoButton.type = "submit";
    addTodoButton.value = "Add";

    cancelTodoButton.value = "Cancel";

    addTodoButton.textContent = "Add";
    cancelTodoButton.textContent = "Cancel";

    addTodoFormDiv.appendChild(addTodoForm);
    addTodoForm.appendChild(todoTitleInputFieldLabel);
    addTodoForm.appendChild(todoTitleInputField);
    addTodoForm.appendChild(todoDescriptionInputFieldLabel);
    addTodoForm.appendChild(todoDescriptionInputField);
    addTodoForm.appendChild(todoPrioritySelectLabel);
    addTodoForm.appendChild(todoPrioritySelect);
    todoPrioritySelect.appendChild(todoPriorityHigh);
    todoPrioritySelect.appendChild(todoPriorityMedium);
    todoPrioritySelect.appendChild(todoPriorityLow);
    addTodoForm.appendChild(todoDueDateInputFieldLabel);
    addTodoForm.appendChild(todoDueDateInputField);
    addTodoForm.appendChild(todoButtonsDiv);
    todoButtonsDiv.appendChild(addTodoButton);
    todoButtonsDiv.appendChild(cancelTodoButton);
    todoTitleInputField.focus();

    newTodoButtonClicked = true;

    let addTodoButtonClicked = false;

    let addTodoFormContainer = document.getElementById("add-todo-form");

    // when submit action is clicked then add the new todo to the todos array
    // of the currently clicked project & remove the form elements then
    // re-display the todos array in the todos div
    addTodoForm.addEventListener("submit", function(e) {
        if (addTodoButtonClicked) {
            return;
        }
        e.preventDefault();
        addTodoButtonClicked = true;
        let newTodoTitle = todoTitleInputField.value;
        let newTodoDescription = todoDescriptionInputField.value;
        let newTodoPriority = todoPrioritySelect.value;
        let newTodoDueDate = todoDueDateInputField.value;
        projects[selectedProject].todos.push(
            TodoFactory(
                newTodoTitle,
                newTodoDescription,
                newTodoPriority,
                newTodoDueDate
            )
        );

        const finishedTodoContainer = document.getElementById("finished-todo-container");
        finishedTodoContainer.innerHTML = "";
        const categoryPara = document.getElementById("finished-todos-heading");
        categoryPara.remove();
        const hr = document.getElementById("finished-todo-hr");
        hr.remove();
        showTodos(selectedProject);
        newTodoButtonClicked = false;
        addTodoFormContainer.remove();
    });

    // if cancel button is clicked then remove the form elements from the DOM
    cancelTodoButton.addEventListener("click", () => {
        newTodoButtonClicked = false;
        addTodoFormContainer.remove();
    })
}

// display projects and todos on page load
showProjects();
showTodos(selectedProject);

// highlight default "Random Tasks" project on page load
const randomTasksProject = document.getElementById("0").classList.add("clicked");