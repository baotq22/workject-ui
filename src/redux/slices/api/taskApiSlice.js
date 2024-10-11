import { apiReducer } from "../apiSlice";

const TASK_URL = "/task";

export const taskApiSlice = apiReducer.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${TASK_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getAllTask: builder.query({
      query: ({strQuery, isTrashed, search}) => ({
        url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ['Task'],
    }),
    
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['Task'],
    }),

    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `${TASK_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
        credentials: "include",
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/update/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['Task'],
    }),
    
    trashTask: builder.mutation({
      query: ({id}) => ({
        url: `${TASK_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ['Task'],
    }),
    
    createSubTask: builder.mutation({
      query: ({data, id}) => ({
        url: `${TASK_URL}/create-subtask/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ['Task'],
    }),
  }),
  tagTypes: ['Task'],
});

export const { 
  useGetDashboardStatsQuery, 
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
  useTrashTaskMutation,
  useCreateSubTaskMutation
} = taskApiSlice;