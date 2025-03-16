import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  fetchTasks,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
} from '../controllers/taskController';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 400px;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
`;

const Checkbox = styled.input`
  margin-right: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/');
    else {
      fetchTasks(token).then(setTasks).catch(() => router.push('/'));
    }
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newTask = await handleCreateTask(
      { title, description, completed: false },
      token
    );
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
  };

  const onUpdate = async (id, completed) => {
    const token = localStorage.getItem('token');
    const updatedTask = await handleUpdateTask(id, { completed: !completed }, token);
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  const onDelete = async (id) => {
    const token = localStorage.getItem('token');
    await handleDeleteTask(id, token);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <Container>
      <h1>Task Manager</h1>
      <Form onSubmit={onCreate}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Add Task</Button>
      </Form>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task._id}>
            <div>
              <Checkbox
                type="checkbox"
                checked={task.completed}
                onChange={() => onUpdate(task._id, task.completed)}
              />
              {task.title} - {task.description}
            </div>
            <DeleteButton onClick={() => onDelete(task._id)}>Delete</DeleteButton>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
}