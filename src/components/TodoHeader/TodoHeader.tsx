import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  activeTodos: Todo[];
  newTodoField: React.RefObject<HTMLInputElement>;
  error: string;
  onTodoAdd: (title: string) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  onToggleAllTodos: () => void;
}

export const TodoHeader: React.FC<Props> = ({
  activeTodos,
  newTodoField,
  error,
  setError,
  onTodoAdd,
  isLoading,
  onToggleAllTodos,
}) => {
  const [title, setTitle] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (error) {
      setError('');
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Title should not be empty');

      return;
    }

    onTodoAdd(title)
      .then(() => {
        setTitle('');
      });
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: activeTodos.length,
        })}
        data-cy="ToggleAllButton"
        aria-label="Toggle All"
        onClick={onToggleAllTodos}
      />

      <form onSubmit={onFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          ref={newTodoField}
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChange}
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
