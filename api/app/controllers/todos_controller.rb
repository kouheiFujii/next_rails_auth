class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /todos
  def index
    render json: { todos: current_user.todos }
  end

  # GET /todos/:id
  def show
    render json: { todo: @todo}
  end

  # POST /todos
  def create
    @todo = current_user.todos.new(todo_params)
    if @todo.save
      render json: { todo: @todo }, status: :created
    else
      render json: { errors:@todo.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/:id
  def update
    if @todo.update(todo_params)
      render json: { todo: @todo }
    else
      render json: { errors:@todo.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /todos/:id
  def destroy
    @todo.destroy
    head :no_content
  end

  private

  def set_todo
    @todo = current_user.todos.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :completed)
  end
end
