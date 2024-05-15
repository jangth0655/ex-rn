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
  const {data} = await axiosInstance.get(`/post/${id}`);

  return data;
};

export {createPost, getPost, getPosts};
export type {ResponsePost, RequestCreatePost, ResponseSinglePost};
