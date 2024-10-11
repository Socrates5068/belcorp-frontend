import { z } from "zod";

export const userStatus = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  banned: "Banned",
};

export const userRoles = {
  administrador: "Administrador",
  gerente: "Gerente",
  socia: "Socia",
  consultora: "Consultora",
};

export const userStatusEnum = z.nativeEnum(userStatus);
export const userRolesEnum = z.nativeEnum(userRoles);

/** Auth & Users */
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  last_name: z.string(),
  ci: z.string(),
  token: z.string(),
  section: z.string(),
  roles: z.array(z.string()),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "ci" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type UserRegistrationFormEnhanced = Pick<
  Auth,
  "name" | "email" | "last_name" | "ci" | "roles" | "section"
>;

export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type UpdateCurrentUserPasswordForm = Pick<
  Auth,
  "current_password" | "password" | "password_confirmation"
>;
export type ConfirmToken = Pick<Auth, "token">;
export type CheckPasswordForm = Pick<Auth, "password">;

export const isAdminSchema = z.object({
  roles: z.array(z.string()),
});

/** Sections */
export const sectionSchema = z.object({
  name: z.string(),
  _id: z.string(),
});

export const sections = z.array(sectionSchema);
export const editSection = sectionSchema.pick({
  name: true,
});
type Section = z.infer<typeof sectionSchema>;
export type UpdateSectionForm = Pick<Section, "name"> & {
  _id: string | null;
};

export type SectionRegistrationForm = Pick<Section, "name">;

/** Users */
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
    ci: true,
    last_name: true,
  })
  .extend({
    _id: z.string(),
    status: userStatusEnum,
    roles: z.array(userRolesEnum),
  });

export const editUser = authSchema.pick({
  name: true,
  email: true,
  ci: true,
  last_name: true,
  roles: true,
  section: true,
});
export const users = z.array(userSchema);
export type User = z.infer<typeof userSchema>;
export type UpdateUserForm = Pick<
  Auth,
  "name" | "email" | "last_name" | "ci" | "roles" | "section"
> & {
  _id: string | null;
};
export type UpdateUserStatusForm = Pick<User, "_id" | "status">;
export type UserProfileForm = Pick<User, "name" | "email">;

/** Notes */
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

/** Tasks */
export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusSchema,
    })
  ),
  notes: z.array(
    noteSchema.extend({
      createdBy: userSchema,
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskProject = z.infer<typeof taskProjectSchema>;

/** Projects */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
});
export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);
export const editProjectSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
});
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;

/** Team */
const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;
