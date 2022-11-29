import React from 'react'
import './project_header.scss'

type ProjectHeaderProps = {
  title: string
  period: string
}

const ProjectHeader: React.FC<ProjectHeaderProps> = (props) => {

  return (
    <div id="project_header">
      <h1 className="icon_level-1">{ props.title } / { props.period }</h1>
      <button className='export'>
        <div className="icon_download" />
        Export
      </button>
    </div>
  )
}

export default ProjectHeader