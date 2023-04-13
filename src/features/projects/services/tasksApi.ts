import { ITask } from "../../../models/data";
import { emptyApi } from "../../../services/api";

const tasksApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<{ ok: boolean; tasks: ITask[] }, string>({
      query: (projectId) => ({
        url: `projects/${projectId}/tasks`,
        method: "GET",
      }),
      providesTags: ["projects", "tasks"],
    }),
    getTaskById: builder.query<{ ok: boolean; task: ITask }, any>({
      query: ({ projectId, taskId }) => ({
        url: `projects/${projectId}/tasks/${taskId}`,
        method: "GET",
      }),
      providesTags: ["projects", "tasks", "task"],
    }),
    createTask: builder.mutation<any, any>({
      query: ({ projectId, title, description, assignedTo }) => ({
        url: `projects/${projectId}/tasks`,
        method: "POST",
        body: { title, description, assignedTo },
      }),
      invalidatesTags: ["projects", "project", "tasks"],
    }),
    updateTasks: builder.mutation<any, any>({
      query: ({ projectId, id, title, description, assignedTo, status }) => ({
        url: `projects/${projectId}/tasks/${id}`,
        method: "PUT",
        body: { title, description, assignedTo, status },
      }),
      invalidatesTags: ["projects", "project", "tasks", "task"],
    }),
    deleteTask: builder.mutation<any, any>({
      query: ({ projectId, id }) => ({
        url: `projects/${projectId}/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects", "project", "tasks", "task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTasksMutation,
  useDeleteTaskMutation,
} = tasksApi;
