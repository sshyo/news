let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs= document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode='all';
let filterList=[];
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter"){
        addButton.click();
    
    }
})



for(let i=1;i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
    filter(event);
});
}


function addTask() {
    if (taskInput.value.trim() === "") {
        alert("할 일을 입력하세요.");
        return;
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };

    taskList.push(task);
    render();
    taskInput.value = ""; 
}

function render() {    // 1. 내가 선택한 탭에 따라서
    let list=[];
    if(mode === "all"){
        list = taskList;     // all taskList
    }else if(mode === "ongoing"|| mode === "done"){
        list= filterList;
    }                  //2. 리스트를 달리 보여준다





    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if(list[i].isComplete== true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">취소</button>
                <button onclick="deleteTask('${list[i].id}')">삭제</button>
                            </div>
        </div>`;
        
        } else{       
        resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">완료</button></button>
                <button onclick="deleteTask('${list[i].id}')">삭제</button>
                            </div>
        </div>`;
    }
}
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}



function deleteTask(id) {
    for (let i = 0; i <taskList.length; i++){
        if(taskList [i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
        render(); 
    }

function filter(event){
    console.log("filter", event.target.id);
    mode = event.target.id;
    filterList = []

    if(mode === "all"){           //전체 리스트를 보여준다
     render();

    }else if(mode === "ongoing"){     // 진행중인 아이템을 보여준다
      for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete === false){
            filterList.push(taskList[i]);
        }
    }render();

    }else if(mode === "done"){     // 끝나는 케이스
        for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete === true){
            filterList.push(taskList[i]);
        }
    }render();
    }
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
}

function randomIDGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
}



function randomIDGenerator() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  }








  function toggleDone(id) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === id) {
        taskList[i].isComplete = !taskList[i].isComplete;
        break;
      }
    }
    filter();
  }
  
  function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === id) {
        taskList.splice(i, 1);
      }
    }
  
    filter();
  }


  function filter(e) {
    if (e) {
      mode = e.target.id;
      underLine.style.width = e.target.offsetWidth + "px";
      underLine.style.left = e.target.offsetLeft + "px";
      underLine.style.top =
        e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
    } 
  
    filterList = [];
    if (mode === "ongoing") {
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == false) {
          filterList.push(taskList[i]);
        }
      }
    } else if (mode === "done") {
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete) {
          filterList.push(taskList[i]);
        }
      }
    }
    render();
  }
  
  function randomIDGenerator() {
       return "_" + Math.random().toString(36).substr(2, 9);
  }