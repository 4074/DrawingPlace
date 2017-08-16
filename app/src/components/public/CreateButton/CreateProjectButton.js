import React, { Component, PropTypes } from 'react'
import { Icon, Button } from 'antd'
import { ProjectSelector, CreateButton } from 'components'
import './CreateButton.scss'

export default class CreateProjectButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            creating: false,
            project: undefined
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
    }

    handleClick() {
        if (this.state.creating) return;
        this.setState({
            creating: true,
            project: undefined
        })
    }

    handleCancel() {
        this.setState({
            creating: false
        })
    }

    handleChange(project) {
        this.setState({
            project
        })
    }

    handleCreate() {
        if (typeof this.props.onCreate === 'function') {
            this.props.onCreate({project: this.state.project.name})
        }
        this.setState({
            creating: false
        })
    }

    render() {
        const { projectList, editable } = this.props
        return (
            <div className="pm-create-project-button" onClick={this.handleClick} ref={card => this.emptyCard = card}>
                {
                    this.state.creating ?
                    <div className="project-editor">
                        <ProjectSelector dataSource={projectList} onChange={this.handleChange} />
                        <Button type="primary" disabled={!this.state.project} onClick={this.handleCreate} >确定</Button>
                        <Button onClick={this.handleCancel}>取消</Button>
                    </div>
                    :
                    <CreateButton title="添加新项目" disabled={!editable} />
                }
            </div>
        )
    }
}
