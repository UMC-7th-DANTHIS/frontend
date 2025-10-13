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

// TODO: 수정 필요 -> CommonPagination 이용
export interface PaginationParams {
  genre?: number;
  page?: number;
  size?: number;
}

export interface CommonPagination {
  page?: number;
  size?: number;
}
