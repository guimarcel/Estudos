import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'


function Users() {
    const [users, setLogin] = useState()

    const router = useRouter()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 class="display-4">Biblioteca</h1>
            </Grid>


        </Grid>
    )
}

export default Users
