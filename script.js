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
                <li>
                    <button class=\"list__button js-done\">✔</button>
                    ${task.content}
                    <button class=\"list__button js-remove\">🗑</button>
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