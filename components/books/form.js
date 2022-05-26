import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import _ from 'lodash'


function Form() {
    const router = useRouter()

    const [id, setId] = useState(_.get(router, 'query.book_id', false))
    const [name, setName] = useState(_.get(router, 'query.book_name', ''))

    const saveChanges = async () => {
        const url = "http://localhost:8000/books/create-update"
        const body = {
            name: name
        }
        if (id) {
            body._id = id
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const resp = await response.json()

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
