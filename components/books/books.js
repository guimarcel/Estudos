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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import EditIcon from '@mui/icons-material/Edit'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'


function Books() {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
        getBooks()
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

    const getBooks = async () => {
        const url = "http://localhost:8000/books"
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const resp = await response.json()
        setBooks(resp)
    }

    const getTableContent = () => {
        return books.map(book => (
            <TableRow key={book._id}>
                <TableCell align="center">{book.name}</TableCell>
                <TableCell align="center">{book.is_rented ? 'Indisponivel' : 'Disponivel'}</TableCell>
                <TableCell align="center">
                    <Fab style={{ marginLeft: '5px' }} disabled={book.is_rented} color="primary" size="small" onClick={() => callListUsers(book)}>
                        <PersonAddAltIcon />
                    </Fab>
                    <Fab style={{ marginLeft: '5px', backgroundColor: 'green' }} size="small" onClick={() => callFormPage(book)}>
                        <EditIcon style={{ color: 'white' }} />
                    </Fab>
                    <Fab style={{ marginLeft: '5px' }} color="secondary" size="small" onClick={() => callDeleteBook(book)}>
                        <DeleteIcon />
                    </Fab>
                </TableCell>
            </TableRow>
        ))
    }

    const callListUsers = book => {
        const listUsers = (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Acoes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow>
                            <TableCell align="center">{user.name}</TableCell>
                            <TableCell align="center">
                                <Fab style={{ marginLeft: '5px' }} color="primary" size="small" onClick={() => rentBook(book, user)}>
                                    <LibraryBooksIcon />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
        setTitle('Selecione um usario para alugar o livro:')
        setMessage(listUsers)
        setOpen(true)
    }

    const rentBook = async (book, user) => {
        const urlBook = "http://localhost:8000/books/create-update"
        const bodyBook = {
            _id: book._id,
            name: book.name,
            is_rented: true
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
        const bodyUser = {
            _id: user._id,
            name: user.name,
            doc: user.doc,
            rented_books: [...user.rented_books, book]
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
            getBooks()
            setTitle('Atencao:')
            setMessage('Livro alugado com sucesso.')
            setOpen(true)
        }
    }

    const callDeleteBook = async book => {
        const book_id = _.get(book, '_id', '')

        const url = "http://localhost:8000/books/delete"
        const body = {
            _id: book_id
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
            getBooks()
            setTitle('Atencao:')
            setMessage('Livro deletado com sucesso.')
            setOpen(true)
        }
    }

    const callFormPage = book => {
        router.push({
            pathname: '/formulario-livro',
            query: {
                book_id: _.get(book, '_id', ''),
                book_name: _.get(book, 'name', '')
            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ justifyContent: 'right', display: 'flex' }}>

            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 class="display-4">Livros</h1>
            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'space-between', display: 'flex' }}>
                <Button variant='contained' color='primary' onClick={() => callFormPage()} style={{ marginLeft: '10px' }}>Criar novo</Button>
                <Button variant='contained' color="primary" onClick={() => router.push("/usuarios")} style={{ marginRight: '10px' }}>
                    Usuarios
                </Button>
            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'left', display: 'flex' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Disponibilidade</TableCell>
                            <TableCell align="center">Acoes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.get(books, 'length', 0) > 0 ?
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

export default Books
