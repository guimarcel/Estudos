import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import _ from 'lodash'


function Form() {
    const router = useRouter()

    const [id, setId] = useState(_.get(router, 'query.user_id', false))
    const [name, setName] = useState(_.get(router, 'query.user_name', ''))
    const [doc, setDoc] = useState(_.get(router, 'query.user_doc', ''))



    const saveChanges = () => {
        const body = {
            user_id: id,
            user_name: name,
            user_doc: doc
        }
        console.log(body)
        // call route to edit name or create a user

        router.push('/usuarios')
    }
    return (

        <Grid container spacing={2} style={{ justifyContent: 'center', display: 'flex' }}>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 class="display-4">Formulario de Usuarios</h1>
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
                <TextField
                    style={{ margin: '5px', backgroundColor: 'white' }}
                    variant='filled'
                    label='Documento'
                    value={doc}
                    onChange={(e) => setDoc(e.target.value)}
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
