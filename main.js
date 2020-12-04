{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    }
    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        
        render();
    }
    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];
        render();
    }
    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    }
    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const bindEvents = () => {
        const doneButtons = document.querySelectorAll(".js-done");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        })
        const buttonsRemove = document.querySelectorAll(".js-remove");
        buttonsRemove.forEach((buttonRemove, index) => {
            buttonRemove.addEventListener("click", () => {
                removeTask(index);
            })
        })
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item ${task.done && hideDoneTasks ? " tasks__item--hidden" : ""}">
            <button class="container__tasks__done js-done">${task.done ? "✔️" : " "}</button>
            <button class="container__tasks__remove js-remove">🗑️</button>
            ${task.content}
            </li>
            `;
        };
        document.querySelector(".js-tasksList").innerHTML = htmlString;
        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-input");
        const newTaskContent = newTaskElement.value.trim();
        if (newTaskContent === "") {
            return;
        } else {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };


    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        const allTasksDone = document.querySelector(".js-allDone");
        allTasksDone.addEventListener("click", markAllTasksDone);
        const hideButton = document.querySelector(".js-hideButton");
        hideButton.addEventListener("click", toggleHideDoneTasks);
    };
    init();
}