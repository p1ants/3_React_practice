import './App.css';
import React, { useState } from 'react';

function CustomButton(props) {
  const { color, onClick, children } = props;
  if (color) {
    return (
      <button
        onClick={onClick}
        style={{ backgroundColor: color, color: 'white' }}
      >
        {children}
      </button>
    );
  }
  return <button onClick={onClick}>{children}</button>;
  // const에 props를 넣었으니 그냥 onClick으로 해도됨.
}

function TodoList(props) {
  return (
    <div className='todolist'>
      <h2>Todo-{props.todoList.title}</h2>
      <div>todo-{props.todoList.description}</div>
      <div className='todolist_button'>
        <CustomButton
          color='red'
          onClick={() => {
            props.handledDelete(props.todoList.id);
          }}
        >
          삭제하기
        </CustomButton>
        <CustomButton
          color='green'
          onClick={() => {
            props.doneLisHandler(props.todoList.id);
          }}
        >
          {props.todoList.isDone ? '취소' : '완료'}
        </CustomButton>
      </div>
    </div>
  );
}

function App() {
  const [todoLists, setTodoLists] = useState([
    { isDone: false, id: 1, title: 'java', description: '내용정리 할거1 기ㄴ' },
    { isDone: false, id: 2, title: 'react', description: '내용정리 할거2ㅁ' },
    { isDone: false, id: 3, title: 'css', description: '내용정리 할거 3정' },
    { isDone: false, id: 4, title: 'html', description: '내용정리 할거4 환' },
  ]);

  const [title, setTitle] = useState('');
  const [description, setDedescription] = useState('');

  //추가하기.. 버튼 눌렀을때...
  const addTodoListHandler = () => {
    const newTodolist = {
      id: todoLists.length + 1,
      title: title,
      description: description,
    };
    setTodoLists([...todoLists, newTodolist]);
  };

  //완료 버튼
  const doneLisHandler = (id) => {
    const doneList = todoLists.map((todoList) =>
      todoList.id === id ? { ...todoList, isDone: !todoList.isDone } : todoList
    );
    setTodoLists(doneList);
  };

  //삭제버튼
  const deleteTodoListHandler = (id) => {
    const newTodoLists = todoLists.filter((todoList) => todoList.id !== id);
    setTodoLists(newTodoLists);

    //유저의 아이디가 내가 설정한 아이디와 같지 않으면 .. 그것만 필터해서 새로운 배열 만들어라.
    // props로 delete 함수 넘겨줘야함...
  };

  return (
    <div>
      <div className='navBar'>
        <span>My Todo List</span>
        <span>리액</span>
      </div>
      <div className='titleBar'>
        <div>제목</div>
        <input
          type='text'
          placeholder='제목입력...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>내용</div>
        <input
          type='text'
          placeholder='내용입력...'
          value={description}
          onChange={(e) => setDedescription(e.target.value)}
        />
        <CustomButton onClick={addTodoListHandler}>추가하기</CustomButton>
      </div>

      <h1>working</h1>
      <div className='todoListBox'>
        {todoLists.map((todoList) => {
          if (!todoList.isDone) {
            return (
              <TodoList
                doneLisHandler={doneLisHandler}
                handledDelete={deleteTodoListHandler}
                todoList={todoList}
                key={todoList.id}
              >
                {' '}
              </TodoList>
            );
          } else {
            return null;
          }
        })}
      </div>
      <h1>done</h1>

      <div className='todoListBox'>
        {todoLists.map((todoList) => {
          if (todoList.isDone) {
            return (
              <TodoList
                doneLisHandler={doneLisHandler}
                handledDelete={deleteTodoListHandler}
                todoList={todoList}
                key={todoList.id}
              ></TodoList>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
export default App;
