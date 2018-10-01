console.info("hello");
class TodoList {
    constructor() {
        this.taskService1 = new TaskService;
        this.taskRenderUi1 = new ToDoRender;
        // находим кнопку создная задачи
        this.buttonCreatTask = document.querySelector('#createtask');
        // присваеиваем обработчик события
        this.buttonCreatTask.addEventListener('click', this.createTask.bind(this));
        // делаем колбэк для гет запроса        
        this.taskService1._requstGetTask = this.callBackCreateTaskStart.bind(this);
        // делаем колбэк для пост запроса
        this.taskService1.addNewTaskInArrCallBack = this.addTaskInTaskArr.bind(this);
                // делаем колбэк для delete запроса
                //  -- this.taskService1.
        // находим input для ввода наименвоания задач (идет в title)
        this.inputTaskel = document.querySelector('#inputtask');
        // создаем пустой массив куда будут созраняться все таски
        this.tasks = [];
        // находим все элементы кнопка delite
        this.buttonDeleteEl = '';
    }
    // запускаем раобту todo list и получаем от сервера массив уже составленных задач
    start() {
        // отпавляем зпрос на сервер для получения уже имеющихся задча (getTaskService)
       this.startRequestTasks();
    }
    startRequestTasks(){
        // Вешаем обработчики события на инпут
        this.addEventListenerOnInput()
        // отправляем стартовый запрос на сервери и получаем уже сохраненные на сервере задачи
        this.taskService1.getTaskService();
    }
    // перерисовываем задачи после удаления
    renderTaskAfterDelete(){
        
    }
    // добавление новых задач в промежуточный массив
    addTaskInTaskArr(result1){
        console.log ('postcallback');
        console.log(result1);
        /* проверям ответ, котоырй пришел от серевер. Если все хорошо
         * то добовляем его в массив тасок
         * */

        if(result1.status =="success"){
            console.log(result1.task.title);
            this.tasks.unshift(result1.task);
            console.log(this.tasks);
            this.renderTask(this.tasks);
            this.switchOffLoader(result1.status);
        }
    }
    // // для каждого элемента массива задач, который возварщает аякс запрос гет мы отрисовываем элемет ли
    // renderTask(tasks) {
    //     // -- this.addTaskInTasksArr(tasks);
    //     var tasksPlaceEl = document.querySelector('#tasksplace');
    //     tasksPlaceEl.innerHTML = '';
    //     // массив tasksсодержит 6 тасков
    //     console.log(tasks);
    //     for (let i = tasks.length-1; i >=0; i--) {
    //         let taskEl = document.createElement('li');
    //         console.log(tasks[i]);
    //         // добавляем содержимое элемента li
    //         taskEl.innerHTML = `<div >
    //         <input type="checkbox">
            
    //         <span>${tasks[i].title}</span>
    //         <span>дата выполнения</span>
    //         <button class="buttondeleteclass">delete</button>
    //         </div>`;
    //         tasksPlaceEl.appendChild(taskEl);
    //         // находим все кнопки удаления и вешаем на них обработчик событий

    //     }
    //     this.addEvenеtDeleteOnButton(tasks);
    // }
    
    renderTask(tasks) {
        // -- this.addTaskInTasksArr(tasks);
        var tasksPlaceEl = document.querySelector('#tasksplace');
        tasksPlaceEl.innerHTML = '';
        // массив tasksсодержит 6 тасков
        for (let i = 0, taskplaceElLength = tasks.length; i < taskplaceElLength; i++) {
            let taskEl = document.createElement('li');
            // добавляем содержимое элемента li
            taskEl.innerHTML = `<div class="taskclass" >
            <input type="checkbox" class="checkboxclass">
            <span class="titleclass">${tasks[i].title}</span>
            <span>дата выполнения</span>
            <button class="buttondeleteclass">delete</button>
            <div class="loader"><div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>
            
            </div>`;
            tasksPlaceEl.appendChild(taskEl);
            // находим все кнопки удаления и вешаем на них обработчик событий

            

        }
        this.addEventListenerOnCheckbox(tasks);
        this.addEvenеtDeleteOnButton(tasks);
        this.setDataAtributOnTitle(tasks);

    }
    // скрываем лоадер
    switchOffLoader(success){
        if (success =="success"){
            let loaderEl = document.querySelector('.lds-spinner');
            loaderEl.style.visibility = "hidden";
        }
    }  
    // удаление задачи. 
    //Вешаем обработчик события.
    addEvenеtDeleteOnButton(tasks) {
        this.buttonDeleteEl = document.querySelectorAll('.buttondeleteclass');      
        console.info(tasks);
        for (let i = 0; i < this.buttonDeleteEl.length; i++) {
        
            this.buttonDeleteEl[i].setAttribute('data-task_id', tasks[i].id);
            this.buttonDeleteEl[i].addEventListener('click', this.deleteTask.bind(this));
        }
    }
    //задаем дата атрибут с id таски на все тайтл задачи и на checkbox
    setDataAtributOnTitle(tasks){
        var titleEl = document.querySelectorAll('.titleclass');
        for (let maxlenght = titleEl.length, i = 0; i < maxlenght; i++){
            titleEl[i].setAttribute('data-task_id',tasks[i].id)
            console.info(titleEl[i]);
        }
        console.log (tasks);
    }
    // //задаем дата атрибут с id таски  на все чекбоксы
    // setDataAtributOnTitle(tasks){
    //     var checkboxEl = document.querySelectorAll('.titleclass');
    //     for (let maxlenght = titleEl.length, i = 0; i < maxlenght; i++){
    //         titleEl[i].setAttribute('data-task_id')
    //         console.info(titleEl[i]);
    //     }
    //     console.log (tasks);
    // }

    //Добавляем обработчик собыития на выполнение задачи
    //задаем дата атрибут с id таски  на все чекбоксы
    addEventListenerOnCheckbox(tasks){
        console.log(tasks);
        var checkBoxEl = document.querySelectorAll(".checkboxclass");
        for (let i = 0, maxlenght = checkBoxEl.length; i < maxlenght; i++){
            checkBoxEl[i].addEventListener('change', this.changeIsDone.bind(this));
            checkBoxEl[i].setAttribute('data-task_id',tasks[i].id)
        }
    }
    //функция смены отметки о выполнении задачи
    changeIsDone(e){
        console.info(e.target);
        console.log( e.target.closest('input'));
    }

    // добавляем обработчки события на инпут, который будет реагированить на 
    // нажие ентера
    addEventListenerOnInput(){
        this.inputTaskel.addEventListener('keydown', (event)=>{
            if (event.keyCode == 13){
            this.createTask();
        }
    })
    
    }
    
    // метод удаления таски с сервера
    deleteTask(e) {
        /** в переменную вводим значение дата атрибута, который равен
         * удаляемой таски. С помощью этого атрибут мы находим таску в
         * в массиве объектов и удаляем ее.
         * 
         */
        var currentDataTaskId = e.currentTarget.dataset.task_id;
        console.info (currentDataTaskId);
      
        /* каждый элемент массива задач проверяем. Сверяем с id удаляемой
         * таски  */
      
        this.tasks.forEach(( item, i)=>{
            if (item.id == currentDataTaskId){
                console.log(this.tasks.indexOf(item));
                this.tasks.splice(this.tasks.indexOf(item),1);
                console.log(this.tasks);
            }
            this.renderTask(this.tasks);
        });
        this.taskService1.deleteTaskService(currentDataTaskId);
    }


    // колбэк функция которая вызывается ответом на ajax запрос типа post на сервер
    // и показывает нам содержимое ответа;
    callBackCreateTaskStart(result) {
        console.log(typeof (result));
        console.log(result);
        //this.addTaskInTasksArr(result);
        if (result.length>0){
            for(let i of result){
                this.tasks.unshift(i);
                }
                console.log(this.tasks);
            }
        // в результате ajax запроса приходит объект, который мы пушим в массив объектов
        //this.tasks.push(result);
        // console.log(this.tasks);
        this.renderTask(this.tasks);
        // this.taskRenderUi1.renderTask();
    }
    callbackGetTask() {

    }

    // функция создания задачи. Отпралляет ajax запрос типа post на сервер.
    // Вызывается при нажатии на кнопку create
    createTask() {
        console.info('create task');
        //вызываем фенкцию афкс запрос и передаем ей парамет: значение инпута
        this.taskService1.postTaskService(this.inputTaskel.value);
        //значение инпута обнуляем
        this.inputTaskel.value = '';
        var loaderEl = document.querySelector('.lds-spinner');
        loaderEl.style.visibility = "visible";
    }
}