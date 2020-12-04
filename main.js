{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };
    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();
    };
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
    };
    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };
    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindToggleDoneEvents = () => {
        const doneButtons = document.querySelectorAll(".js-done");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        })
    }

    const bindRemoveButtons = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };
        
    



    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }
        buttonsElement.innerHTML = `
        <button class="hideButton js-hideButton">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button 
            class="allDone js-allDone"
            ${tasks.every(({ done }) => done) ? " disabled" : ""}
        >
        Ukończ wszystkie
         </button>    
        `;
    };

    const bindButtonsEvents = () => {
        const allTasksDone = document.querySelector(".js-allDone");

        if (allTasksDone) {
            allTasksDone.addEventListener("click", markAllTasksDone)
        }
        const hideButton = document.querySelector(".js-hideButton");

        if (hideButton) {
            hideButton.addEventListener("click", toggleHideDoneTasks);
        }


    };

    const renderHTML = () => {
        const taskToHTML = task =>
            `
        <li class="tasks__item ${task.done && hideDoneTasks ? " tasks__item--hidden" : ""}">
        <button class="container__tasks__done js-done">${task.done ? "✔️" : " "}</button>
        <button class="container__tasks__remove js-remove">🗑️</button>
        ${task.content}
        </li>
        `;
        const tasksElement = document.querySelector(".js-tasksList");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    }

    const render = () => {
        renderHTML();
        renderButtons();
        bindToggleDoneEvents()
        bindRemoveButtons();
        bindButtonsEvents();
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


    };
    init();
}