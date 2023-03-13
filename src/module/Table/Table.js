import React, { Component } from 'react'
import TableDisplay from './TableDisplay'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material/'

class Table extends Component{
    render(){
        return(
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth='md' className='pt-5'>
                    <TableDisplay/>
                </Container>
            </React.Fragment>
        )
    }
}

export default Table