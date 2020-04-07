let storage = window.localStorage;

function addInStorage(object) {
    storage.setItem(object.title, JSON.stringify(object));
}

function removeInStorage(object) {
    let title = object.innerText;
    storage.removeItem(title);
}

function update(task) {
    storage.setItem(task.title, JSON.stringify(task));
}

function getAllTasks() {
    let tasks = [];
    forEachKey(task => {
        let jsonTask = JSON.parse(task);
        if (jsonTask.title) tasks.push(jsonTask);
    });

    tasks.sort((a, b) => {
        if (a.urgent) return -1;
        if (b.urgent) return 1;
        return a.sortIndex < b.sortIndex ? -1 : 1;
    });

    return tasks;
}

function forEachKey(callback) {
    for (let i = 0; i < storage.length; i++)
        callback(storage.getItem(storage.key(i)));
}

function isNewSession() {
    if (storage.getItem('newSession') === null) {
        storage.setItem('newSession', 'false');
        return true;
    }
    return false;
}

function getNewSortIndex() {
    let tasks = getAllTasks();
    return Math.max.apply(Math, tasks.map((task) => task.sortIndex)) + 1;
}