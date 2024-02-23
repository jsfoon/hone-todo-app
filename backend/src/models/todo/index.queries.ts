

export type SelectTodosQueryParams = [];


export interface ISelectTodosQueryResult {
    id: number;
	title: string;
};


export interface ISelectTodosQueryQuery {
    params: SelectTodosQueryParams;
    result: ISelectTodosQueryResult;
};




export type CreateTodoQueryParams = [string];


export interface ICreateTodoQueryResult {
    
};


export interface ICreateTodoQueryQuery {
    params: CreateTodoQueryParams;
    result: ICreateTodoQueryResult;
};




export type UpdateTodoQueryParams = [string, number];


export interface IUpdateTodoQueryResult {
    
};


export interface IUpdateTodoQueryQuery {
    params: UpdateTodoQueryParams;
    result: IUpdateTodoQueryResult;
};




export type DeleteTodoQueryParams = [number];


export interface IDeleteTodoQueryResult {
    
};


export interface IDeleteTodoQueryQuery {
    params: DeleteTodoQueryParams;
    result: IDeleteTodoQueryResult;
};

