{
    let tasks = [];
    
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

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class=\"list__item\">
                    <button class=\"list__button js-done\">
                      ${task.done ? "✔" : ""}
                     </button>
                    <p class=\"list__task\ ${task.done ? "list__task--done" : ""}\">
                      ${task.content}
                    </p>
                    <button class=\"list__button list__button--higligthed js-remove\">
                      🗑
                    </button>
                </li>
            `;
        };
        document.querySelector(".js-task").innerHTML = htmlString;
        bindEvents();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }
    init();

}