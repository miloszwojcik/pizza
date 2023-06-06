import { useAppSelector, useAppDispatch } from "../store/hooks";

import {
  ProjectStatus,
  setProjectData,
  setProjectError,
  setProjectId,
  setProjectStatus,
} from "./ProjectSlice";

const PROJECT_API = "http://recruitment01.vercel.app/api";

const ProjectSearch = () => {
  const projectId = useAppSelector((state) => state.project.projectId);
  const dispatch = useAppDispatch();

  const handleFetchProjectInit = () => {
    return fetch(`${PROJECT_API}/init`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((err) => {
          throw new Error(err.message);
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleFetchProjectById = (id: string) => {
    return fetch(`${PROJECT_API}/project/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((err) => {
          throw new Error(err.message);
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  const fetchProject = async () => {
    dispatch(setProjectError(""));
    dispatch(setProjectStatus(ProjectStatus.LOADING));

    if (!projectId) {
      return handleFetchProjectInit().then((res) => {
        return handleFetchProjectById(res.id);
      });
    } else {
      return handleFetchProjectById(projectId);
    }
  };

  const handleFetchProject = () => {
    fetchProject()
      .then((res) => {
        dispatch(setProjectStatus(ProjectStatus.SUCCESS));
        dispatch(setProjectData(res.project));
      })
      .catch((err) => {
        dispatch(setProjectStatus(ProjectStatus.ERROR));
        dispatch(setProjectError(err.message));
      });
  };

  const handleProjectIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProjectId(e.target.value));
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleProjectIdChange}
        placeholder="Project ID"
      />
      <button onClick={handleFetchProject}>Search</button>
    </div>
  );
};

export default ProjectSearch;
