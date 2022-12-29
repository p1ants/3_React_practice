function TodoList(props) {
  return (
    <div className='todolist'>
      <h2>Todo-{props.todoList.title}</h2>
      <div>todo-{props.todoList.description}</div>
      <div className='todolist_button'>
        <button
          onClick={() => {
            props.handledDelete(props.todoList.id);
          }}
        >
          삭제하기
        </button>
        <button>완료</button>
      </div>
    </div>
  );
}

export default TodoList;
