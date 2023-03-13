import React, { useEffect, useState }  from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { expenseAPI } from '../../services/services'
import axios from 'axios'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'


const TableDisplay = () => {
    const [tableData, setTableData] = useState([])
    const [noResult , setNoResult] = useState('Loading')
    const [open, setOpen] = React.useState(false)
    const [updateID, setUpdateID] = useState(0)
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState(0)
    const [expenseDate, setExpenseDate] = useState(new Date())
    const [expenseType, setExpenseType] = useState(0)
    const [errorExpenseName, setErrorExpenseName] = useState('')
    const [errorExpenseAmount, setErrorExpenseAmount] = useState('')
    const [errorExpenseDate, setErrorExpenseDate] = useState('')
    const [errorExpenseType, setErrorExpenseType] = useState('')
    const [formValidate, setFormValidate] = useState(false)
    const types = ['', 'Food', 'Travel', 'Rent', 'Clothes', 'Medicine', 'Others']
    
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

        if (e === '') {
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
            if(confirm('Are you sure you want to update this expense?'))
                axios.put(expenseAPI, {
                    expenseId : updateID
                    , expenseName
                    , expenseAmount
                    , expenseDate
                    , expenseType
                })
                .then(res => {
                    alert('Expense updated successfully!')
                    setExpenseName('')
                    setExpenseAmount(0)
                    setExpenseDate(new Date())
                    setExpenseType(0)
                    setFormValidate(false)
                    handleClose()
                    axios.get(expenseAPI)
                    .then(res => {
                        setTableData(res.data)
                        setNoResult('No Data')
                    })
                })
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    }

    useEffect(() => {
        axios.get(expenseAPI)
        .then(res => {
            setTableData(res.data)
            setNoResult('No Data')
        })
    }, [])

    const handleDelete = (e) => {
        if(confirm('Do you want to delete this data?'))
        {
            const id = e.replace('d-', '')
            setNoResult('Loading')
            axios.delete(expenseAPI + '/' + id)
            .then(res => {
                setTableData(res.data)
            })
        }
    }
   
    const handleUpdate = (e) => {
        const id = e.replace('u-', '')
        setUpdateID(id)
        axios.get(expenseAPI + '/' + id)
        .then(res => {
            setExpenseName(res.data.expenseName)
            setExpenseAmount(res.data.expenseAmount)
            setExpenseType(res.data.expenseType)
            setExpenseDate(new Date(res.data.expenseDate))
            handleOpen()
        })
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setErrorExpenseName('')
        setErrorExpenseAmount('')
        setErrorExpenseDate('')
        setErrorExpenseType('')
        setOpen(false)
    }
    
    return (
        <React.Fragment>
            <div className='border rounded p-3 mt-5 row mt-3'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.length ? tableData.map(({ expenseId, expenseName, expenseAmount, expenseDate, expenseType }) => (
                            <TableRow
                                key={expenseId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {expenseName}
                                </TableCell>
                                <TableCell align="right">{expenseAmount}</TableCell>
                                <TableCell>{expenseDate}</TableCell>
                                <TableCell>{types[expenseType]}</TableCell>
                                <TableCell>
                                    <button id={'d-' + expenseId} onClick={(e) => handleDelete(e.target.id)} className='btn btn-danger m-1' type='button'>Delete</button>
                                    <button id={'u-' + expenseId} onClick={(e) => handleUpdate(e.target.id)} className='btn btn-info m-1 text-white' type='button'>Update</button>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow
                            key={name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" colSpan='4'>{noResult}</TableCell>

                        </TableRow>}
                    </TableBody>
                </Table>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update
                    </Typography>
                    <form className="row" onSubmit={(e) => handleSubmit(e)}>
                        <label className="mb-1 mt-3">Name</label>
                        <input id="name" className="form-control" placeholder='Name' type="text" onChange={(e) => validateName(e.target.value)} value={expenseName}/>
                        <label className="w-100 text-danger mb-2">{errorExpenseName}</label>
                        <label className="mb-1">Amount</label>
                        <input id="amount" className="form-control" placeholder='Amount' type="text" onChange={(e) => validateAmount(e.target.value)} value={expenseAmount}/>
                        <label className="w-100 text-danger mb-2">{errorExpenseAmount}</label>
                        <label className="mb-1">Date</label>
                        <input id="date" className="form-control" type="date" onChange={(e) => validateDate(e.target.value)} value={
                            expenseDate.getFullYear().toString() +
                            '-' +
                            (expenseDate.getMonth() + 1).toString().padStart(2, 0) +
                            '-' +
                            expenseDate.getDate().toString().padStart(2, 0)}/>
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
                        <button type='submit' style={{float:'right'}} className='btn btn-success mt-2 text-white'>Save</button>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default TableDisplay