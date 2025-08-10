export type CommonResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type OffsetBasedResponse<K extends string, T> = CommonResponse<
  {
    page: number;
    totalPages: number;
    totalElements: number;
  } & Record<K, T>
>;

export type PaginationParams = {
  genre?: number;
  page?: number;
  size?: number;
};
