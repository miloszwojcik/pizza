import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProjectState {
  projectId: string;
  projectData: any;
  status: ProjectStatus;
  error?: string;
}

export enum ProjectStatus {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
}

// Define the initial state using that type
const initialState: ProjectState = {
  projectId: "",
  projectData: {},
  status: ProjectStatus.INIT,
  error: "",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectStatus: (state, action: PayloadAction<ProjectStatus>) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    setProjectError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    setProjectId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        projectId: action.payload,
      };
    },
    setProjectData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        projectData: action.payload,
      };
    },
  },
});

export const {
  setProjectId,
  setProjectData,
  setProjectStatus,
  setProjectError,
} = projectSlice.actions;

export default projectSlice.reducer;
