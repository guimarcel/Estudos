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
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'


function Users() {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const router = useRouter()

    const getUsers = () => {
        //call api getusers
        const result = [
            {
                user_id: 1,
                user_name: "joaozin",
                user_doc: 12345678912,
                rented_books: [
                    { id: 1, name: "Senhor do Aneis" },
                    { id: 2, name: "Harry poter e o calice de fogo" }
                ],
                created_at: "2022-04-04 19:00:00",
                updated_at: "2022-04-04 19:00:00",
                deleted_at: null
            }
        ]
        setUsers(result)
    }

    const getTableContent = () => {
        return users.map(user => (
            <TableRow key={user.id}>
                <TableCell align="center">{user.user_id}</TableCell>
                <TableCell align="center">{user.user_name}</TableCell>
                <TableCell align="center">{user.user_doc}</TableCell>
                <TableCell align="center">
                    <Fab style={{ marginLeft: '5px' }} color="primary" size="small" onClick={() => callListBooks(user)}>
                        <InfoIcon />
                    </Fab>
                    <Fab style={{ marginLeft: '5px', backgroundColor: 'green' }} size="small" onClick={() => callFormPage(user)}>
                        <EditIcon style={{ color: 'white' }} />
                    </Fab>
                    <Fab style={{ marginLeft: '5px' }} color="secondary" size="small" onClick={() => callDeleteUser(user)}>
                        <DeleteIcon />
                    </Fab>
                </TableCell>
            </TableRow>
        ))
    }

    const callListBooks = user => {
        const booksRented = _.get(user, 'rented_books', [{ name: 'Este usuario nao possui nenhum livro :(' }])
        const listBooks = (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Acoes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {booksRented.map(book => (
                        <TableRow>
                            <TableCell align="center">{book.name}</TableCell>
                            <TableCell align="center">
                                <Fab style={{ marginLeft: '5px' }} color="primary" size="small" onClick={() => returnRentedBook(book)}>
                                    <LibraryBooksIcon />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
        setTitle('Livros com este usuario:')
        setMessage(listBooks)
        setOpen(true)
    }

    const returnRentedBook = book => {
        const book_id = _.get(book, 'id', '')

        //call api devolver livro passando o id do livro
        const result = {
            success: true
        }
        if (result.success) {
            getUsers()
            setTitle('Atencao:')
            setMessage('Livro devolvido com sucesso.')
            setOpen(true)
        }
    }

    const callDeleteUser = user => {
        const user_id = _.get(user, 'user_id', '')

        //call api delete user passando o id do usuario deletado
        const result = {
            success: true
        }
        if (result.success) {
            getUsers()
            setTitle('Atencao:')
            setMessage('Usuario deletado com sucesso.')
            setOpen(true)

        }
    }

    const callFormPage = user => {
        router.push({
            pathname: '/formulario-usuario',
            query: {
                user_id: _.get(user, 'user_id', ''),
                user_name: _.get(user, 'user_name', ''),
                user_doc: _.get(user, 'user_doc', '')
            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 class="display-4">Usuarios</h1>
            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'left', display: 'flex' }}>
                <Button variant='contained' color='primary' onClick={() => callFormPage()} style={{ marginLeft: '10px' }}>Criar novo</Button>
            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'left', display: 'flex' }}>
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
            </Grid>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    {message}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid >
    )
}

export default Users
