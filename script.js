const btn = document.getElementById("addTaskBtn")

btn.onclick = function(){
    addTask()
}

let tareas = []

document.addEventListener("DOMContentLoaded", function(){
    if(localStorage.getItem("tareas")){
        tareas = JSON.parse(localStorage.getItem("tareas"))
        console.log(tareas)
        let lista = document.getElementById("lista")
        tareas.forEach(function(tarea){
            addTaskStarage(tarea);
        })
    }
});

function addTaskStarage(tarea){
    let lista = document.getElementById("lista");
    let li = document.createElement("li")
        li.innerHTML = tarea.nombre
        if(tarea.estado){
            li.classList.add("tachado")
        }else{
            li.classList.remove("tachado")
        }
        li.onclick = function(){
            li.classList.toggle("tachado")
            if(tarea.estado){
                tarea.estado = false
            }else{
                tarea.estado = true
            }
        }
        let btn = document.createElement("button")
        btn.innerHTML = "X"
        btn.onclick = function(){

        tarea = tareas.find(function(tarea){
            return tarea.id == li.id

        })
        tareas.splice(tareas.indexOf(tarea), 1)
        lista.removeChild(li)
        localStorage.setItem("tareas", JSON.stringify(tareas));

        
    }
    li.appendChild(btn) 

        lista.appendChild(li)

}

function addTask(){

    var tarea = {
        nombre: document.getElementById("task").value,
        estado: false,
        id: getNumber()
    }

    if(!tarea){
        alert("No puedes agregar una tarea vacia")
        return
    }else{
        tareas.push(tarea)
        let lista = document.getElementById("lista")
        let li = document.createElement("li")
        li.innerHTML = tarea.nombre
        li.onclick = function(){
            li.classList.toggle("tachado")
            if(tarea.estado){
                tarea.estado = false
            }else{
                tarea.estado = true
            }
        }
        

        let id = document.createAttribute("id")
        id.value = tarea.id
        li.setAttributeNode(id)

        let btn = document.createElement("button")
        btn.innerHTML = "X"
        btn.onclick = function(){

            tarea = tareas.find(function(tarea){
                return tarea.id == li.id

            })
            tareas.splice(tareas.indexOf(tarea), 1)
            lista.removeChild(li)

        }
        li.appendChild(btn) 
        document.getElementById("task").value = ""
        localStorage.setItem("tareas", JSON.stringify(tareas));

        lista.appendChild(li)
    }
    
}

function getNumber(){
    let n = getNumber.calledTimes++;

    return n
}