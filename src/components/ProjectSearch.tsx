import { useAppSelector, useAppDispatch } from "../store/hooks";

import {
  ProjectStatus,
  setProjectData,
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
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };

  const handleFetchProjectById = (id: string) => {
    return fetch(`${PROJECT_API}/project/${id}`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };

  const fetchProject = async () => {
    dispatch(setProjectStatus(ProjectStatus.LOADING));
    try {
      if (!projectId) {
        return handleFetchProjectInit().then((res) => {
          return handleFetchProjectById(res.id);
        });
      } else {
        return handleFetchProjectById(projectId);
      }
    } catch (err) {
      dispatch(setProjectStatus(ProjectStatus.ERROR));
    }
  };

  const handleFetchProject = () => {
    fetchProject().then((res) => {
      dispatch(setProjectStatus(ProjectStatus.SUCCESS));
      dispatch(setProjectData(res.project));
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
