// object factory for creating project instances
const ProjectFactory = (projectTitle) => {
    return {
        projectTitle: projectTitle,
        tasks: [],
        finishedtasks: []
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

// clears any currently displayed finished tasks if finished tasks exist for project
const clearFinishedtasks = () => {
    if (document.getElementById("finished-task-container")) {
        const finishedtaskContainer = document.getElementById("finished-task-container");
        finishedtaskContainer.remove();
        // const categoryPara = document.getElementById("finished-tasks-heading");
        // categoryPara.remove();
        // const hr = document.getElementById("finished-task-hr");
        // hr.remove();
    } return;
}

// shows finished tasks in the DOM
const showFinishedtasks = (clickedProject) => {
    if (document.getElementById("finished-task-container")) {
        clearFinishedtasks();
    } else {
        // creates a finished tasks area and displays any that exist
        if (projects[clickedProject].finishedtasks.length !== 0) {

            const finishedtaskContainer = document.createElement("div");
            finishedtaskContainer.classList = "finished-task-container";
            finishedtaskContainer.id = "finished-task-container";
            const tasksDiv = document.getElementById("tasks");
            const categoryPara = document.createElement("p");
            categoryPara.id = "finished-tasks-heading";
            categoryPara.classList = "category finished-tasks-heading";
            const hr = document.createElement("hr");
            hr.id = "finished-task-hr";
            categoryPara.textContent = "Finished Tasks";

            finishedtaskContainer.appendChild(categoryPara);
            finishedtaskContainer.appendChild(hr);

            projects[clickedProject].finishedtasks.forEach((task) => {

                const finishedtaskItem = document.createElement("div");
                finishedtaskItem.classList = "finished-task-item";
                finishedtaskItem.id = "finished-task-item";

                let finishedtaskItemIndex = projects[clickedProject].finishedtasks.indexOf(task);
                finishedtaskItem.innerHTML = "\&#10004" + ` ${projects[clickedProject].finishedtasks[finishedtaskItemIndex].taskTitle}`;

                finishedtaskContainer.appendChild(finishedtaskItem);
            })

            tasksDiv.appendChild(finishedtaskContainer);

        } else {
            return;
        }
    }
}

// display all tasks for the selected project
const showtasks = (clickedProject) => {
    const tasksListDiv = document.getElementById("tasks-list");
    tasksListDiv.textContent = "";

    projects[clickedProject].tasks.forEach((task) => {
        let taskContainer = document.createElement("div");
        taskContainer.classList = "task-container hover pointer";

        let taskItem = document.createElement("div");
        taskItem.classList = "task-item";
        taskItem.id = projects[clickedProject].tasks.indexOf(task);

        let taskItemIndex = projects[clickedProject].tasks.indexOf(task);
        taskItem.textContent = projects[clickedProject].tasks[taskItemIndex].taskTitle;
        tasksListDiv.appendChild(taskContainer);
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
                let targettaskIndex = Number(event.target.id);
                delete projects[clickedProject].tasks[targettaskIndex];
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
                let targettaskIndex = Number(event.target.id);
                let finishedtask = projects[clickedProject].tasks[targettaskIndex];
                projects[clickedProject].finishedtasks.push(finishedtask);
                delete projects[clickedProject].tasks[targettaskIndex];
                event.target.parentElement.remove();
                showtasks(selectedProject);
            })
            taskFinishedButton.addEventListener("mouseover", () => {
                taskFinishedButton.innerHTML = "\&#10004";
            })
            taskFinishedButton.addEventListener("mouseout", () => {
                taskFinishedButton.innerHTML = "&#10061";
            })
        })
    })

    clearFinishedtasks();
    showFinishedtasks(selectedProject);
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
            showtasks(clickedProject);
        })
        projectItem.textContent = project.projectTitle;
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
                    const tasksListDiv = document.getElementById("tasks-list");
                    tasksListDiv.innerHTML = "";
                }
                delete projects[targetProjectIndex];
                event.target.parentElement.remove();
                clearFinishedtasks();
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
        showtasks(selectedProject);
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

const addNewtaskButton = document.getElementById("add-new-task");

// controls what happens when add task button is clicked depending on
// if there are no projects
addNewtaskButton.addEventListener("click", () => {
    let checkProjects = checkIfAllEmptyProjects();
    if (checkProjects === undefined) {
        alert("You must create a project before adding tasks.");
        return;
    } addNewtaskDiv();
})

let newtaskButtonClicked = false;

// displays add task form and controls logic
const addNewtaskDiv = () => {
    if (newtaskButtonClicked) {
        return;
    }

    const addtaskFormDiv = document.getElementById("add-task-form-container");
    addtaskFormDiv.classList.remove("hidden");
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
    const addtaskButton = document.createElement("button");
    const canceltaskButton = document.createElement("button");
    const addtaskForm = document.createElement("form");

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

    addtaskForm.id = "add-task-form";
    addtaskForm.classList = "add-task-form";

    addtaskButton.type = "submit";
    addtaskButton.value = "Add";

    canceltaskButton.value = "Cancel";

    addtaskButton.textContent = "Add";
    canceltaskButton.textContent = "Cancel";

    addtaskFormDiv.appendChild(addtaskForm);
    addtaskForm.appendChild(taskTitleInputFieldLabel);
    addtaskForm.appendChild(taskTitleInputField);
    addtaskForm.appendChild(taskDescriptionInputFieldLabel);
    addtaskForm.appendChild(taskDescriptionInputField);
    addtaskForm.appendChild(taskPrioritySelectLabel);
    addtaskForm.appendChild(taskPrioritySelect);
    taskPrioritySelect.appendChild(taskPriorityHigh);
    taskPrioritySelect.appendChild(taskPriorityMedium);
    taskPrioritySelect.appendChild(taskPriorityLow);
    addtaskForm.appendChild(taskDueDateInputFieldLabel);
    addtaskForm.appendChild(taskDueDateInputField);
    addtaskForm.appendChild(taskButtonsDiv);
    taskButtonsDiv.appendChild(addtaskButton);
    taskButtonsDiv.appendChild(canceltaskButton);
    taskTitleInputField.focus();

    newtaskButtonClicked = true;

    let addtaskButtonClicked = false;

    let addtaskFormContainer = document.getElementById("add-task-form");

    // when submit action is clicked then add the new task to the tasks array
    // of the currently clicked project & remove the form elements then
    // re-display the tasks array in the tasks div
    addtaskForm.addEventListener("submit", function(e) {
        if (addtaskButtonClicked) {
            return;
        }
        e.preventDefault();
        addtaskButtonClicked = true;
        let newtaskTitle = taskTitleInputField.value;
        let newtaskDescription = taskDescriptionInputField.value;
        let newtaskPriority = taskPrioritySelect.value;
        let newtaskDueDate = taskDueDateInputField.value;
        projects[selectedProject].tasks.push(
            TaskFactory(
                newtaskTitle,
                newtaskDescription,
                newtaskPriority,
                newtaskDueDate
            )
        );

        showtasks(selectedProject);
        newtaskButtonClicked = false;
        addtaskFormContainer.remove();
        addtaskFormDiv.classList.add("hidden");
    });

    // if cancel button is clicked then remove the form elements from the DOM
    canceltaskButton.addEventListener("click", () => {
        newtaskButtonClicked = false;
        addtaskFormContainer.remove();
        addtaskFormDiv.classList.add("hidden");
    })
}

// display projects and tasks on page load
showProjects();
showtasks(selectedProject);

// highlight default "Random Tasks" project on page load
const randomTasksProject = document.getElementById("0").classList.add("clicked");