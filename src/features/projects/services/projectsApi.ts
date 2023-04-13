import { IInvitation, IProject, ITask } from "../../../models/data";
import { emptyApi } from "../../../services/api";

const projectsApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProjects: builder.query<any, void>({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    getProjectsWhereICollaborate: builder.query<any, string>({
      query: (userId) => ({
        url: `projects/projectsWhereIParticipate/${userId}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    getProjectById: builder.query<{ ok: boolean; project: IProject }, string>({
      query: (projectId) => ({
        url: `projects/${projectId}`,
        method: "GET",
      }),
      providesTags: ["projects", "project"],
    }),
    createProject: builder.mutation<any, any>({
      query: ({ title, description }) => ({
        url: `/projects`,
        method: "POST",
        body: { title, description },
      }),
      invalidatesTags: ["projects"],
    }),
    updateProject: builder.mutation<any, any>({
      query: ({ projectId, title, description }) => ({
        url: `/projects/${projectId}`,
        method: "PUT",
        body: { title, description },
      }),
      invalidatesTags: ["projects", "project"],
    }),
    deleteProject: builder.mutation<any, any>({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects", "project"],
    }),
    deleteProjectCollaborator: builder.mutation<any, any>({
      query: ({ projectId, userId }) => ({
        url: `projects/${projectId}/collaborators/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects", "project"],
    }),
    getProjectsInvitations: builder.query<
      { ok: boolean; invitations: IInvitation[] },
      string
    >({
      query: (userId) => ({
        url: `projects/invitations/${userId}`,
        method: "GET",
      }),
      providesTags: ["projects", "invitations"],
    }),
    sendProjectInvitation: builder.mutation<any, any>({
      query: ({ projectId, email }) => ({
        url: `projects/${projectId}/invitations`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["projects", "project"],
    }),
    cancelProjectInvitation: builder.mutation<any, any>({
      query: ({ projectId, userId }) => ({
        url: `projects/${projectId}/invitations/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects", "project"],
    }),
    acceptInvitation: builder.mutation<void, any>({
      query: ({ projectId, userId }) => ({
        url: `projects/${projectId}/invitations/${userId}/accept`,
        method: "PUT",
      }),
      invalidatesTags: ["projects", "invitations"],
    }),
    rejectInvitation: builder.mutation<void, any>({
      query: ({ projectId, userId }) => ({
        url: `projects/${projectId}/invitations/${userId}/reject`,
        method: "PUT",
      }),
      invalidatesTags: ["projects", "invitations"],
    }),
  }),
});

export const {
  useGetMyProjectsQuery,
  useGetProjectsWhereICollaborateQuery,
  useGetProjectByIdQuery,
  useGetProjectsInvitationsQuery,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
  useSendProjectInvitationMutation,
  useCancelProjectInvitationMutation,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectCollaboratorMutation,
} = projectsApi;
