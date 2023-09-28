import { Entitys } from './entitys';

export class Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type OrderBy = { field: string | true; param: 'asc' | 'desc' };

export type PaginatedQueryParams = {
  limit: number;
  page: number;
  offset: number;
  orderBy: OrderBy;
};

export interface RepositoryPort<Entity> {
  findOneById(id: string): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<any>>;
  deleteById(id: string): Promise<boolean>;
  insert(entity: Entitys): Promise<string>;
}
