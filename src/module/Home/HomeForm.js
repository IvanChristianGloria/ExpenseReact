import React, { useEffect, useState }  from 'react'
import { expenseAPI } from '../../services/services'
import axios from 'axios'

const HomeForm = () => {
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState(0)
    const [expenseDate, setExpenseDate] = useState('')
    const [expenseType, setExpenseType] = useState(0)
    const [errorExpenseName, setErrorExpenseName] = useState('')
    const [errorExpenseAmount, setErrorExpenseAmount] = useState('')
    const [errorExpenseDate, setErrorExpenseDate] = useState('')
    const [errorExpenseType, setErrorExpenseType] = useState('')
    const [formValidate, setFormValidate] = useState(false)
    
    const validateName = (e) => {
        let formValid = formValidate
        let nameError = errorExpenseName
        const pattern = /^[a-zA-Z]+$/

        if (e.trim() === '') {
            nameError = 'Name is required'
            formValid = false
        }
        else if(!pattern.test(e))
        {
            nameError = 'Name must contain letters only'
            formValid = false
        }
        else if (e.trim().length < 2) {
            nameError = 'Name  must contain atleast 2 characters'
            formValid = false
        }
        else if (e.trim().length > 100) {
            nameError = 'Name cannot exceed 100 characters'
            formValid = false
        }
        else {
            nameError = ''
            formValid = true
        }

        setErrorExpenseName(nameError)
        setFormValidate(formValid)
        setExpenseName(e)

        return formValid
    }

    const validateAmount = (e) => {
        let formValid = formValidate
        let amountError = errorExpenseAmount
        const pattern = /^\d+$/

        if (e === '') {
            amountError = 'Amount is required'
            formValid = false
        }
        else if(!pattern.test(e))
        {
            amountError = 'Amount must contain numbers only'
            formValid = false
        }
        else {
            amountError = ''
            formValid = true
        }

        setErrorExpenseAmount(amountError)
        setFormValidate(formValid)
        setExpenseAmount(e)

        return formValid
    }

    const validateDate = (e) => {
        let formValid = formValidate
        let dateError = errorExpenseDate

        if (e.trim() === '') {
            dateError = 'Date is required'
            formValid = false
        }
        else {
            dateError = ''
            formValid = true
        }

        setErrorExpenseDate(dateError)
        setFormValidate(formValid)
        setExpenseDate(e)

        return formValid
    }

    const validateType = (e) => {
        let formValid = formValidate
        let typeError = errorExpenseType

        if (e === 0) {
            typeError = 'Type is required'
            formValid = false
        }
        else {
            typeError = ''
            formValid = true
        }

        setErrorExpenseType(typeError)
        setFormValidate(formValid)
        setExpenseType(e)

        return formValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (
            validateName(expenseName) &&
            validateAmount(expenseAmount) &&
            validateDate(expenseDate) &&
            validateType(expenseType)
        )
        {
            axios.post(expenseAPI, {
                expenseName
                , expenseAmount
                , expenseDate
                , expenseType
            })
            .then(res => {
                alert('Expense added successfully!')
                setExpenseName('')
                setExpenseAmount(0)
                setExpenseDate('')
                setExpenseType(0)
                setFormValidate(false)
            })
        }
    }

    return(
        <div className="container pt-5">
            <form className="border rounded p-3 mt-5 row mt-3" onSubmit={(e) => handleSubmit(e)}>
                <h4 className="mb-3">Expense Input</h4>
                <label className="mb-1">Name</label>
                <input id="name" className="form-control" placeholder='Name' type="text" onChange={(e) => validateName(e.target.value)} value={expenseName}/>
                <label className="w-100 text-danger mb-2">{errorExpenseName}</label>
                <label className="mb-1">Amount</label>
                <input id="amount" className="form-control" placeholder='Amount' type="text" onChange={(e) => validateAmount(e.target.value)} value={expenseAmount}/>
                <label className="w-100 text-danger mb-2">{errorExpenseAmount}</label>
                <label className="mb-1">Date</label>
                <input id="date" className="form-control" type="date" onChange={(e) => validateDate(e.target.value)} value={expenseDate}/>
                <label className="w-100 text-danger mb-2">{errorExpenseDate}</label>
                <label className="mb-1">Type</label>
                <select id='type' className='form-control' onChange={(e) => validateType(e.target.value)} value={expenseType}>
                    <option value='0' disabled>Select Type</option>
                    <option value='1'>Food</option>
                    <option value='2'>Travel</option>
                    <option value='3'>Rent</option>
                    <option value='4'>Clothes</option>
                    <option value='5'>Medicine</option>
                    <option value='6'>Others</option>
                </select>
                <label className="w-100 text-danger mb-2">{errorExpenseType}</label>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default HomeForm