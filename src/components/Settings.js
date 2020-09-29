import React from 'react';
import { useFormField } from '../hooks/index'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import FormField from './FormField';

const Settings = () => {
    let history = useHistory()

    const work = useFormField('number', 'work')
    const shortBreak = useFormField('number', 'shortBreak')
    const break2 = useFormField('number', 'break2')

    const onFormSubmit = (event) => {
        event.preventDefault();
        const data = {
            work: parseInt(event.target.work.value),
            shortBreak: parseInt(event.target.shortBreak.value),
            break2: parseInt(event.target.break2.value),
            save: event.target.save.checked
        };
        
        history.push({
            pathname: '/home',
            data
        })
    }

    return (
        <div className='container'>
            <h3>Set your own timers</h3>
            <p>mention all time duration in minutes...</p>
            <form onSubmit={onFormSubmit} className='form-container' data-testid='form'>
                <FormField id='work' label='Work' attributes={work} />
                <FormField id='shortBreak' label='Short Break' attributes={shortBreak} />
                <FormField id='break2' label='Break' attributes={break2} />
                <div className='form-group'>
                    <div className='form-check'>
                        <input className='form-check-input' type='checkbox' id='save' />
                        <label className='form-check-label' htmlFor='save'>Add to Favourites</label>
                    </div>
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