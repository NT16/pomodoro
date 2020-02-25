import React from 'react';
import { useFormField } from '../hooks/index'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

const Settings = () => {
    let history = useHistory()

    const work = useFormField('number', 'work')
    const shortBreak = useFormField('number', 'shortBreak')
    const break2 = useFormField('number', 'break2')

    const onFormSubmit = (event) => {
        event.preventDefault()
        history.push({
            pathname: '/home',
            data: {
                work: parseInt(event.target.work.value),
                shortBreak: parseInt(event.target.shortBreak.value),
                break2: parseInt(event.target.break2.value)
            }
        })
    }

    return (
        <div className='container'>
            <h3>Set your own timers</h3>
            <p>mention all time duration in minutes...</p>
            <form onSubmit={onFormSubmit} className='form-container'>
                <div className='form-group'>
                    <label htmlFor='work'>Work</label>
                    <input {...work} id='work' className="form-control" />
                </div>
                <div className='form-group'>
                    <label htmlFor='shortBreak'>Short Break</label>
                    <input {...shortBreak} id='shortBreak' className="form-control" />
                </div>
                <div className='form-group'>
                    <label htmlFor='break2'>Break</label>
                    <input {...break2} id='break2' className="form-control" />
                </div>
                <Button
                    type='submit'
                    variant='primary'
                    className='full-width'
                >Go
                </Button>
            </form>
        </div>
    )
}

export default Settings;