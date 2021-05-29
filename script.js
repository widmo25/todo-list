{
    let tasks = [];
    let hideDoneTasks = false;
    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ]
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        const task = tasks[taskIndex];
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...task, done: !task.done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const clearInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const allTaskDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindButtonsEvent = () => {

        const allTaskDoneButton = document.querySelector(".js-allDoneButton");
        if (allTaskDoneButton) {
            allTaskDoneButton.addEventListener("click", (allTaskDone))
        }

        const toggleHiddenTask = document.querySelector(".js-hideDoneButton");
        if (toggleHiddenTask) {
            toggleHiddenTask.addEventListener("click", toggleHideDoneTasks);
        }

    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-newTask")
        const newTaskContent = newTask.value.trim();
        if (newTaskContent === "") {
            clearInput(newTask);
            return;
        };
        addNewTask(newTaskContent);
        clearInput(newTask);
    };

    const renderTasks = () => {
        let htmlTasks = tasks.map(({ content, done }) =>
            `
            <li class=\"list__item ${done && hideDoneTasks ? "list__item--hidden" : ""}\">
                    <button class=\"list__button js-done\">
                      ${done ? "✔" : ""}
                     </button>
                    <p class=\"list__task\ ${done ? "list__task--done" : ""}\">
                      ${content}
                    </p>
                    <button class=\"list__button list__button--higligthed js-remove\">
                      🗑
                    </button>
                </li>
            `
        ).join("")
        document.querySelector(".js-task").innerHTML = htmlTasks
    }

    const renderButtons = () => {
        let buttonList;
        if (!tasks.length) {
            return
        }
        else {
            buttonList = `
            <li class=\"hiddenList__item\">
                <button class=\"hiddenList__button js-hideDoneButton\">
                   ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
            </li>
            <li class=\"hiddenList__item\">
                <button class=\"hiddenList__button js-allDoneButton\" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                    Ukoncz Wszystkie
                </button>
            </li>
            `
        }
        document.querySelector(".js-buttonList").innerHTML = buttonList;
    }

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvent();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }
    init();

}