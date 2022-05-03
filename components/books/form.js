import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import _ from 'lodash'


function Form() {
    const router = useRouter()

    const [id, setId] = useState(_.get(router, 'query.book_id', false))
    const [name, setName] = useState(_.get(router, 'query.book_name', ''))



    const saveChanges = () => {
        const body = {
            book_id: id,
            book_name: name
        }
        console.log(body)
        // call route to edit name or create a book

        router.push('/livros')
    }
    return (

        <Grid container spacing={2} style={{ justifyContent: 'center', display: 'flex' }}>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 class="display-4">Formulario de Livros</h1>
            </Grid>
            <Grid
                item xs={6}
                style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}
            >
                <TextField
                    style={{ margin: '5px', backgroundColor: 'white' }}
                    variant='filled'
                    label='Nome'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex', margin: '5px' }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => saveChanges()}
                >
                    Salvar
                </Button>
            </Grid>
        </Grid>

    )
}

export default Form
