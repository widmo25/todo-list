{
    const tasks = [

    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (index,) => {
        tasks[index].done = !tasks[index].done;

        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        };
        addNewTask(newTaskContent);
    };

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class=\"list__item\">
                    <button class=\"list__button js-done\">${task.done ? "✔" : ""}</button>
                    <p class=\"list__task\ ${task.done ? "list__task--done" : ""}\">${task.content}</p>
                    <button class=\"list__button list__button--higligthed js-remove\">🗑</button>
                </li>
            `;
        };
        document.querySelector(".js-task").innerHTML = htmlString;

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

    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }
    init();

}