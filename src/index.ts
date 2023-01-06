import { Component, html } from '@plumejs/core';
import { Todo, TodoStore } from './services';
// as per https://github.com/vitejs/vite/pull/2148
import styles from './styles/base.scss?inline';

@Component({
  selector: 'app-root',
  styles: styles,
  deps: [TodoStore],
  root: true
})
export class AppComponent {
  newTodoText = '';
  constructor(private todoStore: TodoStore) {}

  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle;
    todo.editing = false;
  }

  cancelEditingTodo(todo: Todo) {
    todo.editing = false;
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim();
    todo.editing = false;

    if (editedTitle.length === 0) {
      return this.todoStore.remove(todo);
    }

    todo.title = editedTitle;
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  removeCompleted() {
    this.todoStore.removeCompleted();
  }

  toggleCompletion(todo: Todo) {
    this.todoStore.toggleCompletion(todo);
  }

  remove(todo: Todo) {
    this.todoStore.remove(todo);
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoStore.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

  render() {
    return html`
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input
            class="new-todo"
            placeholder="What needs to be done?"
            autofocus="true"
            value="${this.newTodoText}"
            onkeyup=${() => this.addTodo()}
          />
        </header>
        <section class="main" *ngIf="todoStore.todos.length > 0">
          <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            *ngIf="todoStore.todos.length"
            #toggleall
            [checked]="todoStore.allCompleted()"
            (click)="todoStore.setAllTo(toggleall.checked)"
          />
          <ul class="todo-list">
            <li *ngFor="#todo of todoStore.todos" [class.completed]="todo.completed" [class.editing]="todo.editing">
              <div class="view">
                <input class="toggle" type="checkbox" (click)="toggleCompletion(todo)" [checked]="todo.completed" />
                <label (dblclick)="editTodo(todo)">{{todo.title}}</label>
                <button class="destroy" (click)="remove(todo)"></button>
              </div>
              <input
                class="edit"
                *ngIf="todo.editing"
                [value]="todo.title"
                #editedtodo
                (blur)="stopEditing(todo, editedtodo.value)"
                (keyup.enter)="updateEditingTodo(todo, editedtodo.value)"
                (keyup.escape)="cancelEditingTodo(todo)"
              />
            </li>
          </ul>
        </section>
        <footer class="footer" *ngIf="todoStore.todos.length > 0">
          <span class="todo-count"
            ><strong>{{todoStore.getRemaining().length}}</strong> {{todoStore.getRemaining().length == 1 ? 'item' :
            'items'}} left</span
          >
          <button class="clear-completed" *ngIf="todoStore.getCompleted().length > 0" (click)="removeCompleted()">
            Clear completed
          </button>
        </footer>
      </section>
    `;
  }
}
