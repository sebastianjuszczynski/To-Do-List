{
    const tasks = [
        {
            content: "Zrobić zadanie domowe",
            done: false,
        },
        {
            content: "Zjeść obiad",
            done: true,
        }
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    }
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
            <button class="js-done">✔️</button>
            <button class="js-remove">🗑️</button>
            ${task.content}
            </li>
            `;
        };
        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-input");
        const newTaskContent = newTaskElement.value.trim();
        if (newTaskContent === "") {
            return;
        } else  {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };
    init();
}