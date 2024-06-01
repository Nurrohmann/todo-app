'use client';
import { Modal, TextArea, Text, Button } from '../common';
import {
  ButtonContainer,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from './todoPage.styled';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTodo } from '@/app/lib/reduxToolkit/todo/todoSlice';
import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

export default function AddTodoModal() {
  const dispatch = useDispatch();
  const [show, setIsShow] = useState(false);
  const [todo, setTodo] = useState('');

  const handleModal = () => {
    setIsShow(!show);
  };

  const mutation = useMutation({
    mutationFn: async (newTodo: any) => {
      try {
        const { data: response } = await axios.post('/api/todo', newTodo);
        dispatch(addTodo(response));
        setIsShow(false);
        setTodo('');
        return response;
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <>
      <ButtonContainer>
        <Button type="primary" onClick={handleModal} className="btn-add">
          <Plus size={24} />
        </Button>
      </ButtonContainer>
      <Modal isClose={show}>
        <ModalHeader>
          <Text htmlTag={'h1'} type={'heading-large'}>
            Add New Todo
          </Text>
          <Button type="primary" onClick={handleModal}>
            X
          </Button>
        </ModalHeader>

        <ModalContent>
          <TextArea
            onChange={(e) => setTodo(e.target.value)}
            placeHolder={''}
            labelText={''}
            value={todo}
          />
        </ModalContent>

        <ModalFooter>
          <Button type="primary" onClick={() => setIsShow(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              mutation.mutate({ title: todo });
            }}
          >
            {mutation.isPending ? 'Loading' : 'Add'}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
