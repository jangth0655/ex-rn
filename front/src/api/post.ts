import {ImageUri, Post} from '@/types/domain';
import {axiosInstance} from './axios';

type ResponsePost = Post & {images: ImageUri[]};

const getPosts = async (page: number = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);
  return data;
};

type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  console.log(data);
  return data;
};

type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

const deletePost = async (id: number) => {
  const {data} = await axiosInstance.delete(`/posts/${id}`);
  return data;
};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'> & {
    imageUris: ImageUri[];
  };
};

const updatePost = async ({
  id,
  body,
}: RequestUpdatePost): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.patch(`/posts/${id}`, body);
  return data;
};

const getFavoritePost = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/favorite/my?page=${page}`);
  return data;
};

const updateFavorite = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.post(`/favorite/${id}`);
  return data;
};

type CalendarPost = {
  id: number;
  title: string;
  address: string;
};

type ResponseCalendarPost = Record<number, CalendarPost[]>;

const getCalendarPosts = async (
  year: number,
  month: number,
): Promise<ResponseCalendarPost> => {
  const {data} = await axiosInstance.get(`/posts?year=${year}&month=${month}`);
  return data;
};

export {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
  updateFavorite,
  getFavoritePost,
  getCalendarPosts,
};
export type {
  ResponsePost,
  RequestCreatePost,
  ResponseSinglePost,
  RequestUpdatePost,
  CalendarPost,
  ResponseCalendarPost,
};
