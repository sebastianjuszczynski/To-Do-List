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

    const init = () => {
        render();
    };
    init();
}