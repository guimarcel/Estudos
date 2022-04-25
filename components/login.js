import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { TextField } from '@material-ui/core'
import { useRouter } from 'next/router'


function Login() {
    const [login, setLogin] = useState('')
    const [passwd, setPasswd] = useState('')
    const router = useRouter()
    useEffect(() => {
        console.log('chamou', login)
    }, [login])
    return (

        <Grid container spacing={2} style={{ justifyContent: 'center', display: 'flex' }}>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 class="display-4">Biblioteca</h1>
            </Grid>
            <Grid
                item xs={6}
                style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}
            >
                <TextField
                    style={{ margin: '5px', backgroundColor: 'white' }}
                    variant='filled'
                    label='Usuário'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <TextField
                    style={{ margin: '5px', backgroundColor: 'white' }}
                    variant='filled'
                    label='Senha'
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                />


            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex', margin: '5px' }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => router.push('/usuarios')}
                >
                    Logar
                </Button>
            </Grid>
        </Grid>

    )
}

export default Login
