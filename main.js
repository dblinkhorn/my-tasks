// gotta fix selected project highlight effect on page load after user has deleted default project
// also need to test behavior when there are no projects


// object factory for creating project instances
const ProjectFactory = (projectTitle) => {
    return {
        projectTitle: projectTitle,
        tasks: [],
        finishedTasks: []
    }
}

// object factory for creating tasks which will then be placed into respective projects
const TaskFactory = (taskTitle, taskDescription, taskPriority, taskDueDate) => {
    return {
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        taskPriority: taskPriority,
        taskDueDate: taskDueDate
    }
}

let projects = JSON.parse(localStorage.getItem("projects"));

if (!projects) {
    projects = [];

    projects.push(
        ProjectFactory("Random Tasks")
    )

    // creates a default example task on page load
    projects[0].tasks.push(
        TaskFactory(
            "This is an example task. Delete it and begin creating your own!",
            "This is just an example task. Feel free to delete it!",
            "Low",
            "None"
        )
    )

    localStorage.setItem("projects", JSON.stringify(projects));
}

projects = JSON.parse(localStorage.getItem("projects"));

// stores index of last project user clicked
let selectedProject = 0;

// highlights the project clicked by user
const highlightSelectedProject = (selectedProject) => {
    let projectContainers = document.querySelectorAll(".project-container");
    projectContainers.forEach( (container) => {
        container.classList.remove("clicked");
        if (container.id === selectedProject.toString()) {
            container.classList.add("clicked");
      } return;
    })
}

// sets selectedProject to first (non-null) project in projects array
for (project of projects) {
    if (project === null) {
      continue;
    }
    if (project) {
        let topProject = projects.indexOf(project);
        selectedProject = topProject;
        break;
    }
}

// clears any currently displayed finished tasks if finished tasks exist for project
const clearFinishedTasks = () => {
    if (document.getElementById("finished-task-container")) {
        const finishedTaskContainer = document.getElementById("finished-task-container");
        finishedTaskContainer.remove();
    } return;
}

// shows finished tasks in the DOM
const showFinishedTasks = (clickedProject) => {
    if (document.getElementById("finished-task-container")) {
        clearFinishedTasks();
    } else {
        // creates a finished tasks area and displays any that exist
        if (projects[clickedProject].finishedTasks.length !== 0) {

            const finishedTaskContainer = document.createElement("div");
            finishedTaskContainer.classList = "finished-task-container";
            finishedTaskContainer.id = "finished-task-container";
            const tasksDiv = document.getElementById("tasks");
            const categoryPara = document.createElement("p");
            categoryPara.id = "finished-tasks-heading";
            categoryPara.classList = "category finished-tasks-heading";
            const hr = document.createElement("hr");
            hr.id = "finished-task-hr";
            categoryPara.textContent = "Finished Tasks";

            finishedTaskContainer.appendChild(categoryPara);
            finishedTaskContainer.appendChild(hr);

            projects[clickedProject].finishedTasks.forEach((task) => {

                const finishedTaskItem = document.createElement("div");
                finishedTaskItem.classList = "finished-task-item";
                finishedTaskItem.id = "finished-task-item";

                let finishedTaskItemIndex = projects[clickedProject].finishedTasks.indexOf(task);
                try {
                    finishedTaskItem.innerHTML = "\&#10004" +
                    ` ${projects[clickedProject].finishedTasks[finishedTaskItemIndex].taskTitle}`;
                }

                catch (error) {
                    return;
                }
                finishedTaskContainer.appendChild(finishedTaskItem);
            })

            tasksDiv.appendChild(finishedTaskContainer);

        } else {
            return;
        }
    }
}

// display all tasks for the selected project
const showTasks = (clickedProject) => {
    const taskListDiv = document.getElementById("tasks-list");
    taskListDiv.textContent = "";


    try {
        projects[clickedProject].tasks.forEach((task) => {

            let taskContainer = document.createElement("div");
            taskContainer.classList = "task-container hover pointer";
    
            let taskItem = document.createElement("div");
            taskItem.classList = "task-item";
            taskItem.id = projects[clickedProject].tasks.indexOf(task);
    
            let taskItemIndex = projects[clickedProject].tasks.indexOf(task);
            try {
                taskItem.textContent = projects[clickedProject].tasks[taskItemIndex].taskTitle;
            }
    
            catch (e) {
                return;
            }
            taskListDiv.appendChild(taskContainer);
            taskContainer.appendChild(taskItem);
    
            // add expand buttons to each task item
            let taskExpandButton = document.createElement("div");
            taskExpandButton.classList = "task-expand-button hover";
            taskExpandButton.id = projects[clickedProject].tasks.indexOf(task);
            taskExpandButton.textContent = "MORE >";
            taskContainer.appendChild(taskExpandButton);
    
            let expandButtonClicked = false;
    
            taskExpandButton.addEventListener("click", (event) => {
                taskExpandButton.setAttribute("display", "inline");
                let targetExpandIndex = Number(event.target.id);
                const taskExpandContainer = document.createElement("div");
                const taskDescriptionValue = document.createElement("div");
                const taskPriorityValue = document.createElement("div");
                const taskDueDateValue = document.createElement("div");
    
                taskExpandContainer.id = "task-expand-container";
                taskExpandContainer.classList = "task-expand-container";
    
                taskDescriptionValue.id = `task-description-value-${targetExpandIndex.toString()}`;
                taskDescriptionValue.classList = "task-description-value";
                taskDescriptionValue.innerHTML = `DESCRIPTION: ${projects[clickedProject].tasks[targetExpandIndex].taskDescription}`;
    
                taskPriorityValue.id = `task-priority-value-${targetExpandIndex.toString()}`;
                taskPriorityValue.classList = "task-priority-value";
                taskPriorityValue.innerHTML = `PRIORITY: ${projects[clickedProject].tasks[targetExpandIndex].taskPriority}`;
                
                taskDueDateValue.id = `task-due-date-value-${targetExpandIndex.toString()}`;
                taskDueDateValue.classList = "task-due-date-value";
                if (projects[clickedProject].tasks[targetExpandIndex].taskDueDate === "") {
                    taskDueDateValue.innerHTML = "DUE DATE: None";
                } else {
                    taskDueDateValue.innerHTML = `DUE DATE: ${projects[clickedProject].tasks[targetExpandIndex].taskDueDate}`;
                }
    
                if (expandButtonClicked) {
                    let taskDescription = document.getElementById(`task-description-value-${targetExpandIndex.toString()}`);
                    let taskPriority = document.getElementById(`task-priority-value-${targetExpandIndex.toString()}`);
                    let taskDueDate = document.getElementById(`task-due-date-value-${targetExpandIndex.toString()}`);
                    taskDescription.remove();
                    taskPriority.remove();
                    taskDueDate.remove();
                    taskExpandButton.textContent = "MORE >";
                    taskContainer.classList.remove("clicked");
                    return expandButtonClicked = false;
                }
    
                taskContainer.appendChild(taskExpandContainer);
                taskExpandContainer.appendChild(taskDescriptionValue);
                taskExpandContainer.appendChild(taskPriorityValue);
                taskExpandContainer.appendChild(taskDueDateValue);
    
                taskExpandButton.textContent = "< LESS";
    
                expandButtonClicked = true;
                taskContainer.classList.add("clicked");
            })
    
            // add delete buttons to each task item
            let taskDeleteButton = document.createElement("div");
            taskDeleteButton.classList = "task-delete-button hover";
            taskDeleteButton.id = projects[clickedProject].tasks.indexOf(task);
            taskDeleteButton.textContent = "\u00D7";
            taskContainer.appendChild(taskDeleteButton);
    
            // defines behavior when a delete button is clicked
            let taskDeleteButtons = document.querySelectorAll(".task-delete-button");
            taskDeleteButtons.forEach((taskDeleteButton) => {
                taskDeleteButton.addEventListener("click", (event) => {
                    let targetTaskIndex = Number(event.target.id);
                    delete projects[clickedProject].tasks[targetTaskIndex];
                    localStorage.setItem("projects", JSON.stringify(projects));
                    event.target.parentElement.remove();
                })
            })
    
            // add finished buttons to each task item
            let taskFinishedButton = document.createElement("div");
            taskFinishedButton.classList = "task-finished-button hover";
            taskFinishedButton.id = projects[clickedProject].tasks.indexOf(task);
            taskFinishedButton.innerHTML = "&#10061";
            taskContainer.appendChild(taskFinishedButton);
    
            // defines behavior when a finished button is clicked
            let taskFinishedButtons = document.querySelectorAll(".task-finished-button");
            taskFinishedButtons.forEach((taskFinishedButton) => {
                taskFinishedButton.addEventListener("click", (event) => {
                    let targetTaskIndex = Number(event.target.id);
                    let finishedTask = projects[clickedProject].tasks[targetTaskIndex];
                    projects[clickedProject].finishedTasks.push(finishedTask);
                    delete projects[clickedProject].tasks[targetTaskIndex];
                    localStorage.setItem("projects", JSON.stringify(projects));
                    taskFinishedButton.innerHTML = "\&#10004";
                    setTimeout(() => {
                        event.target.parentElement.remove();
                        showTasks(selectedProject);
                    }, 250);
                })
            })
        })
    }

    catch (e) {
        return;
    }

    clearFinishedTasks();
    showFinishedTasks(selectedProject);
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
            if (projectContainer.classList.contains("clicked")) {
                return;
            }
            let clickedProject = Number(event.target.id);
            selectedProject = clickedProject;
            highlightSelectedProject(clickedProject);
            showTasks(clickedProject);
        })
        try {
            projectItem.textContent = project.projectTitle;
        }

        catch (e) {
            return;
        }
        projectsDiv.appendChild(projectContainer);
        projectContainer.appendChild(projectItem);

        // add delete buttons to each project item
        let projectDeleteButton = document.createElement("div");
        projectDeleteButton.classList = "project-delete-button hover";
        projectDeleteButton.id = projects.indexOf(project);
        projectDeleteButton.textContent = "\u00D7";
        projectContainer.appendChild(projectDeleteButton);

        // defines behavior when a delete button is clicked
        let projectDeleteButtons = document.querySelectorAll(".project-delete-button");
        projectDeleteButtons.forEach((projectDeleteButton) => {
            projectDeleteButton.addEventListener("click", (event) => {
                let targetProjectIndex = Number(event.target.id);
                if (targetProjectIndex == selectedProject) {
                    const taskListDiv = document.getElementById("tasks-list");
                    taskListDiv.innerHTML = "";
                }
                delete projects[targetProjectIndex];
                localStorage.setItem("projects", JSON.stringify(projects));
                event.target.parentElement.remove();
                clearFinishedTasks();
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
    addProjectForm.addEventListener("submit", function(event) {
        if (addProjectButtonClicked) {
            return;
        }
        event.preventDefault();
        addProjectButtonClicked = true;
        let newProjectName = projectInputField.value;
        let newProjectInstance = ProjectFactory(newProjectName);
        projects.push(newProjectInstance);
        localStorage.setItem("projects", JSON.stringify(projects));
        projectInputField.remove();
        projectButtonsDiv.remove();
        showProjects();
        let newProject = Number(projects.indexOf(newProjectInstance));
        selectedProject = newProject;
        highlightSelectedProject(newProject);
        showTasks(selectedProject);
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

const addNewTaskButton = document.getElementById("add-new-task");

// controls what happens when add task button is clicked depending on
// if there are no projects
addNewTaskButton.addEventListener("click", () => {
    let checkProjects = checkIfAllEmptyProjects();
    if (checkProjects === undefined) {
        alert("You must create a project before adding tasks.");
        return;
    } addNewTaskDiv();
})

let newTaskButtonClicked = false;

// displays add task form and controls logic
const addNewTaskDiv = () => {
    if (newTaskButtonClicked) {
        return;
    }

    const addTaskFormDiv = document.getElementById("add-task-form-container");
    addTaskFormDiv.classList.remove("hidden");
    const taskTitleInputField = document.createElement("input");
    const taskTitleInputFieldLabel = document.createElement("label");
    const taskDescriptionInputField = document.createElement("input");
    const taskDescriptionInputFieldLabel = document.createElement("label");
    const taskPrioritySelect = document.createElement("select");
    const taskPrioritySelectLabel = document.createElement("label");
        const taskPriorityHigh = document.createElement("option");
        const taskPriorityMedium = document.createElement("option");
        const taskPriorityLow = document.createElement("option");
    const taskDueDateInputField = document.createElement("input");
    const taskDueDateInputFieldLabel = document.createElement("label");
    const taskButtonsDiv = document.createElement("div");
    const addTaskButton = document.createElement("button");
    const cancelTaskButton = document.createElement("button");
    const addTaskForm = document.createElement("form");

    taskTitleInputFieldLabel.setAttribute("for", "new-task-title");
    taskTitleInputFieldLabel.textContent = "Task title:";

    taskTitleInputField.type = "text";
    taskTitleInputField.id = "new-task-title";
    taskTitleInputField.name = "new-task-title";
    taskTitleInputField.required = true;
    taskTitleInputField.classList = "task-title-input";
    taskTitleInputField.setAttribute("maxlength", 120);
    taskTitleInputField.setAttribute("placeholder", "Enter the task to be completed");

    taskDescriptionInputFieldLabel.setAttribute("for", "new-task-description");
    taskDescriptionInputFieldLabel.textContent = "Task description:";

    taskDescriptionInputField.type = "text";
    taskDescriptionInputField.id = "new-task-description";
    taskDescriptionInputField.name = "new-task-description";
    taskDescriptionInputField.required = true;
    taskDescriptionInputField.classList = "task-description-input";
    taskDescriptionInputField.setAttribute("maxlength", 120);
    taskDescriptionInputField.setAttribute("placeholder", "Enter a description of the task");

    taskPrioritySelectLabel.setAttribute("for", "new-task-priority");
    taskPrioritySelectLabel.textContent = "Priority level:"

    taskPrioritySelect.type = "select";
    taskPrioritySelect.id = "new-task-priority";
    taskPrioritySelect.name = "new-task-priority";
    taskPrioritySelect.required = true;
    taskPrioritySelect.classList = "task-priority-select";
    taskPrioritySelect.name = "task-priority"

    taskPriorityHigh.value = "High";
    taskPriorityHigh.textContent = "High";
    taskPriorityMedium.value = "Medium";
    taskPriorityMedium.textContent = "Medium";
    taskPriorityLow.value = "Low";
    taskPriorityLow.textContent = "Low";

    taskDueDateInputFieldLabel.setAttribute("for", "new-task-due-date");
    taskDueDateInputFieldLabel.textContent = "Due date:";

    taskDueDateInputField.type = "date";
    taskDueDateInputField.id = "new-task-due-date";
    taskDueDateInputField.name = "new-task-due-date";
    taskDueDateInputField.classList = "task-due-date-input";

    taskButtonsDiv.classList = "new-task-buttons";

    addTaskForm.id = "add-task-form";
    addTaskForm.classList = "add-task-form";

    addTaskButton.type = "submit";
    addTaskButton.value = "Add";

    cancelTaskButton.value = "Cancel";

    addTaskButton.textContent = "Add";
    cancelTaskButton.textContent = "Cancel";

    addTaskFormDiv.appendChild(addTaskForm);
    addTaskForm.appendChild(taskTitleInputFieldLabel);
    addTaskForm.appendChild(taskTitleInputField);
    addTaskForm.appendChild(taskDescriptionInputFieldLabel);
    addTaskForm.appendChild(taskDescriptionInputField);
    addTaskForm.appendChild(taskPrioritySelectLabel);
    addTaskForm.appendChild(taskPrioritySelect);
    taskPrioritySelect.appendChild(taskPriorityHigh);
    taskPrioritySelect.appendChild(taskPriorityMedium);
    taskPrioritySelect.appendChild(taskPriorityLow);
    addTaskForm.appendChild(taskDueDateInputFieldLabel);
    addTaskForm.appendChild(taskDueDateInputField);
    addTaskForm.appendChild(taskButtonsDiv);
    taskButtonsDiv.appendChild(addTaskButton);
    taskButtonsDiv.appendChild(cancelTaskButton);
    taskTitleInputField.focus();

    newTaskButtonClicked = true;

    let addTaskButtonClicked = false;

    let addTaskFormContainer = document.getElementById("add-task-form");

    // when submit action is clicked then add the new task to the tasks array
    // of the currently clicked project & remove the form elements then
    // re-display the tasks array in the tasks div
    addTaskForm.addEventListener("submit", function(event) {
        if (addTaskButtonClicked) {
            return;
        }
        event.preventDefault();
        addTaskButtonClicked = true;
        let newTaskTitle = taskTitleInputField.value;
        let newTaskDescription = taskDescriptionInputField.value;
        let newTaskPriority = taskPrioritySelect.value;
        let newTaskDueDate = taskDueDateInputField.value;
        projects[selectedProject].tasks.push(
            TaskFactory(
                newTaskTitle,
                newTaskDescription,
                newTaskPriority,
                newTaskDueDate
            )
        );

        localStorage.setItem("projects", JSON.stringify(projects));

        showTasks(selectedProject);
        newTaskButtonClicked = false;
        addTaskFormContainer.remove();
        addTaskFormDiv.classList.add("hidden");
    });

    // if cancel button is clicked then remove the form elements from the DOM
    cancelTaskButton.addEventListener("click", () => {
        newTaskButtonClicked = false;
        addTaskFormContainer.remove();
        addTaskFormDiv.classList.add("hidden");
    })
}

// display projects and tasks on page load
showProjects();
showTasks(selectedProject);

// highlights top project on page load
highlightSelectedProject(selectedProject);