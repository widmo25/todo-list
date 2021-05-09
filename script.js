{
    const tasks = [
    
    ];

    const addNewTask = (newTaskContent) =>{
        tasks.push({
            content: newTaskContent,
        });
        render();
    }


    
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        };
        addNewTask(newTaskContent);
    }

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class=\"list__item\">
                    <button class=\"list__button js-done\">✔</button>
                    <p class=\"list__task\">${task.content}</p>
                    <button class=\"list__button list__button--higligthed js-remove\">🗑</button>
                </li>
            `;
        };
        document.querySelector(".js-task").innerHTML = htmlString;
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (onFormSubmit));

    }
    init();

}