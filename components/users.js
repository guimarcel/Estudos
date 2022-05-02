import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import _ from 'lodash'
import Fab from '@mui/material/Fab'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'


function Users() {
    const [open, setOpen] = useState(false)
    const [users, setLogin] = useState([
        {
            user_id: 1,
            user_name: "joaozin",
            user_doc: 12345678912,
            rented_books: [
                { name: "Senhor do Aneis" },
                { name: "Harry poter e o calice de fogo" }
            ],
            created_at: "2022-04-04 19:00:00",
            updated_at: "2022-04-04 19:00:00",
            deleted_at: null
        }
    ])

    const router = useRouter()

    const getTableContent = () => {
        console.log("teste", users)
        return users.map(user => (
            <TableRow key={user.id}>
                <TableCell align="center">{user.user_id}</TableCell>
                <TableCell align="center">{user.user_name}</TableCell>
                <TableCell align="center">{user.user_doc}</TableCell>
                <TableCell align="center">
                    <Fab color="primary" onClick={() => setOpen(true)}>
                        Ver mais
                    </Fab>
                    <Fab onClick={() => setOpen(true)}>
                        Editar
                    </Fab>
                    <Fab color="secondary" onClick={() => setOpen(true)}>
                        <DeleteIcon />
                    </Fab>
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 class="display-4">Usuarios</h1>
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Documento</TableCell>
                        <TableCell align="center">Acoes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_.get(users, 'length', 0) > 0 ?
                        getTableContent() :
                        (<React.Fragment />)
                    }
                </TableBody>
            </Table>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>

                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default Users
