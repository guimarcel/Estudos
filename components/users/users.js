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

    const getUsers = async () => {
        const url = "http://localhost:8000/users"
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const resp = await response.json()
        setUsers(resp)
    }

    const getTableContent = () => {
        return users.map(user => (
            <TableRow key={user.id}>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.doc}</TableCell>
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
                                <Fab style={{ marginLeft: '5px' }} color="primary" size="small" onClick={() => returnRentedBook(book, user)}>
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

    const returnRentedBook = async (book, user) => {
        const urlBook = "http://localhost:8000/books/create-update"
        const bodyBook = {
            _id: book._id,
            name: book.name,
            is_rented: false
        }
        const responseBook = await fetch(urlBook, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyBook)
        })
        const respBook = await responseBook.json()

        const urlUser = "http://localhost:8000/users/create-update"
        _.remove(user.rented_books, userBook => book._id == userBook._id)
        const bodyUser = {
            _id: user._id,
            name: user.name,
            doc: user.doc,
            rented_books: user.rented_books
        }

        const responseUser = await fetch(urlUser, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyUser)
        })
        const respUser = await responseUser.json()

        if (respUser && respBook) {
            getUsers()
            setTitle('Atencao:')
            setMessage('Livro devolvido com sucesso.')
            setOpen(true)
        }
    }

    const callDeleteUser = async user => {
        const user_id = _.get(user, '_id', '')

        const url = "http://localhost:8000/users/delete"
        const body = {
            _id: user_id
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
        if (resp) {
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
                user_id: _.get(user, '_id', ''),
                user_name: _.get(user, 'name', ''),
                user_doc: _.get(user, 'doc', '')
            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 class="display-4">Usuarios</h1>
            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'space-between', display: 'flex' }}>
                <Button variant='contained' color='primary' onClick={() => callFormPage()} style={{ marginLeft: '10px' }}>Criar novo</Button>
                <Button variant='contained' color="primary" onClick={() => router.push("/livros")} style={{ marginRight: '10px' }}>Livros</Button>
            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'left', display: 'flex' }}>
                <Table>
                    <TableHead>
                        <TableRow>
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
