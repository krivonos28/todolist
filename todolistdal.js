console.log('todolist DAL')
class TaskService {
    constructor(name) {
        this.name = name
    }
    //ajax запрос который возварщает массив тасок
    getTaskService() {
        console.info('expect a response from the server');

    }
    _requstGettTask(result) {

    }
    addNewTaskInArrCallBack(resultpost) {

    }
    renderTasksAfterDeleteCallBack() {

    }

    // ajax запрос на сервер, который записывает созданную задачу
    // в ответ он присылает обеъкт "задча" который мы постим в консоль с помощью 
    // колбэка и вызваем финкуцию ajax запроса для нормального получения задачи
    postTaskService(title) {
        console.info('The task creation function was called')
        console.log(title);
        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            data: {
                'widGetId': 26111987,
                'title': title
            },
            type: 'post',
            success: (resultpost) => {

                console.log(resultpost)
                //this._requstPostTask(result);
                this.addNewTaskInArrCallBack(resultpost)
            }

        })
    }
    getTaskService() {
        console.log('the task getting function culled');
        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            data: {
                widGetId: 26111987,
                //количество возвращаемых задач
                count: 30
            },
            type: 'get',
            success: (result) => {
                console.log(result);
                // через колбэк вызывает метод callBackCreateTasr -- rendertacr
                this._requstGetTask(result);

            },
            error: (result) => {
                this._requstGetTask(result);
            }

        })
    }
    deleteTaskService(taskId) {
        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            data: {
                'widgetid': 26111987,
                'taskId': taskId,
            },
            type: 'delete',
            success: (resultdel) => {
                console.log(resultdel);
                //  this.getTaskService()
                //  this.renderTasksAfterDeleteCallBack()
            }
        })

    }
}
