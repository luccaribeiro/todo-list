
var app = new Vue({
    el: "#app",
    data: {
      message: "Olá Vue!", 
      titulo: '',
      check: false,
      tipo: '',
      tasks: [],
      id: null,
      able: false
    },
    methods: {
      getTasks() {
        fetch("http://localhost:3000/tasks")
          .then((response) => response.json())
          .then((tarefasJson) => {
            console.log(tarefasJson);
            this.tasks = tarefasJson;
          });
      },
      deleteTask(id){
        const metodo = {
          method: "DELETE",
        };
        fetch(`http://localhost:3000/tasks/${id}`, metodo);
    },  
    
    editTasks(id){
      fetch(`http://localhost:3000/tasks/${id}`).then(response => response.json()).then(resp => {
        console.log(resp)
        this.task.id = resp.id
        this.task.title = resp.title
        this.task.dueTo = resp.dueTo
        this.task.project = resp.project
        this.task.user = resp.user
      })

    },
    updateTasks(id){
      const data = {
        titulo: this.titulo,
        tipo: this.tipo,
        data: new Date()
      }

      const dataJson = JSON.stringify(data);

      fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
      this.able = false
    },
    pegaTarefa(tarefa){
      this.id = tarefa.id
      this.titulo = tarefa.titulo
      this.tipo = tarefa.tipo
      this.able = true
    },
    fechaTarefa(){
      this.able = false
    },
    
    addNewTask(){
      const informacaoTask = {
        titulo: this.titulo,
        check: false,
        tipo: this.tipo,
        data: new Date(),
      };
      console.log("fd")      
      const dataJson = JSON.stringify(informacaoTask);

      const req = fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: dataJson,
      })
  },dataFinal(data){
    data = (data).slice(0, 10)
    ano = data.slice(0,4)
    mes = data.slice(5,7) - 1
    dia = data.slice(8,10)
    let data_atual = new Date(ano,mes,dia)
    const diffInMs   = new Date()  - data_atual 
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays.toFixed()
  },
    },   

    created() {
      console.log("created");
      this.getTasks();
    },
    mounted() {
      console.log("montend");
    },
  });