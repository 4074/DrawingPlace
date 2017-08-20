import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import './styles/LoginForm.scss'

const FormItem = Form.Item

class NormalLoginForm extends Component {

    constructor(props) {
        super(props)

        this.handleModeChange = this.handleModeChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err && typeof this.props.onSubmit === 'function') {
                this.props.onSubmit(values)
            }
        });
    }

    handleModeChange() {
        const { mode, onModeChange } = this.props
        onModeChange(mode === 'login' ? 'signup' : 'login')
    }

    render() {
        const { mode } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                </FormItem>
                {
                    mode === 'signup' &&
                    <FormItem>
                        {getFieldDecorator('password_again', {
                            rules: [{ required: true, message: 'Please input your Password again!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password Again" />
                            )}
                    </FormItem>
                }
                <FormItem>
                    <a className="login-form-forgot" onClick={this.handleModeChange}>
                        {
                            mode === 'login' ? '注册帐号？' : '已有帐号，直接登录？'
                        }
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {
                            mode === 'login' ? '登录' : '注册'
                        }
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(NormalLoginForm)
