import { useAppSelector } from "../store/hooks";
import { ProjectStatus } from "./ProjectSlice";
import Ellipse from "./Ellipse";
import Rectangle from "./Rectangle";

interface Shapes {
  [key: string]: any;
}

const shapes: Shapes = {
  ellipse: Ellipse,
  rectangle: Rectangle,
};

const ProjectProjector = () => {
  const projectData = useAppSelector((state) => state.project.projectData);
  const status = useAppSelector((state) => state.project.status);
  const error = useAppSelector((state) => state.project.error);

  if (status === ProjectStatus.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === ProjectStatus.ERROR) {
    return <div>Error... {error}</div>;
  }

  if (status === ProjectStatus.SUCCESS) {
    return (
      <div className="project__projector">
        <h1>{projectData.name}</h1>
        <svg className="svg-projector">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${projectData.width} ${projectData.height}`}
          >
            {projectData?.items?.map((item: any) => {
              const Shape = shapes[item.type];

              return <Shape key={item.id} {...item} />;
            })}
          </svg>
        </svg>
      </div>
    );
  }

  return <div>ProjectProjector</div>;
};

export default ProjectProjector;
