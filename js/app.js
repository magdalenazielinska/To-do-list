document.addEventListener('DOMContentLoaded', function() {

    var addBtn = document.getElementById('addTaskButton');
    var removeBtn = document.getElementById('removeFinishedTasksButton');
    var taskList = document.getElementById('taskList');
    var input = document.getElementById('taskInput');
    var text = '';
    var body = document.querySelector('body .container');
    var priority = document.getElementById('taskPriority');
    var errors = document.getElementById('error-message');
    errors.style.color = 'red';

    // Tasks-to-do counter
    var toDo = document.createElement('span');
    var counter = 0;
    toDo.innerText = "Tasks to do: " + counter;
    body.insertBefore(toDo, taskList);

    // Validation
    function validate() {
        var re = /\D/g;
        var isValid = true;
        var errorMsg = "";

        if (input.value.length <= 4 || input.value.length >= 101) {
            isValid = false;
            errorMsg += 'Your task should have between 5 and 100 characters! \n'
        }

        if (priority.value < 1 || priority.value > 10 || re.test(priority.value)) {
            isValid = false;
            errorMsg += 'The priority should be a number from 1 to 10! \n'
        }

        errors.innerText = errorMsg;
        return isValid;
    }

    // Add a task
    addBtn.addEventListener('click', function() {
        if (validate()) {
            text = input.value + ', priority: ' + priority.value;
            var li = document.createElement('li');
            var pTask = document.createElement('p');
            var buttonCom = document.createElement('button');
            var buttonDel = document.createElement('button');
            buttonCom.classList.add('taskbutton');
            buttonDel.classList.add('taskbutton');

            li.dataset.priority = priority.value;
            li.dataset.done = 'no';
            pTask.innerText = text;
            buttonDel.innerText = 'Delete';
            buttonCom.innerText = 'Complete';

            //Add and sort tasks
            var allLi = document.querySelectorAll('li');
            var sortNum = allLi.length;
            for (var i = 0; i < allLi.length; i++) {
                if (parseInt(li.dataset.priority) > parseInt(allLi[i].dataset.priority)) {
                    sortNum = i;
                    break;
                }
            }

            taskList.insertBefore(li, allLi[sortNum]);
            li.appendChild(pTask);
            li.appendChild(buttonDel);
            li.appendChild(buttonCom);

            // Increase the number of tasks to do
            counter++;
            toDo.innerText = "Tasks to do: " + counter;

            // Delete a task
            buttonDel.addEventListener('click', function () {
                li.parentElement.removeChild(li);
                if (li.dataset.done === 'no') {
                  counter--;
                }
                toDo.innerText = "Tasks to do: " + counter;
            });

            // Mark a task as completed or uncompleted
            buttonCom.addEventListener('click', function () {
                if (li.dataset.done === 'no') {
                    li.dataset.done = 'yes';
                    pTask.style.textDecoration = "line-through";
                    counter--;
                    toDo.innerText = "Tasks to do: " + counter;
                } else {
                    li.dataset.done = 'no';
                    pTask.style.textDecoration = null;
                    counter++;
                    toDo.innerText = "Tasks to do: " + counter;
                }
            });

            // Remove completed tasks from the list
            removeBtn.addEventListener('click', function () {
                if (li.dataset.done === 'yes' && li.parentElement !== null) {
                    li.parentElement.removeChild(li);
                }
            });
        }

        // Clear the input value after adding a task
        input.value = null;
        priority.value = null;
    });

});
