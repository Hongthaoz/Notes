export type Category = 'Work and Study' | 'Life' | 'Health and Well-being' ;

export type Note ={
    id: string;
    category: Category;
    content: string;
    createdAt: number;
}